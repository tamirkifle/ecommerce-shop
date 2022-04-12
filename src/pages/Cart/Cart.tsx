import styled from "@emotion/styled";
import { Component } from "react";
import { products } from "../../mockData";
import { AttributeViewer } from "../../components/AttributeRelated";
interface Props {}

interface State {}

const CartStyled = styled.div`
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

const CartItem = styled.div`
  border-top: 1px solid #e5e5e5;
  padding: 1.25rem 0;
  header {
  }
  .price {
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

class Cart extends Component<Props, State> {
  state = {
    cartItems: products.categories.all.slice(0, 3).map((product) => ({
      id: product.id,
      brand: product.brand,
      name: product.name,
      prices: product.prices,
      selectedAttributes: product.attributes,
    })),
  };
  render() {
    return (
      <CartStyled>
        <h2>Cart</h2>
        {this.state.cartItems.map((item) => (
          <CartItem className="flow-content">
            <ProductTitle className="flow-content">
              <h3 className="product-brand">{item.brand}</h3>
              <h3 className="product-name">{item.name}</h3>
            </ProductTitle>
            <p className="price">
              $
              {
                item.prices.find((price) => price.currency.label === "USD")
                  ?.amount
              }
            </p>
            {item.selectedAttributes.map((attribute) => (
              <AttributeViewer attribute={attribute} />
            ))}
          </CartItem>
        ))}

        {/* <QuantitySelector /> */}
        {/* <MiniImageSlider /> */}
      </CartStyled>
    );
  }
}

export default Cart;
