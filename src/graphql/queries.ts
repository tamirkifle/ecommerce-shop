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

export const PRODUCT__LISTING__QUERY = gql`
  query getCategory($categoryName: CategoryInput) {
    category(input: $categoryName) {
      products {
        id
        name
        inStock
        gallery
        brand
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;
