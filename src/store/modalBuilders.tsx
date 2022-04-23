import { CartItemViewer } from "../components/CartItemRelated";
import AddToCartModal from "../components/modals/AddedToCartModal";
import AttributeModal from "../components/modals/AttributeModal";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import ErrorModal from "../components/modals/ErrorModal";
import { CartItem, Product, SelectedAttributes } from "../types";
import { renderInModal } from "./actions";

export const renderErrorModal = (errorMessage: string) => {
  renderInModal(<ErrorModal errorMessage={errorMessage} />);
};

export const renderAddedToCartModal = (cartItem: CartItem) => {
  renderInModal(<AddToCartModal cartItem={cartItem} />);
};

export const renderAttributeModal = (
  product: Product,
  selectedAttributes?: SelectedAttributes
) => {
  renderInModal(
    <AttributeModal product={product} selectedAttributes={selectedAttributes} />
  );
};

export const confirmWithModal = (
  confirmationMessage: string,
  onYes: () => void,
  onNo: () => void,
  cartItem?: CartItem
) => {
  renderInModal(
    <ConfirmationModal
      confirmationMessage={
        cartItem ? (
          <>
            <h2>{confirmationMessage}</h2>
            <CartItemViewer cartItem={cartItem} type="added-to-cart-modal" />
          </>
        ) : (
          confirmationMessage
        )
      }
      onYes={onYes}
      onNo={onNo}
      yesButtonText="Remove"
    />
  );
};
