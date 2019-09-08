import React from "react"

const Announcement = ({ node }) => {
  let featuredImgFluid = node.frontmatter.image
    ? node.frontmatter.image.childImageSharp.fluid.src
    : ""
  return (
    <div
      className="announcement"
      style={{
        backgroundImage: `url(${featuredImgFluid})`,
      }}
    >
      <p className="type">{node.frontmatter.title}</p>
      <p className="ttl">{node.frontmatter.date}</p>
      <p className="ttl">в {node.frontmatter.time}</p>
      <p className="dscr">
        <a href={node.frontmatter.map} target="_blank">
          {node.frontmatter.place}
        </a>{" "}
        / {node.frontmatter.distance} / темп: {node.frontmatter.pace}
      </p>
    </div>
  )
}

export default Announcement
