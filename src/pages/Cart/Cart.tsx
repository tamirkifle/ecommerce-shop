import styled from "@emotion/styled";
import { Component } from "react";
import { products } from "../../mockData";
import { AttributeViewer } from "../../components/AttributeRelated";
import { CartItem } from "../../types";
import MiniImageSlider from "../../components/MiniImageSlider";
import { Link } from "react-router-dom";

const CartStyled = styled.div`
  max-width: 1200px;
  h2 {
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 3.75rem;
  }
`;

const ProductTitle = styled.header`
  --flow-spacer: 0.5rem;

  .product-brand {
    font-weight: 600;
    margin-bottom: 0.8rem;
  }
  .product-name {
    font-weight: 400;
  }
`;

const CartItemStyled = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e5e5;
  padding: 1.25rem 0;
`;

const Price = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
`;

const NoCartItems = styled.div`
  --flow-spacer: 2rem;
  p {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;
interface CartProps {}

interface CartState {
  cartItems: CartItem[];
}

class Cart extends Component<CartProps, CartState> {
  state = {
    //placeholder, will be replaced by data from global state
    cartItems: products.categories.all.slice(0, 3).map(
      (product) =>
        ({
          id: product.id,
          brand: product.brand,
          name: product.name,
          prices: product.prices,
          gallery: product.gallery,
          selectedAttributes: product.attributes.map((attribute) => ({
            id: attribute.id,
            name: attribute.name,
            type: attribute.type,
            item: attribute.items[0],
          })),
        } as CartItem)
    ),
  };

  cartHasItems = this.state.cartItems.length > 0;
  render() {
    return (
      <CartStyled>
        <h2>Cart</h2>
        {this.cartHasItems ? (
          this.state.cartItems.map((item) => (
            <CartItemStyled>
              <div className="flow-content">
                <ProductTitle className="flow-content">
                  <h3 className="product-brand">{item.brand}</h3>
                  <h3 className="product-name">{item.name}</h3>
                </ProductTitle>
                <Price>
                  $
                  {
                    item.prices.find((price) => price.currency.label === "USD")
                      ?.amount
                  }
                </Price>
                {item.selectedAttributes.map((attribute) => (
                  <AttributeViewer attribute={attribute} />
                ))}
              </div>
              <MiniImageSlider gallery={item.gallery} />
            </CartItemStyled>
          ))
        ) : (
          <NoCartItems className="flow-content">
            <p>Your Cart is empty.</p>
            <Link to="/" className="btn accent">
              View our Products
            </Link>
          </NoCartItems>
        )}

        {/* <QuantitySelector /> */}
      </CartStyled>
    );
  }
}

export default Cart;
