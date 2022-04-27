import { Component } from "react";
import { Link } from "react-router-dom";
import { closeModal } from "../../store/actions";
import { CartItem } from "../../types";
import { ModalBaseStyled } from "../commonStyles";
import { CartItemViewer } from "../CartItemRelated";

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
        <CartItemViewer cartItem={this.props.cartItem} type="modal" />
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
