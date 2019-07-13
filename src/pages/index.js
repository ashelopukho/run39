import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h4
                style={{
                  marginBottom: rhythm(1 / 6),
                }}
              >
                <b>{node.frontmatter.date}</b>
              </h4>
              <Link
                // style={{ boxShadow: `none` }}
                to={node.fields.slug}
                style={{
                  color: "#000",
                  textDecoration: "none",
                }}
              >
                {title}
              </Link>
              <p
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
      filter: { frontmatter: { pinned: { eq: "yes" } } }
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
