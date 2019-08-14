import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Бег в Калининграде" />
        <Bio />
        <div className="announcement">
          <p className="type">Длительная тренировка</p>
          <p className="ttl">17 августа</p>
          <p className="ttl">в 8:00</p>
          <p className="dscr"><a href="https://goo.gl/maps/MrfpYtch8HnPxFJL7" target="_blank">Зеленоградск</a> / 25 км / темп: 5:00</p>
        </div>
        <hr style={{ width: "100%", margin: "30px auto" }}></hr>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <Link
                // style={{ boxShadow: `none` }}
                to={node.fields.slug}
                style={{
                  color: "#000",
                  textDecoration: "none",
                  display: "inline",
                  fontSize: "24px",
                }}
              >
                {title}
              </Link>
              {/* <span
                  style={{
                    ...scale(-1 / 5),
                    display: `block`,
                    marginBottom: rhythm(1),
                  }}
                >
                  {node.frontmatter.date}
                </span> */}
              <p
                style={{
                  ...scale(-1 / 5),
                  display: `block`,
                  marginBottom: rhythm(1),
                }}
              >
                {node.frontmatter.date}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: node.html || node.excerpt,
                }}
              />
              <hr style={{ width: "100%", margin: "30px auto" }}></hr>
            </div>
          )
        })}
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { post: { eq: "yes" } } }
    ) {
      edges {
        node {
          excerpt
          html
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY", locale: "ru-RU")
            title
            description
          }
        }
      }
    }
  }
`
