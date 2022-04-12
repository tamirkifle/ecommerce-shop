import styled from "@emotion/styled";
import { Component, MouseEventHandler } from "react";
import { ReactComponent as CartIcon } from "../../../assets/empty_cart_white.svg";
import { Price, Product } from "../../../types";

const Card = styled.div`
  width: 386px;
  /* height: 480px; */
  font-size: 1.125rem;
  padding: 2rem;
  position: relative;

  & > img {
    width: 354px;
    height: 330px;
    object-fit: contain;
    object-position: top;
    margin-bottom: 1.5rem;
  }

  .title {
    font-weight: 300;
    margin-bottom: 0.5rem;
    font-size: 1.125rem;
    line-height: 1.6;
  }

  .price {
    font-weight: 500;
  }

  &:hover {
    box-shadow: var(--bs, 0px 4px 35px rgba(168, 172, 176, 0.19));
    cursor: pointer;
    & > .showOnHover {
      display: block;
    }
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

class ProductCard extends Component<ProductCardProps> {
  state = { priceWithCurrency: null };
  componentDidMount() {
    let price = this.props.product.prices.find(
      (price: Price) => price.currency.label === "USD"
    );
    if (!price) {
      price = this.props.product.prices.find(
        (price: Price) => price.currency.label === "USD"
      );
    }
    this.setState({
      priceWithCurrency: `${price?.currency.symbol}${price?.amount}`,
    });
  }
  render() {
    const { product } = this.props;
    return (
      <Card onClick={this.props.handleClick}>
        <img
          src={product.gallery[0]}
          alt={product.name}
          style={{ width: "100%" }}
        />
        <h3 className="title">
          {product.brand} {product.name}
        </h3>
        <p className="price">{this.state.priceWithCurrency}</p>
        <CartButton
          className="showOnHover"
          // onClick={(e) => {
          //   e.stopPropagation();
          //   console.log("Adding To Cart...");
          // }}
        >
          <CartIcon />
        </CartButton>
      </Card>
    );
  }
}

export default ProductCard;
