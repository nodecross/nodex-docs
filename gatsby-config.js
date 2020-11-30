module.exports = {
  siteMetadata: {
    title: `UNiD Docs`,
    name: `UNiD`,
    siteUrl: `https://gatsby-theme-document.netlify.com`,
    description: `This is UNiD documentation`,
    social: [
      {
        name: `github`,
        url: `https://github.com/getunid/unid-docs`
      },
      {
        name: `twitter`,
        url: `https://twitter.com/masa256k1`
      }
    ],
    sidebarConfig: {
      forcedNavOrder: ["/intro", "/unid", "/wallet", "/server", "/schemas", "/tutorial"],
      ignoreIndex: true
    }
  },
  plugins: [
    {
      resolve: `gatsby-theme-document`,
    }
  ]
};
