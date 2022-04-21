import { Component } from "react";
import { Link } from "react-router-dom";
import { closeModal } from "../../store/actions";
import { CartItem } from "../../types";
import { MiniAttributeViewer } from "../AttributeRelated";
import {
  CartItemStyled,
  CartInfoStyled,
  ProductInfo,
  ProductTitle,
  Attributes,
} from "../MiniCartDropdown";
import MiniImageSlider from "../MiniImageSlider";
import { ModalBaseStyled } from "../commonStyles";

interface AddToCartModalProps {
  cartItem: CartItem;
}

interface AddToCartModalState {}

class AddToCartModal extends Component<
  AddToCartModalProps,
  AddToCartModalState
> {
  render() {
    return (
      <ModalBaseStyled>
        <h2>Successfully added to cart!</h2>
        <CartItemStyled key={this.props.cartItem.id}>
          <CartInfoStyled className="flow-content">
            <ProductInfo className="flow-content">
              <ProductTitle className="flow-content">
                <span className="product-brand">
                  {this.props.cartItem.brand}
                </span>
                <span className="product-name">{this.props.cartItem.name}</span>
              </ProductTitle>
              <Attributes className="flow-content">
                {Array.from(
                  this.props.cartItem.selectedAttributes.values()
                ).map((sAttribute) => (
                  <MiniAttributeViewer
                    key={sAttribute.id}
                    selectedAttribute={sAttribute}
                  />
                ))}
              </Attributes>
            </ProductInfo>
          </CartInfoStyled>
          <MiniImageSlider
            gallery={this.props.cartItem.gallery}
            style={{
              width: "105px",
              height: "184px",
            }}
          />
        </CartItemStyled>
        <div className="action-buttons split flex-end align-end">
          <Link className="btn accent" to="/cart" onClick={closeModal}>
            Go To Cart
          </Link>
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </ModalBaseStyled>
    );
  }
}

export default AddToCartModal;
