import styled from "@emotion/styled";
import { Component } from "react";
import { withStore, WithStoreProps } from "../graphql/withStore";
import { setQuantity } from "../store/actions";
import {
  CartItem,
  Product,
  SelectedAttribute,
  SelectedAttributes,
} from "../types";
import { AttributeInput, AttributeViewer } from "./AttributeRelated";
import MiniImageSlider from "./MiniImageSlider";
import QuantityCounter from "./QuantityCounter";

type CartViewerTypes = "added-to-cart-modal" | "minicart" | "cart";
type TotalViewerTypes = "minicart" | "cart";

interface StyleProps {
  type?: CartViewerTypes;
}
const ProductTitle = styled.header<StyleProps>`
  --flow-spacer: ${(p) => (p.type === "cart" ? "0.8rem" : "0.5rem")};
  span {
    display: block;
    font-size: ${(p) => (p.type === "cart" ? "1.13rem" : "inherit")};
  }

  .product-brand {
    font-weight: ${(p) => (p.type === "cart" ? "600" : "300")};
  }
  .product-name {
    font-weight: ${(p) => (p.type === "cart" ? "400" : "300")};
  }
`;

const CartItemStyled = styled.div<StyleProps>`
  padding: 1.25rem 0;
  min-height: ${(p) => (p.type === "cart" ? "200px" : "170px")};

  &:first-of-type {
    border-top: ${(p) => (p.type === "cart" ? "1px solid #e5e5e5" : "none")};
  }
  border-bottom: ${(p) => (p.type === "cart" ? "1px solid #e5e5e5" : "none")};
`;

const QtyImageContainer = styled.div<StyleProps>`
  --flex-spacer: ${(p) => (p.type === "cart" ? "1rem" : "10px")};
  max-height: ${(p) => (p.type === "cart" ? "220px" : "170px")};
  flex-basis: 0%;
`;

const Price = styled.div<StyleProps>`
  font-size: ${(p) => (p.type === "cart" ? "1.25rem" : "inherit")};
  font-weight: ${(p) => (p.type === "cart" ? "700" : "inherit")};
`;
const Attributes = styled.div`
  & > * {
    --flow-spacer: 0.5rem;
  }
`;
const ProductInfo = styled.div<StyleProps>`
  --flow-spacer: ${(p) => (p.type === "cart" ? "1.5rem" : "1rem")};
  flex-basis: 70%;
`;

const ModalProductStyled = styled.div`
  padding: 1.25rem 0;
`;

interface CartItemViewerBaseOwnProps {
  cartItem: CartItem;
  type: CartViewerTypes;
}

interface CartItemViewerState {}
type CartItemViewerProps = CartItemViewerBaseOwnProps & WithStoreProps;
class CartItemViewerBase extends Component<
  CartItemViewerProps,
  CartItemViewerState
> {
  render() {
    const { pageCurrency } = this.props.storeVar;
    return (
      <CartItemStyled className="split space-between" type={this.props.type}>
        <ProductInfo className="flow-content" type={this.props.type}>
          <ProductTitle className="flow-content" type={this.props.type}>
            <span className="product-brand">{this.props.cartItem.brand}</span>
            <span className="product-name">{this.props.cartItem.name}</span>
          </ProductTitle>
          {this.props.type !== "added-to-cart-modal" && (
            <Price type={this.props.type}>
              {pageCurrency.symbol}
              {Math.round(
                (this.props.cartItem.prices.find(
                  (price) => price.currency.label === pageCurrency.label
                )?.amount || 0) *
                  this.props.cartItem.quantity *
                  100
              ) / 100}
            </Price>
          )}
          <Attributes className="flow-content">
            {Array.from(this.props.cartItem.selectedAttributes.values()).map(
              (sAttribute) =>
                this.props.type === "cart" ? (
                  <AttributeViewer
                    key={sAttribute.id}
                    selectedAttribute={sAttribute}
                  />
                ) : (
                  <AttributeViewer
                    key={sAttribute.id}
                    selectedAttribute={sAttribute}
                    mini
                  />
                )
            )}
          </Attributes>
        </ProductInfo>
        <QtyImageContainer className="split" type={this.props.type}>
          {this.props.type !== "added-to-cart-modal" && (
            <QuantityCounter
              quantity={this.props.cartItem.quantity}
              increaseQuantity={() =>
                setQuantity(
                  this.props.cartItem,
                  this.props.cartItem.quantity + 1
                )
              }
              decreaseQuantity={() =>
                setQuantity(
                  this.props.cartItem,
                  this.props.cartItem.quantity - 1
                )
              }
              btnStyle={{
                fontSize: "1rem",
                padding: "0",
                minWidth: `${this.props.type === "cart" ? "45px" : "24px"}`,
                minHeight: `${this.props.type === "cart" ? "45px" : "24px"}`,
              }}
            />
          )}
          <MiniImageSlider
            gallery={this.props.cartItem.gallery}
            style={
              this.props.type === "added-to-cart-modal"
                ? {
                    width: "105px",
                    height: "184px",
                  }
                : this.props.type === "minicart"
                ? {
                    width: "90px",
                    height: "auto",
                  }
                : {}
            }
          />
        </QtyImageContainer>
      </CartItemStyled>
    );
  }
}

export const CartItemViewer = withStore(CartItemViewerBase);

interface TotalStyledProps {
  type?: TotalViewerTypes;
}
const TotalStyled = styled.div<TotalStyledProps>`
  padding: 1.25rem 0;
  font-size: ${(p) => (p.type === "cart" ? "1.5rem" : "inherit")};
  font-weight: 700;
`;
interface TotalViewerBaseOwnProps {
  type: TotalViewerTypes;
  total: number;
}

interface TotalViewerBaseState {}

type TotalViewerBaseProps = TotalViewerBaseOwnProps & WithStoreProps;
class TotalViewerBase extends Component<
  TotalViewerBaseProps,
  TotalViewerBaseState
> {
  render() {
    const { pageCurrency } = this.props.storeVar;

    return (
      <TotalStyled className="split space-between" type={this.props.type}>
        <p>Total: </p>
        <Price>
          {pageCurrency.symbol}
          {this.props.total}
        </Price>
      </TotalStyled>
    );
  }
}

export const TotalViewer = withStore(TotalViewerBase);

interface ModalProductViewerBaseOwnProps {
  product: Product;
  selectedAttributes: SelectedAttributes;
  setSelectedAttributes: (selectedAttribute: SelectedAttribute) => void;
}

interface ModalProductViewerState {}
type ModalProductViewerProps = ModalProductViewerBaseOwnProps & WithStoreProps;
class ModalProductViewerBase extends Component<
  ModalProductViewerProps,
  ModalProductViewerState
> {
  render() {
    const { pageCurrency } = this.props.storeVar;
    const type = "minicart";
    return (
      <ModalProductStyled className="split space-between">
        <ProductInfo className="flow-content" type={type}>
          <ProductTitle className="flow-content" type={type}>
            <span className="product-brand">{this.props.product.brand}</span>
            <span className="product-name">{this.props.product.name}</span>
          </ProductTitle>
          <Price type={type}>
            <h4 className="section-title">Price: </h4>
            <p className="section-main">
              {pageCurrency.symbol}
              {
                this.props.product.prices.find(
                  (price) => price.currency.label === pageCurrency.label
                )?.amount
              }
            </p>
          </Price>
          <Attributes className="flow-content">
            <p>Please choose attributes:</p>
            {this.props.product.attributes.map((attribute) => (
              <AttributeInput
                key={attribute.id}
                attribute={attribute}
                selectedAttribute={this.props.selectedAttributes?.get(
                  attribute.id
                )}
                setSelectedAttributes={this.props.setSelectedAttributes}
                mini
              />
            ))}
          </Attributes>
        </ProductInfo>

        <QtyImageContainer>
          <MiniImageSlider
            gallery={this.props.product.gallery}
            style={{
              width: "105px",
              height: "184px",
            }}
          />
        </QtyImageContainer>
      </ModalProductStyled>
    );
  }
}

export const ModalProductViewer = withStore(ModalProductViewerBase);
