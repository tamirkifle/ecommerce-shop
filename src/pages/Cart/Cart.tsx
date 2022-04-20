import styled from "@emotion/styled";
import { Component } from "react";
import { AttributeViewer } from "../../components/AttributeRelated";
import MiniImageSlider from "../../components/MiniImageSlider";
import { Link } from "react-router-dom";
import QuantityCounter from "../../components/QuantityCounter";
import { withStore, WithStoreProps } from "../../graphql/withStore";
import { setQuantity } from "../../store/actions";

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
interface CartOwnProps {}

interface CartState {}

type CartProps = CartOwnProps & WithStoreProps;
class Cart extends Component<CartProps, CartState> {
  render() {
    const { pageCurrency, cartItems } = this.props.storeVar;
    const cartHasItems = cartItems.length > 0;
    return (
      <CartStyled>
        <h1 className="page-title">Cart</h1>
        {cartHasItems ? (
          <>
            {cartItems.map((item) => (
              <CartItemStyled key={item.id}>
                <div className="flow-content">
                  <ProductTitle className="flow-content">
                    <h3 className="product-brand">{item.brand}</h3>
                    <h3 className="product-name">{item.name}</h3>
                  </ProductTitle>
                  <Price>
                    {pageCurrency.symbol}
                    {(item.prices.find(
                      (price) => price.currency.label === pageCurrency.label
                    )?.amount || 0) * item.quantity}
                  </Price>
                  {Array.from(item.selectedAttributes.values()).map(
                    (sAttribute) => (
                      <AttributeViewer
                        key={sAttribute.id}
                        selectedAttribute={sAttribute}
                      />
                    )
                  )}
                </div>
                <div className="split align-center">
                  <QuantityCounter
                    quantity={item.quantity}
                    increaseQuantity={() =>
                      setQuantity(item.id, item.quantity + 1)
                    }
                    decreaseQuantity={() =>
                      setQuantity(item.id, item.quantity - 1)
                    }
                  />
                  <MiniImageSlider gallery={item.gallery} />
                </div>
              </CartItemStyled>
            ))}
            <CartItemStyled>
              <h2 className="total">Total: </h2>
              <Price>
                {pageCurrency.symbol}
                {Math.round(
                  cartItems.reduce((acc, item) => {
                    return (
                      acc +
                      (item.prices.find(
                        (price) => price.currency.label === pageCurrency.label
                      )?.amount || 0) *
                        item.quantity
                    );
                  }, 0) * 100
                ) / 100}
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

export default withStore(Cart);
