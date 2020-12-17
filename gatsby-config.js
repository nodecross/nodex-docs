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
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // The property ID; the tracking code won't be generated without it
                trackingId: "G-HCTKH2MT9P",
                // Defines where to place the tracking script - `true` in the head and `false` in the body
                head: true,
                // Setting this parameter is optional
                //anonymize: true,
                // Setting this parameter is also optional
                //respectDNT: true,
                // Avoids sending pageview hits from custom paths
                //exclude: ["/preview/**", "/do-not-track/me/too/"],
                // Delays sending pageview hits on route update (in milliseconds)
                //pageTransitionDelay: 0,
                // Enables Google Optimize using your container Id
                //optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
                // Enables Google Optimize Experiment ID
                //experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
                // Set Variation ID. 0 for original 1,2,3....
                //variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
                // Defers execution of google analytics script after page load
                //defer: false,
                // Any additional optional fields
                //sampleRate: 5,
                //siteSpeedSampleRate: 10,
                //cookieDomain: "example.com",
            },
        },
        {
            resolve: `gatsby-theme-document`,
        },
        {
            resolve: `gatsby-plugin-theme-ui`,
        },
        {
            resolve: `gatsby-plugin-s3`,
            options: {
                bucketName: "docs.getunid.io",
                protocol: "https",
                hostname: "docs.getunid.io"
            },
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                  include: /assets/
                }
            }
        }
    ]
};
