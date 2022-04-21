import { Component } from "react";
import { WithStoreProps, withStore } from "../../graphql/withStore";
import { closeModal, addToCart } from "../../store/actions";
import { Product, SelectedAttributes, SelectedAttribute } from "../../types";
import { MiniAttributeInput } from "../AttributeRelated";
import {
  CartItemStyled,
  CartInfoStyled,
  ProductInfo,
  ProductTitle,
  Price,
  Attributes,
} from "../MiniCartDropdown";
import MiniImageSlider from "../MiniImageSlider";
import { ModalBaseStyled } from "../commonStyles";

interface AttributeModalOwnProps {
  product: Product;
  selectedAttributes?: SelectedAttributes;
}
interface AttributeModalState {
  selectedAttributes: SelectedAttributes;
}

type AttributeModalProps = WithStoreProps & AttributeModalOwnProps;
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
    const { pageCurrency } = this.props.storeVar;
    return (
      <ModalBaseStyled>
        <CartItemStyled key={this.props.product.id}>
          <CartInfoStyled className="flow-content">
            <ProductInfo className="flow-content">
              <ProductTitle className="flow-content">
                <span className="product-brand">
                  {this.props.product.brand}
                </span>
                <span className="product-name">{this.props.product.name}</span>
              </ProductTitle>
            </ProductInfo>
            <Price>
              <h4 className="section-title">Price: </h4>
              <p className="section-main">
                {pageCurrency.symbol}
                {
                  this.props.product.prices.find(
                    (price) => price.currency.label === pageCurrency.label
                  )?.amount
                }
              </p>
            </Price>
            <Attributes className="flow-content">
              <p>Please choose attributes:</p>
              {this.props.product.attributes.map((attribute) => (
                <MiniAttributeInput
                  key={attribute.id}
                  attribute={attribute}
                  selectedAttribute={this.state.selectedAttributes?.get(
                    attribute.id
                  )}
                  setSelectedAttributes={this.setSelectedAttributes}
                />
              ))}
            </Attributes>
          </CartInfoStyled>
          <MiniImageSlider
            gallery={this.props.product.gallery}
            style={{
              width: "105px",
              height: "184px",
            }}
          />
        </CartItemStyled>

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
export default withStore(AttributeModalBase);
