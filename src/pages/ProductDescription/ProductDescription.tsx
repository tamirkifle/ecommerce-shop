import styled from "@emotion/styled";
import { Component } from "react";
import ImageViewer from "../../components/ImageViewer";
import { AttributeInput } from "../../components/AttributeRelated";
import { withRouter, WithRouterProps } from "../../utils/withRouter";
import { Product, SelectedAttribute, SelectedAttributes } from "../../types";
import { withStore, WithStoreProps } from "../../graphql/withStore";
import { addToCart } from "../../store/actions";
import { PRODUCT__QUERY } from "../../graphql/queries";
import { withClient, WithClientProps } from "../../graphql/withApolloClient";
import { PageTitle } from "../../components/commonStyles";
import LoadingProductDescription from "../../components/loading/LoadingProductDescription";
import numberFormatter from "../../utils/numberFormatter";

const ProductDescriptionStyled = styled.div`
  & > * {
    --flex-spacer: 2rem;
    flex-basis: 100%;
  }
`;
const PriceTitle = styled.p`
  font-family: var(--ff-roboto-c, "sans-serif");
  font-weight: 700;
  text-transform: uppercase;
`;
const ProductDetails = styled.div`
  margin-top: 1rem;
  & > * {
    --flex-spacer: 2rem;
  }
`;
const ProductTitle = styled.section`
  & > * {
    --flow-spacer: 0.8rem;
  }
  .product-brand {
    font-weight: 600;
  }
  .product-name {
    font-weight: 400;
  }
`;

const Price = styled.section`
  font-size: 24px;
  font-weight: 700;
`;

const AddToCartButton = styled.button`
  text-transform: uppercase;
  padding: 1rem 0;
  background-color: var(--accent, green);
  color: white;
  max-width: 400px;
  &:disabled {
    background-color: #96d7a7;
    cursor: not-allowed;
  }
`;
const Description = styled.div`
  font-family: var(--ff-roboto, "sans-serif");
  line-height: 1.6;
`;

interface ProductDescriptionRouteParams {
  productId: string;
}
interface ProductDescriptionRouteState {
  product: Product;
}

type ProductDescriptionState = {
  currentProduct: Product | null;
  selectedAttributes: SelectedAttributes;
  loading: boolean;
};

type ProductDescriptionProps = WithClientProps &
  WithRouterProps<ProductDescriptionRouteParams, ProductDescriptionRouteState> &
  WithStoreProps;

class ProductDescription extends Component<
  ProductDescriptionProps,
  ProductDescriptionState
> {
  state: ProductDescriptionState = {
    currentProduct: null,
    selectedAttributes: new Map<string, SelectedAttribute>(),
    loading: true,
  };

  getProduct = async (id: string) => {
    const { data, loading } = await this.props.client.query({
      query: PRODUCT__QUERY,
      variables: { productId: id },
    });
    this.setState({
      currentProduct: data?.product as Product,
      loading,
    });
  };

  async componentDidMount() {
    const { product } = this.props.location;
    if (product) {
      //Don't run query if navigating from product listing, it will be passed through the route state
      this.setState({ currentProduct: product as Product });
      return;
    }
    const { productId } = this.props.match.params;
    await this.getProduct(productId);
  }

  setSelectedAttributes = (selectedAttribute: SelectedAttribute) => {
    this.setState((oldState) => {
      const newSelectedAttributes = new Map<string, SelectedAttribute>(
        oldState.selectedAttributes
      );
      newSelectedAttributes.set(selectedAttribute.id, selectedAttribute);
      return { ...oldState, selectedAttributes: newSelectedAttributes };
    });
  };

  resetSelections = () => {
    this.setState((oldState) => {
      return {
        ...oldState,
        selectedAttributes: new Map<string, SelectedAttribute>(),
      };
    });
  };
  addToCart = () => {
    if (this.state.currentProduct) {
      const added = addToCart(
        this.state.currentProduct,
        new Map(this.state.selectedAttributes)
      );
      if (added) {
        this.resetSelections();
      }
    }
  };

  render() {
    const { pageCurrency } = this.props.storeVar;

    return this.state.currentProduct ? (
      <ProductDescriptionStyled className="split">
        <ImageViewer images={this.state.currentProduct.gallery} />
        <ProductDetails className="split-column">
          <ProductTitle className="flow-content">
            <h2 className="product-brand">{this.state.currentProduct.brand}</h2>
            <h2 className="product-name">{this.state.currentProduct.name}</h2>
          </ProductTitle>
          {this.state.currentProduct.attributes.map((attribute) => (
            <AttributeInput
              key={attribute.id}
              attribute={attribute}
              selectedAttribute={this.state.selectedAttributes?.get(
                attribute.id
              )}
              setSelectedAttributes={this.setSelectedAttributes}
            />
          ))}
          <Price>
            <h4 className="section-title">Price: </h4>
            <p className="section-main">
              {pageCurrency.symbol}
              {
                this.state.currentProduct.prices.find(
                  (price) => price.currency.label === pageCurrency.label
                )?.amount
              }
            </p>
          </Price>
          <AddToCartButton
            onClick={() =>
              this.state.currentProduct?.inStock && this.addToCart()
            }
            disabled={
              this.state.currentProduct && !this.state.currentProduct.inStock
            }
          >
            {this.state.currentProduct?.inStock
              ? "Add to Cart"
              : "Out of Stock"}
          </AddToCartButton>
          <Description
            dangerouslySetInnerHTML={{
              __html: this.state.currentProduct.description,
            }}
          ></Description>
        </ProductDetails>
      </ProductDescriptionStyled>
    ) : this.state.loading ? (
      <LoadingProductDescription />
    ) : (
      <PageTitle>Product Not Found</PageTitle>
    );
  }
}

export default withClient(withStore(withRouter(ProductDescription)));
