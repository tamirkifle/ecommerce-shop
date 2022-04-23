import { Component } from "react";
import { closeModal, addToCart } from "../../store/actions";
import { Product, SelectedAttributes, SelectedAttribute } from "../../types";
import { ModalBaseStyled } from "../commonStyles";
import { ModalProductViewer } from "../CartItemRelated";

interface AttributeModalOwnProps {
  product: Product;
  selectedAttributes?: SelectedAttributes;
}
interface AttributeModalState {
  selectedAttributes: SelectedAttributes;
}

type AttributeModalProps = AttributeModalOwnProps;
class AttributeModalBase extends Component<
  AttributeModalProps,
  AttributeModalState
> {
  state: AttributeModalState = {
    selectedAttributes:
      this.props.selectedAttributes || new Map<string, SelectedAttribute>(),
  };

  setSelectedAttributes = (selectedAttribute: SelectedAttribute) => {
    this.setState((oldState) => {
      const { selectedAttributes } = { ...oldState };
      selectedAttributes.set(selectedAttribute.id, selectedAttribute);
      return { ...oldState, selectedAttributes };
    });
  };

  render() {
    return (
      <ModalBaseStyled>
        <ModalProductViewer
          product={this.props.product}
          selectedAttributes={this.state.selectedAttributes}
          setSelectedAttributes={this.setSelectedAttributes}
        />
        <div className="action-buttons split flex-end align-end">
          <button
            className="btn accent"
            onClick={() => {
              closeModal();
              addToCart(this.props.product, this.state.selectedAttributes);
            }}
          >
            Add To Cart
          </button>
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </ModalBaseStyled>
    );
  }
}
export default AttributeModalBase;
