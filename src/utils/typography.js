import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    a: {
      boxShadow: `none`,
    },
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    "a:link": {
      backgroundColor: `yellow`,
    },

    // "a:visited" : {
    //   backgroundColor: `cyan`
    // },

    "a:hover": {
      backgroundColor: `hotpink`, // `lightgreen`
    },

    "a:active": {
      backgroundColor: `hotpink`,
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
