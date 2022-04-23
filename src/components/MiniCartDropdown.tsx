import styled from "@emotion/styled";
import { Component, createRef } from "react";
import Dropdown from "./Dropdown";
import { withStore, WithStoreProps } from "../graphql/withStore";
import { closeDropdowns, toggleMiniCart } from "../store/actions";
import { ReactComponent as CartIcon } from "../assets/empty_cart.svg";
import { Link } from "react-router-dom";
import { CartItem } from "../types";
import { CartItemViewer, TotalViewer } from "./CartItemRelated";
import calculateTotal from "../utils/calculateTotal";

const MiniCartStyled = styled.div`
  --flex-spacer: 1rem;
  position: relative;
  z-index: 3;
  font-size: 1rem;
  font-weight: 500;
`;
const MiniCartHeader = styled.p`
  font-size: inherit;
  font-weight: inherit;
`;
const CartIconContainer = styled.div`
  position: relative;
`;
const CartCounter = styled.div`
  position: absolute;
  top: -10px;
  right: -12px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-family: var(--ff-roboto);
  font-weight: 700;
  font-size: 14px;
  background-color: black;
  color: white;
  border-radius: 50%;
`;
const CartButton = styled.button`
  padding: 1rem;
  font-size: 1.25rem;
  line-height: 0;
  min-width: 66px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const CartItemsContainer = styled.div`
  max-height: 540px;
  overflow-y: auto;
  padding: 1rem;
`;
const CartFooter = styled.div`
  padding: 1rem;
`;

const NoCartItems = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  p {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;
const MinCartActionButtons = styled.div`
  text-transform: uppercase;
  text-align: center;
`;

interface MiniCartDropdownOwnProps {}

type MiniCartDropdownProps = MiniCartDropdownOwnProps & WithStoreProps;
interface MiniCartDropdownState {}
class MiniCartDropdown extends Component<
  MiniCartDropdownProps,
  MiniCartDropdownState
> {
  state = {
    isMiniCartOpen: false,
  };
  currencyBtn = createRef<HTMLButtonElement>();

  getTotalQuantity = (cartItems: CartItem[]) =>
    cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

  render() {
    const { pageCurrency, isMiniCartOpen, cartItems } = this.props.storeVar;
    const cartCount = this.getTotalQuantity(cartItems);
    return (
      <MiniCartStyled>
        <CartButton title="Cart" onClick={toggleMiniCart}>
          <CartIconContainer>
            <CartIcon />
            {cartCount > 0 && <CartCounter>{cartCount}</CartCounter>}
          </CartIconContainer>
        </CartButton>
        <Dropdown
          style={{ right: "0", minWidth: "341px" }}
          isOpen={isMiniCartOpen}
          onClose={closeDropdowns}
        >
          {cartItems.length > 0 ? (
            <>
              <CartItemsContainer>
                <header>
                  <MiniCartHeader>
                    <span className="bold">My Bag</span>, {cartItems.length}{" "}
                    items
                  </MiniCartHeader>
                </header>
                {cartItems.map((item) => (
                  <CartItemViewer
                    key={item.id.concat(
                      "_",
                      Array.from(item.selectedAttributes.values())
                        .map((v) => v.item.value)
                        .join("_")
                    )}
                    cartItem={item}
                    type="minicart"
                  />
                ))}
              </CartItemsContainer>
              <CartFooter>
                <TotalViewer
                  type="minicart"
                  total={calculateTotal(cartItems, pageCurrency)}
                />

                <MinCartActionButtons className="split justify-stretch">
                  <Link
                    to="/cart"
                    className="btn"
                    onClick={() => closeDropdowns()}
                  >
                    View Bag
                  </Link>
                  <Link
                    to="/cart"
                    className="btn accent"
                    onClick={() => closeDropdowns()}
                  >
                    Check Out
                  </Link>
                </MinCartActionButtons>
              </CartFooter>
            </>
          ) : (
            <NoCartItems>
              <p>🛒 Cart is empty.</p>
            </NoCartItems>
          )}
        </Dropdown>
      </MiniCartStyled>
    );
  }
}

export default withStore(MiniCartDropdown);
