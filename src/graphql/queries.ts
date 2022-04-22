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
export const CATEGORIES__QUERY = gql`
  query {
    categories {
      name
    }
  }
`;

export const PRODUCTS__QUERY = gql`
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
        attributes {
          name
          id
          type
          items {
            displayValue
            value
            id
          }
        }
        description
      }
    }
  }
`;

export const PRODUCT__QUERY = gql`
  query getProduct($productId: String!) {
    product(id: $productId) {
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
      attributes {
        name
        id
        type
        items {
          displayValue
          value
          id
        }
      }
      description
    }
  }
`;
