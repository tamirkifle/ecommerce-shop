import styled from "@emotion/styled";
import { Component, MouseEventHandler } from "react";
import { ReactComponent as CartIcon } from "../../../assets/empty_cart_white.svg";
import { Product } from "../../../types";
import { renderAttributeModal } from "../../../store/modalBuilders";
import { addToCart } from "../../../store/actions";
import PriceViewer from "../../../components/PriceViewer";

const Card = styled.div`
  --card-image-height: 330px;
  --card-width: 386px;
  --card-padding: 2rem;
  width: var(--card-width);
  /* height: 480px; */
  font-size: 1.125rem;
  padding: var(--card-padding);
  position: relative;

  &:hover {
    box-shadow: var(--bs);
    cursor: pointer;
    & > .showOnHover {
      display: block;
    }
  }
  &.out-of-stock::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
  }
  &.out-of-stock .image-container::after {
    content: "Out of Stock";
    position: absolute;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 38.4px;
    color: #8d8f9a;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: var(--card-image-height);
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top;
  }
`;

const CardBody = styled.div`
  margin-top: 1.5rem;
  --flow-spacer: 0.5rem;
  .title {
    font-weight: 300;
    font-size: 1.125rem;
    line-height: 1.6;
  }
`;

const CartButton = styled.button`
  background-color: var(--accent, green);
  padding: 10px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: none;
  position: absolute;
  bottom: 5.75rem;
  right: 2.5rem;
`;

type ProductCardProps = {
  product: Product;
  handleClick: MouseEventHandler<HTMLDivElement>;
};
type ProductCardState = {};
class ProductCard extends Component<ProductCardProps, ProductCardState> {
  render() {
    return (
      <Card
        onClick={this.props.handleClick}
        className={!this.props.product.inStock ? "out-of-stock" : ""}
      >
        <ImageContainer className="image-container">
          <img
            src={this.props.product.gallery[0]}
            alt={this.props.product.name}
          />
        </ImageContainer>
        <CardBody className="flow-content">
          <h3 className="title">
            {this.props.product.brand} {this.props.product.name}
          </h3>
          <PriceViewer priceData={this.props.product.prices} type="card" />
        </CardBody>

        <CartButton
          className={this.props.product.inStock ? "showOnHover" : ""}
          onClick={(e) => {
            e.stopPropagation();
            if (this.props.product.attributes.length > 0) {
              renderAttributeModal(this.props.product);
            } else {
              addToCart(this.props.product, new Map());
            }
          }}
        >
          <CartIcon />
        </CartButton>
      </Card>
    );
  }
}

export default ProductCard;
