const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
    }
    type PostData {
        posts: [Post!]!
    }
    input PostInputData {
        title: String!
        content: String!
    }
    type RootQuery {
        posts: PostData!
    }
    type RootMutation {
        createPost(postInput: PostInputData): Post!
        updatePost(id: ID!, postInput: PostInputData): Post!
        deletePost(id: ID!): Post!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)