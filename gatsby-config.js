module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
    desc: "Ross' Gatsby blog is right here"
  },
  pathPrefix: "/levelupgatsby",
  plugins: [
    'gatsby-plugin-react-helmet', 
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- end -->`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp'
  ],
};
