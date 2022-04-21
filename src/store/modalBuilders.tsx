import AddToCartModal from "../components/modals/AddedToCartModal";
import AttributeModal from "../components/modals/AttributeModal";
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
