import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL = "http://localhost:4000/";

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      AttributeSet: {
        keyFields: false,
      },
    },
  }),
  uri: GRAPHQL_URL,
});

export default client;
