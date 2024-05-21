import "dotenv/config"
import express from 'express';
import dateFormat from "./utils/helper/dateFormat.js";
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import connectDatabase from './config/connection.js';
import resolvers from './src/resolvers.js';
import typeDefs from './src/typedefs.js';

const app = express();
const PORT = process.env.PORT || 4000;

async function startServer() {
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });
  await connectDatabase();
  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(`${dateFormat} Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
}

startServer();