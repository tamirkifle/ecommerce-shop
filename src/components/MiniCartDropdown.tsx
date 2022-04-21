import styled from "@emotion/styled";
import { Component, createRef } from "react";
import Dropdown from "./Dropdown";
import { withStore, WithStoreProps } from "../graphql/withStore";
import { closeDropdowns, setQuantity, toggleMiniCart } from "../store/actions";
import { ReactComponent as CartIcon } from "../assets/empty_cart.svg";
import MiniImageSlider from "./MiniImageSlider";
import QuantityCounter from "./QuantityCounter";
import { MiniAttributeViewer } from "./AttributeRelated";
import { Link } from "react-router-dom";

const MiniCartStyled = styled.div`
  position: relative;
  z-index: 3;
  font-size: 1rem;
  font-weight: 500;
  .action-button {
    padding: 1rem;
    font-size: 1.25rem;
    line-height: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .mini-cart-header h2 {
    font-size: inherit;
    font-weight: inherit;
  }
`;

const ProductTitle = styled.h3`
  --flow-spacer: 0.5rem;
  font-size: inherit;
  font-weight: inherit;
  span {
    display: block;
    font-weight: 300;
  }
`;
const CartItemsContainer = styled.div`
  max-height: 540px;
  overflow-y: auto;
  padding: 1rem;
`;
const CartFooter = styled.div`
  padding: 1rem;
`;

const CartItemStyled = styled.div`
  display: flex;
  min-height: 170px;
  justify-content: space-between;
  align-items: stretch;
  padding: 1.25rem 0;

  & > *:last-of-type {
    flex-basis: 30%;
  }
`;
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 0;
  h2 {
    font-size: inherit;
  }
`;

const CartInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-basis: 70%;
`;
const Price = styled.div``;
const ProductInfo = styled.div`
  --flow-spacer: 1rem;
`;
const QtyImageContainer = styled.div`
  --flex-spacer: 10px;
  max-height: 170px;
`;
const Attributes = styled.div`
  --flex-spacer: 10px;
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

  render() {
    const { pageCurrency, isMiniCartOpen, cartItems } = this.props.storeVar;

    return (
      <MiniCartStyled>
        <button className="action-button" title="Cart" onClick={toggleMiniCart}>
          <CartIcon />
        </button>
        <Dropdown
          style={{ right: "0", minWidth: "341px" }}
          isOpen={isMiniCartOpen}
          onClose={closeDropdowns}
          overlayConfig={{ bgColor: "rgba(57, 55, 72, 0.22)" }}
        >
          {cartItems.length > 0 ? (
            <>
              <CartItemsContainer>
                <header className="mini-cart-header">
                  <h2>
                    <span className="bold">My Bag</span>, {cartItems.length}{" "}
                    items
                  </h2>
                </header>
                {cartItems.map((item) => (
                  <CartItemStyled key={item.id}>
                    <CartInfoStyled className="flow-content">
                      <ProductInfo className="flow-content">
                        <ProductTitle className="flow-content">
                          <span className="product-brand">{item.brand}</span>
                          <span className="product-name">{item.name}</span>
                        </ProductTitle>
                        <Price>
                          {pageCurrency.symbol}
                          {Math.round(
                            (item.prices.find(
                              (price) =>
                                price.currency.label === pageCurrency.label
                            )?.amount || 0) *
                              item.quantity *
                              100
                          ) / 100}
                        </Price>
                        <Attributes className="flow-content">
                          {Array.from(item.selectedAttributes.values()).map(
                            (sAttribute) => (
                              <MiniAttributeViewer
                                key={sAttribute.id}
                                selectedAttribute={sAttribute}
                              />
                            )
                          )}
                        </Attributes>
                      </ProductInfo>
                    </CartInfoStyled>
                    <QtyImageContainer className="split">
                      <QuantityCounter
                        quantity={item.quantity}
                        increaseQuantity={() =>
                          setQuantity(item.id, item.quantity + 1)
                        }
                        decreaseQuantity={() =>
                          setQuantity(item.id, item.quantity - 1)
                        }
                        btnStyle={{
                          fontSize: "1rem",
                          padding: "0",
                          minWidth: "24px",
                          minHeight: "24px",
                        }}
                      />
                      <MiniImageSlider
                        gallery={item.gallery}
                        style={{
                          minWidth: "105px",
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </QtyImageContainer>
                  </CartItemStyled>
                ))}
              </CartItemsContainer>
              <CartFooter>
                <Total className="bold">
                  <h2>Total: </h2>
                  <Price>
                    {pageCurrency.symbol}
                    {Math.round(
                      cartItems.reduce((acc, item) => {
                        return (
                          acc +
                          (item.prices.find(
                            (price) =>
                              price.currency.label === pageCurrency.label
                          )?.amount || 0) *
                            item.quantity
                        );
                      }, 0) * 100
                    ) / 100}
                  </Price>
                </Total>
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