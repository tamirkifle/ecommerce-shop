import styled from "@emotion/styled";
import { Component } from "react";
import { setQuantity } from "../store/actions";
import {
  CartItem,
  CartViewerTypes,
  Product,
  SelectedAttribute,
  SelectedAttributes,
  TotalViewerTypes,
} from "../types";
import { AttributeInput, AttributeViewer } from "./AttributeRelated";
import MiniImageSlider from "./MiniImageSlider";
import QuantityCounter from "./QuantityCounter";
import PriceViewer from "./PriceViewer";
import { ProductTitle } from "./commonStyles";

interface StyleProps {
  type?: CartViewerTypes;
}

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

interface CartItemViewerProps {
  cartItem: CartItem;
  type: CartViewerTypes;
}
interface CartItemViewerState {}

export class CartItemViewer extends Component<
  CartItemViewerProps,
  CartItemViewerState
> {
  render() {
    return (
      <CartItemStyled className="split space-between" type={this.props.type}>
        <ProductInfo className="flow-content" type={this.props.type}>
          <ProductTitle className="flow-content" type={this.props.type}>
            <span>{this.props.cartItem.brand}</span>
            <span>{this.props.cartItem.name}</span>
          </ProductTitle>
          {this.props.type !== "added-to-cart-modal" && (
            <PriceViewer
              priceData={this.props.cartItem.prices}
              type={this.props.type}
            />
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

interface TotalStyledProps {
  type?: TotalViewerTypes;
}
const TotalStyled = styled.div<TotalStyledProps>`
  padding: 1.25rem 0;
  font-size: ${(p) => (p.type === "cart" ? "1.5rem" : "inherit")};
  font-weight: 700;
`;
interface TotalViewerProps {
  type: TotalViewerTypes;
  total: number;
}
interface TotalViewerState {}

export class TotalViewer extends Component<TotalViewerProps, TotalViewerState> {
  render() {
    return (
      <TotalStyled className="split space-between" type={this.props.type}>
        <p>Total: </p>
        <PriceViewer
          priceData={this.props.total}
          type={this.props.type === "minicart" ? "minicartTotal" : "cartTotal"}
        />
      </TotalStyled>
    );
  }
}

interface ModalProductViewerProps {
  product: Product;
  selectedAttributes: SelectedAttributes;
  setSelectedAttributes: (selectedAttribute: SelectedAttribute) => void;
}
interface ModalProductViewerState {}

export class ModalProductViewer extends Component<
  ModalProductViewerProps,
  ModalProductViewerState
> {
  render() {
    const type = "minicart";
    return (
      <ModalProductStyled className="split space-between">
        <ProductInfo className="flow-content" type={type}>
          <ProductTitle className="flow-content" type={type}>
            <span>{this.props.product.brand}</span>
            <span>{this.props.product.name}</span>
          </ProductTitle>
          <Price type={type}>
            <h4 className="section-title">Price: </h4>
            <PriceViewer priceData={this.props.product.prices} type={type} />
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
