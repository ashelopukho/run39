import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import moment from "moment"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Календарь соревнований, пробегов, тренировок" />
        <Bio />
        <table className="calendar">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Название</th>
              <th>Дистанция</th>
            </tr>
          </thead>
          <tbody>
            {posts
              .filter(({ node }) => {
                return moment(node.frontmatter.date)
                  .startOf("day")
                  .isSameOrAfter(moment().startOf("day"))
              })
              .map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                  <tr key={node.fields.slug}>
                    <td>{node.frontmatter.date}</td>
                    <td>
                      <Link
                        style={{ color: `#333`, backgroundColor: `#fff`, textDecoration:`underline` }}
                        to={node.fields.slug}
                      >
                        {title}
                      </Link>
                    </td>
                    <td>{node.frontmatter.distance}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
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
