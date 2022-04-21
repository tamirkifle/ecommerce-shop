import globalStore from ".";
import { CartItem, Currency, Product, SelectedAttributes } from "../types";
import { productToCartItem } from "../utils/productToCartItem";
import {
  AlreadyInCartError,
  MissingAttributeError,
  OutOfStockError,
} from "./errors";
import {
  saveCartOnLocalStorage,
  saveCurrencyOnLocalStorage,
} from "./localStorage";
import {
  confirmWithModal,
  renderAddedToCartModal,
  renderErrorModal,
} from "./modalBuilders";
import { GlobalStoreType } from "./types";

export const changeCurrency = (newCurrency: Currency) => {
  const newState: GlobalStoreType = {
    ...globalStore(),
    pageCurrency: newCurrency,
    isCurrencySwitcherOpen: false,
  };
  globalStore(newState);
  saveCurrencyOnLocalStorage(newCurrency);
};

export const addToCart = (
  itemToAdd: Product,
  selectedAttributes: SelectedAttributes
): boolean => {
  try {
    let cartItemToAdd: CartItem = productToCartItem(
      itemToAdd,
      selectedAttributes
    );
    for (const { id } of itemToAdd.attributes) {
      if (!selectedAttributes.get(id)) {
        throw new MissingAttributeError(
          "All of the item attributes must be selected before adding to cart."
        );
      }
    }
    if (!cartItemToAdd.inStock) {
      throw new OutOfStockError("Item is out of stock.");
    }
    const oldState = globalStore();
    const itemInOldState = oldState.cartItems.find((oldCartItem) => {
      //Check if they are the from the same item
      const sameItem = oldCartItem.id === cartItemToAdd.id;
      if (!sameItem) {
        return false;
      }
      //Check if all selected attributes are the same value
      let allSameAttributes = true;
      for (const [key, value] of cartItemToAdd.selectedAttributes) {
        const oldSelectedAttributes = oldCartItem.selectedAttributes.get(key);
        if (
          !oldSelectedAttributes ||
          (oldSelectedAttributes.id === value.id &&
            oldSelectedAttributes.item.id !== value.item.id)
        ) {
          allSameAttributes = false;
          break;
        }
      }
      return allSameAttributes ? true : false;
    });
    if (itemInOldState) {
      throw new AlreadyInCartError("Item is already in the cart");
    }

    const newState = {
      ...oldState,
      cartItems: [...oldState.cartItems, cartItemToAdd],
    };

    globalStore(newState);
    saveCartOnLocalStorage(newState.cartItems);
    renderAddedToCartModal(cartItemToAdd);
    return true;
  } catch (e: any) {
    if (
      e instanceof OutOfStockError ||
      e instanceof AlreadyInCartError ||
      e instanceof MissingAttributeError
    ) {
      renderErrorModal(e.message);
      return false;
    } else {
      throw e;
    }
  }
};

export const setQuantity = (itemId: string, newQuantity: number) => {
  const newStore = { ...globalStore() };
  if (newQuantity === 0) {
    const removeItem = () => {
      const newCartItems = newStore.cartItems.filter(
        (cartItem) => cartItem.id !== itemId
      );
      globalStore({ ...newStore, cartItems: newCartItems });
      saveCartOnLocalStorage(newCartItems);
      return;
    };
    const itemToRemove = newStore.cartItems.find(
      (cartItem) => cartItem.id === itemId
    );
    if (itemToRemove) {
      confirmWithModal(
        `Remove this item from cart?`,
        removeItem,
        () => closeModal(),
        itemToRemove
      );
    }
    return;
  }
  const itemIndex = newStore.cartItems.findIndex(
    (cartItem) => cartItem.id === itemId
  );
  newStore.cartItems[itemIndex].quantity = newQuantity;
  saveCartOnLocalStorage(newStore.cartItems);
  return globalStore(newStore);
};

export const toggleCurrencySwitcher = () => {
  const oldState = globalStore();
  return globalStore({
    ...oldState,
    isMiniCartOpen: false,
    isCurrencySwitcherOpen: !oldState.isCurrencySwitcherOpen,
  });
};
export const toggleMiniCart = () => {
  const oldState = globalStore();
  return globalStore({
    ...oldState,
    isCurrencySwitcherOpen: false,
    isMiniCartOpen: !oldState.isMiniCartOpen,
  });
};

export const closeDropdowns = () => {
  const oldState = globalStore();
  return globalStore({
    ...oldState,
    isCurrencySwitcherOpen: false,
    isMiniCartOpen: false,
  });
};
export const showModal = () => {
  const oldState = globalStore();
  return globalStore({
    ...oldState,
    showModal: true,
  });
};
export const closeModal = () => {
  const oldState = globalStore();
  return globalStore({
    ...oldState,
    showModal: false,
  });
};
export const renderInModal = (children: React.ReactNode) => {
  const oldState = globalStore();
  return globalStore({
    ...oldState,
    showModal: true,
    ModalChildren: children,
  });
};
