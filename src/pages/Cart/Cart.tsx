import styled from "@emotion/styled";
import { Component } from "react";
import { Link } from "react-router-dom";
import { withStore, WithStoreProps } from "../../graphql/withStore";
import { CartItemViewer, TotalViewer } from "../../components/CartItemRelated";
import calculateTotal from "../../utils/calculateTotal";

const CartStyled = styled.div`
  --flex-spacer: 1rem;
  max-width: 1200px;
`;
const CartTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 3.75rem;
`;

const NoCartItems = styled.div`
  --flow-spacer: 2rem;
  p {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;
interface CartOwnProps {}

interface CartState {}

type CartProps = CartOwnProps & WithStoreProps;
class Cart extends Component<CartProps, CartState> {
  render() {
    const { pageCurrency, cartItems } = this.props.storeVar;
    const cartHasItems = cartItems.length > 0;
    return (
      <CartStyled>
        <CartTitle>Cart</CartTitle>
        {cartHasItems ? (
          <>
            {cartItems.map((item) => (
              <CartItemViewer
                cartItem={item}
                type="cart"
                key={item.id.concat(
                  "_",
                  Array.from(item.selectedAttributes.values())
                    .map((v) => v.item.value)
                    .join("_")
                )}
              />
            ))}
            <TotalViewer
              total={calculateTotal(cartItems, pageCurrency)}
              type="cart"
            />
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

export default withStore(Cart);
