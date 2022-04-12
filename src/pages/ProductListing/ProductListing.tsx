import styled from "@emotion/styled";
import { Component } from "react";
import ProductCard from "./components/ProductCard";
import { products } from "../../mockData";
import { withRouter, WithRouterProps } from "../../utils/withRouter";
import { Product } from "../../types";
import { NavigateFunction } from "react-router-dom";

const ProductListingStlyed = styled.div`
  h2 {
    text-transform: capitalize;
    margin-bottom: 5rem;
    font-weight: 400;
    font-size: 2.5rem;
  }
`;
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6rem;
`;

interface ProductListingParams {
  category: string;
  navigate: NavigateFunction;
}

type ProductListingProps = WithRouterProps<ProductListingParams>;

class ProductListing extends Component<ProductListingProps> {
  render() {
    const { category } = this.props.match.params;
    const currentProducts = category
      ? products.categories[category as keyof typeof products.categories]
      : products.categories.all;
    return (
      <ProductListingStlyed>
        <h2>{category}</h2>
        <ProductGrid>
          {currentProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleClick={() => {
                this.props.navigate(`/product/${product.id}`);
              }}
            />
          ))}
        </ProductGrid>
      </ProductListingStlyed>
    );
  }
}

export default withRouter(ProductListing);
