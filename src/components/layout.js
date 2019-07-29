import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>
          {header}
          <div style={{ float: "left" }}>бег в калининграде...</div>
          <div style={{ textAlign: "right" }}>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/calendar`}
            >
              календарь
            </Link>
            {/* {" | "}
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/calendar`}
            >
              клуб
            </Link>
            {" | "}
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/calendar`}
            >
              о нас
            </Link> */}
          </div>
          <hr style={{ width: "100%", margin: "0 auto" }}></hr>
        </header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()},{` `}
          <a href="https://run39.ru">run39</a>
          {` | `}
          <a target="_blank" href="https://www.strava.com/clubs/running-kaliningrad">strava club</a>
          {` | `}
          <a target="_blank" href="https://tele.gg/joinchat/DNdXlQ9xPjsuUnnWdYGKMw">tg</a>.
        </footer>
      </div>
    )
  }
}

export default Layout
