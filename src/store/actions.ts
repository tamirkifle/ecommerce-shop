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
    const itemIndex = indexOfItemInCart(cartItemToAdd, oldState.cartItems);
    if (itemIndex !== -1) {
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

const indexOfItemInCart = (cartItem: CartItem, cartItems: CartItem[]) => {
  return cartItems.findIndex((oldCartItem) => {
    //Check if they are the from the same item
    const sameItem = oldCartItem.id === cartItem.id;
    if (!sameItem) {
      return false;
    }
    //Check if all selected attributes are the same value
    let allSameAttributes = true;
    for (const [key, value] of cartItem.selectedAttributes) {
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
};

export const setQuantity = (cartItem: CartItem, newQuantity: number) => {
  const oldStore = globalStore();
  const cartItemsCopy = [...oldStore.cartItems];
  if (newQuantity === 0) {
    const removeItem = () => {
      const itemIndex = indexOfItemInCart(cartItem, cartItemsCopy);
      if (itemIndex !== -1) {
        cartItemsCopy.splice(itemIndex, 1);
      }
      globalStore({ ...oldStore, cartItems: cartItemsCopy });
      saveCartOnLocalStorage(cartItemsCopy);
      return;
    };

    confirmWithModal(
      `Remove this item from cart?`,
      removeItem,
      () => closeModal(),
      cartItem
    );
    return;
  }
  const itemIndex = indexOfItemInCart(cartItem, cartItemsCopy);
  if (itemIndex !== -1) {
    cartItemsCopy[itemIndex].quantity = newQuantity;
  }
  const newStore = { ...oldStore, cartItems: cartItemsCopy };
  saveCartOnLocalStorage(newStore.cartItems);
  globalStore(newStore);
  return;
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
