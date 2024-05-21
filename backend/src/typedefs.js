import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    username: String!
    email: String!
    createdAt: Date!
    posts: [Post]
    comments: [Comment]
    followers: [User]
    following: [User]
  }

  type Post {
    _id: ID!
    user: User!
    content: String!
    createdAt: Date!
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    user: User!
    post: Post!
    content: String!
    createdAt: Date!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
  }

  input FollowUserInput {
    userId: ID!
    targetUserId: ID!
  }

  input CreatePostInput {
    userId: ID!
    content: String!
  }

  input UpdatePostInput {
    content: String
  }

  input CreateCommentInput {
    userId: ID!
    postId: ID!
    content: String!
  }

  input UpdateCommentInput {
    content: String
  }

  type Query {
    getAllUsers: [User]
    getUser(userId: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(userId: ID!, input: UpdateUserInput!): User
    deleteUser(userId: ID!): Boolean

    createPost(input: CreatePostInput!): Post
    updatePost(postId: ID!, input: UpdatePostInput!): Post
    deletePost(postId: ID!): Boolean

    createComment(input: CreateCommentInput!): Comment
    updateComment(commentId: ID!, input: UpdateCommentInput!): Comment
    deleteComment(commentId: ID!): Boolean

    followUser(input: FollowUserInput!): User
    unfollowUser(input: FollowUserInput!): User
    login(input: LoginInput!): AuthPayload
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

export default typeDefs;