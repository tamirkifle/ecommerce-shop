import styled from "@emotion/styled";
import { Component } from "react";
import ProductCard from "./components/ProductCard";
import { withRouter, WithRouterProps } from "../../utils/withRouter";
import { Product } from "../../types";
import { CATEGORIES__QUERY, PRODUCTS__QUERY } from "../../graphql/queries";
import { withClient, WithClientProps } from "../../graphql/withApolloClient";
import { PageTitle } from "../../components/commonStyles";
import LoadingProductListing from "../../components/loading/LoadingProductListing";

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
    products: null,
    loading: true,
  };

  getProducts = async (category: string) => {
    let { data, loading } = await this.props.client.query({
      query: PRODUCTS__QUERY,
      variables: { categoryName: { title: category || "all" } },
    });
    if (!category && !data?.category) {
      //if products for the 'all'  doesn't exist, query categories and get the first category's products
      const { data: categoryData } = await this.props.client.query({
        query: CATEGORIES__QUERY,
      });
      data = (
        await this.props.client.query({
          query: PRODUCTS__QUERY,
          variables: {
            categoryName: { title: categoryData?.categories?.[0]?.name },
          },
        })
      )?.data;
    }
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
    return products ? (
      <>
        <PageTitle>{category}</PageTitle>
        <ProductGrid>
          {products.map((product: Product) => (
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
      </>
    ) : this.state.loading ? (
      <LoadingProductListing />
    ) : (
      <PageTitle>Category Not Found</PageTitle>
    );
  }
}

export default withClient(withRouter(ProductListing));
