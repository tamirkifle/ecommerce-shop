import { gql } from "@apollo/client";

export const NAVBAR__QUERY = gql`
  query {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;
