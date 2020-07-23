import 'source-map-support/register';
import { ApolloError, ApolloServer } from 'apollo-server-lambda';
import { Handler } from 'aws-lambda';
import 'source-map-support/register';
import resolvers from './schemas/resolvers';
import typeDefs from './schemas/typeDefs';
import ContextOptions from './models/ContextOptions.model';
// import { IResolvers } from 'graphql-tools';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
  formatError: (error): ApolloError => {
    if (error.extensions) delete error.extensions.exception;
    return error as ApolloError;
  },
  context: async ({ event, context }): Promise<ContextOptions> => ({
    event,
    context,
  }),
});

export const graphqlHandler: Handler = (event, context, callback): void => {
  const handler = apolloServer.createHandler({
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  context.callbackWaitsForEmptyEventLoop = false;
  return handler(event, context, callback);
};
