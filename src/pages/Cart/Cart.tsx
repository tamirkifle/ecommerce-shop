import styled from "@emotion/styled";
import { Component } from "react";
import { products } from "../../mockData";
import { AttributeViewer } from "../../components/AttributeRelated";
import { CartItem } from "../../types";
import MiniImageSlider from "../../components/MiniImageSlider";
import { Link } from "react-router-dom";
import QuantityCounter from "../../components/QuantityCounter";

const CartStyled = styled.div`
  max-width: 1200px;
  .page-title {
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
  align-items: center;
  border-top: 1px solid #e5e5e5;
  padding: 1.25rem 0;
  .total {
    font-size: 1.5rem;
    font-weight: 600;
  }
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
          quantity: 1,
          selectedAttributes: product.attributes.map((attribute) => ({
            id: attribute.id,
            name: attribute.name,
            type: attribute.type,
            item: attribute.items[0],
          })),
        } as CartItem)
    ),
  };

  setQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      //TODO: Replace Confirm with Modal
      if (
        // eslint-disable-next-line no-restricted-globals
        confirm(`Are you sure you want to remove the item from your cart?
      `)
      ) {
        //remove the item if quantity is one
        this.setState((oldState) => {
          const newState = { ...oldState };
          const itemIndex = newState.cartItems.findIndex(
            (cartItem) => cartItem.id === itemId
          );
          if (itemIndex !== -1) {
            newState.cartItems.splice(itemIndex, 1);
          }
          return newState;
        });
      }
      return;
    }
    this.setState((oldState) => {
      const newState = { ...oldState };
      const itemIndex = newState.cartItems.findIndex(
        (cartItem) => cartItem.id === itemId
      );
      newState.cartItems[itemIndex].quantity = newQuantity;
      return newState;
    });
  };

  render() {
    const cartHasItems = this.state.cartItems.length > 0;
    return (
      <CartStyled>
        <h1 className="page-title">Cart</h1>
        {cartHasItems ? (
          <>
            {this.state.cartItems.map((item) => (
              <CartItemStyled key={item.id}>
                <div className="flow-content">
                  <ProductTitle className="flow-content">
                    <h3 className="product-brand">{item.brand}</h3>
                    <h3 className="product-name">{item.name}</h3>
                  </ProductTitle>
                  <Price>
                    $
                    {(item.prices.find(
                      (price) => price.currency.label === "USD"
                    )?.amount || 0) * item.quantity}
                  </Price>
                  {item.selectedAttributes.map((attribute) => (
                    <AttributeViewer key={attribute.id} attribute={attribute} />
                  ))}
                </div>
                <div className="split align-center">
                  <QuantityCounter
                    quantity={item.quantity}
                    increaseQuantity={() =>
                      this.setQuantity(item.id, item.quantity + 1)
                    }
                    decreaseQuantity={() =>
                      this.setQuantity(item.id, item.quantity - 1)
                    }
                  />
                  <MiniImageSlider gallery={item.gallery} />
                </div>
              </CartItemStyled>
            ))}
            <CartItemStyled>
              <h2 className="total">Total: </h2>
              <Price>
                $
                {this.state.cartItems.reduce((acc, item) => {
                  return (
                    acc +
                    (item.prices.find((price) => price.currency.label === "USD")
                      ?.amount || 0) *
                      item.quantity
                  );
                }, 0)}
              </Price>
            </CartItemStyled>
          </>
        ) : (
          <NoCartItems className="flow-content">
            <p>Your Cart is empty.</p>
            <Link to="/" className="btn accent">
              View our Products
            </Link>
          </NoCartItems>
        )}
      </CartStyled>
    );
  }
}

export default Cart;
