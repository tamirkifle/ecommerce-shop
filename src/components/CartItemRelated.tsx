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
import { renderErrorModal } from "../store/modalBuilders";

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
const Attributes = styled.div<StyleProps>`
  & > * {
    --flow-spacer: ${(p) => (p.type === "minicart" ? "0.5rem" : "1rem")};
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
          {this.props.type !== "modal" && (
            <PriceViewer
              priceData={this.props.cartItem.prices}
              type={this.props.type}
            />
          )}
          <Attributes type={this.props.type} className="flow-content">
            {this.props.cartItem.attributes.map((attribute) =>
              this.props.type === "cart" ? (
                <AttributeViewer
                  key={attribute.id}
                  attribute={attribute}
                  selectedAttribute={this.props.cartItem.selectedAttributes.get(
                    attribute.id
                  )}
                />
              ) : (
                <AttributeViewer
                  key={attribute.id}
                  attribute={attribute}
                  selectedAttribute={this.props.cartItem.selectedAttributes.get(
                    attribute.id
                  )}
                  mini
                />
              )
            )}
          </Attributes>
        </ProductInfo>
        <QtyImageContainer className="split" type={this.props.type}>
          {this.props.type !== "modal" && (
            <QuantityCounter
              quantity={this.props.cartItem.quantity}
              mini={this.props.type !== "cart"}
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
            />
          )}
          <MiniImageSlider
            gallery={this.props.cartItem.gallery}
            type={this.props.type}
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
  & > * {
    --flow-spacer: 1rem;
  }
  padding: 1.25rem 0;
  font-size: ${(p) => (p.type === "cart" ? "1.5rem" : "inherit")};
  font-weight: 400;
`;
const OrderButton = styled.button<TotalStyledProps>`
  text-transform: uppercase;
  padding: 1rem 0;
  background-color: var(--accent, green);
  color: white;
  width: 100%;
  max-width: 300px;
  &:disabled {
    background-color: #96d7a7;
    cursor: not-allowed;
  }
`;
const PricesContainer = styled.div<TotalStyledProps>`
  & > * {
    --flow-spacer: 1rem;
  }
`;
const TaxQtyContainer = styled.div<TotalStyledProps>`
  & > * {
    --flow-spacer: 0.5rem;
    justify-content: ${(p) => p.type === "minicart" && "space-between"};
  }
`;
const TotalContainer = styled.div<TotalStyledProps>`
  & > * {
    justify-content: ${(p) => p.type === "minicart" && "space-between"};
  }
`;

interface TotalViewerProps {
  type: TotalViewerTypes;
  totalWithoutTax: number;
  taxRate: number;
  totalQuantity: number;
}
interface TotalViewerState {}

export class TotalViewer extends Component<TotalViewerProps, TotalViewerState> {
  render() {
    return (
      <TotalStyled className="flow-content" type={this.props.type}>
        <PricesContainer className="flow-content">
          <TaxQtyContainer className="flow-content" type={this.props.type}>
            <div className="split">
              <span>Tax ({this.props.taxRate * 100}% ): </span>
              <PriceViewer
                priceData={this.props.totalWithoutTax * this.props.taxRate}
                type={
                  this.props.type === "minicart" ? "minicartTotal" : "cartTotal"
                }
              />
            </div>
            <div className="split">
              <span>Qty: </span>
              <span
                className={this.props.type === "cart" ? "bold" : "mediumbold"}
              >
                {this.props.totalQuantity}
              </span>
            </div>
          </TaxQtyContainer>
          <TotalContainer type={this.props.type}>
            <div className="split">
              <span className={this.props.type === "cart" ? "mediumbold" : ""}>
                Total:{" "}
              </span>
              <PriceViewer
                priceData={
                  (1 + this.props.taxRate) * this.props.totalWithoutTax
                }
                type={
                  this.props.type === "minicart" ? "minicartTotal" : "cartTotal"
                }
              />
            </div>
          </TotalContainer>
        </PricesContainer>

        {this.props.type === "cart" && (
          <OrderButton
            className="btn accent"
            onClick={() => renderErrorModal("Coming Soon")}
          >
            Order
          </OrderButton>
        )}
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
          <MiniImageSlider gallery={this.props.product.gallery} type="modal" />
        </QtyImageContainer>
      </ModalProductStyled>
    );
  }
}
