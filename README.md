# Cipher - Social Media App Backend

Cipher is a social media application designed to connect people through posts and comments. This repository contains the backend code for Cipher, built with Node.js, Express, MongoDB, and GraphQL.

### Features
- User authentication and authorization using JWT
- Password hashing with bcrypt
- User profiles with followers and following functionality
- Creating, updating, and deleting posts and comments
- Querying user data, including followers and following lists

### Tech Stack
- Node.js
- Express
- MongoDB (with Mongoose)
- GraphQL (with Apollo Server)
- bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/cipher-backend.git
cd cipher-backend
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
```env
PORT=your_desired_port
URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
4. Start the server:
```bash
npm start
```

The server will start on http://localhost:4000 if no port is defined in the env file. 

### GraphQL Playground
You can interact with the GraphQL API using the Apollo Server Playground. Navigate to http://localhost:4000/graphql to access the playground.

*NOTE: The graphQL playground will have a different port if defined in the env file.*

## API Endpoints

### User

- Create User:
```graphql
mutation {
  createUser(input: {
    username: "john_doe",
    email: "john@example.com",
    password: "securepassword"
  }) {
    _id
    username
    email
    createdAt
  }
}
```

- Login:
```graphql
mutation {
  login(input: {
    email: "john@example.com",
    password: "securepassword"
  }) {
    token
    user {
      _id
      username
      email
      createdAt
    }
  }
}
```

- Follow User:
```graphql
mutation {
  login(input: {
    email: "john@example.com",
    password: "securepassword"
  }) {
    token
    user {
      _id
      username
      email
      createdAt
    }
  }
}
```

- Unfollow User:
```graphql
mutation {
  unfollowUser(input: {
    userId: "user_id",
    targetUserId: "target_user_id"
  }) {
    _id
    username
    following {
      _id
      username
    }
  }
}
```