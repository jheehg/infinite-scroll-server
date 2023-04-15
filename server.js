import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fetch from 'node-fetch';

const typeDefs = `#graphql
type Image {
  id: ID!
  height: Int!
  width: Int!
  url: String!
}
type Query {
  images(limit: Int, page: Int): [Image!]!
  imageInfo(id: ID!): Image
}
`;

const resolvers = {
  Query: {
    async images(_, { limit, page }) {
      const r = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}`
      );
      const json = await r.json();
      return json;
    },
    imageInfo(id) {
      return id;
    },
  },
};

const server = new ApolloServer({
  // nodeEnv: 'development',
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);
