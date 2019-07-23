import React, { useState } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import moment from "moment"

const EventRow = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug

  const isActualEvent = moment(node.frontmatter.date)
    .startOf("day")
    .isSameOrAfter(moment().startOf("day"))

  return (
    <tr>
      <td style={{ color: isActualEvent ? "#000" : "lightgray" }}>
        {node.frontmatter.date}
      </td>
      <td>
        <Link
          style={{
            color: `#333`,
            backgroundColor: `#fff`,
            textDecoration: `underline`,
          }}
          to={node.fields.slug}
        >
          {title}
        </Link>
      </td>
      <td>{node.frontmatter.distance}</td>
    </tr>
  )
}

const BlogIndex = ({ data, location }) => {
  const isActualEvent = node =>
    moment(node.frontmatter.date)
      .startOf("day")
      .isSameOrAfter(moment().startOf("day"))

  const [showOldEvents, setOldEventVisibility] = useState(false)

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  const postsToShow = showOldEvents
    ? posts
    : posts.filter(({ node }) => isActualEvent(node))

  const handleClick = () => {
    setOldEventVisibility(!showOldEvents)
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Календарь соревнований, пробегов, тренировок" />
      <Bio />
      <div>
        <a href="#" onClick={handleClick}>
          {showOldEvents ? "Скрыть прошедшие" : "Показать прошедшие"}
        </a>
      </div>
      <table className="calendar">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Название</th>
            <th>Дистанция</th>
          </tr>
        </thead>
        <tbody>
          {postsToShow.map(({ node }) => (
            <EventRow node={node} key={node.fields.slug} />
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { fields: { slug: { regex: "/races/" } } }
    ) {
      edges {
        node {
          excerpt
          html
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
            distance
          }
        }
      }
    }
  }
`
