import styled from "@emotion/styled";
import { Component } from "react";
import ProductCard from "./components/ProductCard";
import { withRouter, WithRouterProps } from "../../utils/withRouter";
import { Product } from "../../types";
import { PRODUCTS__QUERY } from "../../graphql/queries";
import { withClient, WithClientProps } from "../../graphql/withApolloClient";

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

interface ProductListingRouterParams {
  category: string;
}
interface ProductListingExtraProps {}
interface ProductListingState {
  category: string | null;
  products: Product[] | null;
  loading: boolean;
}
type ProductListingProps = ProductListingExtraProps &
  WithRouterProps<ProductListingRouterParams> &
  WithClientProps;
class ProductListing extends Component<
  ProductListingProps,
  ProductListingState
> {
  state: ProductListingState = {
    category: null,
    products: null,
    loading: true,
  };

  getProducts = async (category: string) => {
    const { data, loading } = await this.props.client.query({
      query: PRODUCTS__QUERY,
      variables: { categoryName: { title: category || "all" } }, //TODO: read defaultCategory from global state or query from graphql
    });
    this.setState({
      products: data?.category?.products as Product[],
      loading,
    });
  };

  async componentDidMount() {
    const { category } = this.props.match.params;
    await this.getProducts(category);
  }

  async componentDidUpdate(prevProps: ProductListingProps) {
    const { category: prevCategory } = prevProps.match.params;
    const { category: newCategory } = this.props.match.params;
    if (prevCategory === newCategory) {
      return;
    }
    await this.getProducts(newCategory);
  }
  render() {
    const { category } = this.props.match.params;
    const { products } = this.state;
    return (
      <ProductListingStlyed>
        <h2>{category}</h2>
        <ProductGrid>
          {products?.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleClick={() => {
                this.props.navigate(`/product/${product.id}`, {
                  state: product,
                });
              }}
            />
          ))}
        </ProductGrid>
      </ProductListingStlyed>
    );
  }
}

export default withClient(withRouter(ProductListing));
