import styled from "@emotion/styled";
import { Component } from "react";
import ImageViewer from "../../components/ImageViewer";
import { AttributeInput } from "../../components/AttributeRelated";
import { products } from "../../mockData";
import { withRouter, WithRouterProps } from "../../utils/withRouter";
import { Product, SelectedAttribute, SelectedAttributes } from "../../types";
import { withStore, WithStoreProps } from "../../graphql/withStore";
import { addToCart } from "../../store/actions";
import { productToCartItem } from "../../utils/productToCartItem";
import {
  AlreadyInCartError,
  NoAttribiuteError,
  OutOfStockError,
} from "../../store/errors";

const ProductDescriptionStyled = styled.div`
  display: flex;
  --flow-sapcer: 6.25rem;
  .section-title {
    font-family: var(--ff-roboto-c, "sans-serif");
    font-weight: 700;
    text-transform: uppercase;
  }
  .section-main {
    margin-top: 0.5rem;
  }
`;
const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 2rem;
  }
`;
const ProductTitle = styled.section`
  .product-brand {
    font-weight: 600;
    margin-bottom: 0.8rem;
  }
  .product-name {
    font-weight: 400;
  }
`;

const Price = styled.section`
  .section-main {
    font-size: 24px;
    font-weight: 700;
  }
`;
const AddToCartButton = styled.button`
  text-transform: uppercase;
  padding: 1rem 0;
  background-color: var(--accent, green);
  color: white;
  width: 400px;
  &:disabled {
    background-color: #96d7a7;
    cursor: not-allowed;
  }
`;
const Description = styled.div`
  font-family: var(--ff-roboto, "sans-serif");
  line-height: 1.6;
`;

interface Params {
  productId: string;
}

type State = {
  currentProduct: Product | null;
  selectedAttributes: SelectedAttributes;
};

type Props = WithRouterProps<Params> & WithStoreProps;

class ProductDescription extends Component<Props, State> {
  state: State = {
    currentProduct: null,
    selectedAttributes: new Map<string, SelectedAttribute>(),
  };
  componentDidMount() {
    const { productId } = this.props.match.params;
    const product = products.categories.all.find(
      (product) => product.id === productId
    );
    if (product) {
      this.setState({ currentProduct: product });
    }
  }

  setSelectedAttributes = (selectedAttribute: SelectedAttribute) => {
    this.setState((oldState) => {
      const { selectedAttributes } = { ...oldState };
      selectedAttributes.set(selectedAttribute.id, selectedAttribute);
      return { ...oldState, selectedAttributes };
    });
  };

  addToCart = () => {
    if (this.state.currentProduct) {
      //TODO: Remove with loading state
      console.log("Adding to Cart...");

      try {
        for (const { id } of this.state.currentProduct.attributes) {
          if (!this.state.selectedAttributes.get(id)) {
            throw new NoAttribiuteError(
              "Please select all item attributes before adding to cart."
            );
          }
        }
        const added = addToCart(
          productToCartItem(
            this.state.currentProduct,
            new Map(this.state.selectedAttributes)
          )
        );
        if (added) {
          alert("Item successfully added to cart.");
        }
      } catch (e: any) {
        if (
          e instanceof NoAttribiuteError ||
          OutOfStockError ||
          AlreadyInCartError
        ) {
          alert(e.message);
        }
      }
    }
  };

  render() {
    const { pageCurrency } = this.props.storeVar;
    if (this.state.currentProduct) {
      const { currentProduct } = this.state;
      return (
        <ProductDescriptionStyled className="flow-content">
          <ImageViewer images={currentProduct.gallery} />
          <ProductDetails>
            <ProductTitle>
              <h2 className="product-brand">{currentProduct.brand}</h2>
              <h2 className="product-name">{currentProduct.name}</h2>
            </ProductTitle>
            {currentProduct.attributes.map((attribute) => (
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
                  currentProduct.prices.find(
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
                __html: currentProduct.description,
              }}
            ></Description>
          </ProductDetails>
        </ProductDescriptionStyled>
      );
    } else {
      //TO-DO: Better Product Not Found Dialog
      return (
        <ProductDescriptionStyled className="container">
          <div>Product Not Found</div>
        </ProductDescriptionStyled>
      );
    }
  }
}

export default withStore(withRouter(ProductDescription));
