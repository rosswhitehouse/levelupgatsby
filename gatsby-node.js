const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
// 1. call a function whenever we make a node
exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators;
    // 2. check if this is .md file
    if(node.internal.type === 'MarkdownRemark') {
      // 3. setup page date
      const slug = createFilePath({
        node,
        getNode,
        basePath: 'posts'
      });
      // 4. Make fields for posts using slug, we can see this in graphiQL
      createNodeField({
          node,
          name: 'slug',
          value: `/posts${slug}`
      })
    }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;
    // create promise
    return new Promise((resolve, reject) => {
        // return page slugs
        graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
        `).then(result => {
            // loop over slugs
            result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                // create pages with path and a layout component
                // for them to be plugged into
                createPage({
                    path: node.fields.slug,
                    component: path.resolve('./src/posts/PostPage.js'),
                    context: {
                        slug: node.fields.slug
                    }
                })
            })
            resolve();
        })
    })
}