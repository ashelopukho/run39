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
      sort: { fields: [frontmatter___date], order: ASC }
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
            date(formatString: "DD/MM/YYYY")
            title
            description
          }
        }
      }
    }
  }
`
