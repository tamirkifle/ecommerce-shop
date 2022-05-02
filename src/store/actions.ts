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

const findItemInCart = (
  product: Product,
  selectedAttributes: SelectedAttributes,
  cartItems: CartItem[]
) => {
  //find the items with the same product id in the cart
  const sameProductsInCart = cartItems.filter(
    (oldCartItem) => oldCartItem.productId === product.id
  );

  //Check the products for the one with the same selected attributes
  const cartItemSameAttributes = sameProductsInCart.find((oldCartItem) => {
    let allSameAttributes = true;
    for (const [key, value] of selectedAttributes) {
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
    return allSameAttributes;
  });
  return cartItemSameAttributes;
};

export const addToCart = (
  itemToAdd: Product,
  selectedAttributes: SelectedAttributes
): boolean => {
  try {
    const oldState = globalStore();
    //check if there is an item in the cart with the same product id and same attributes
    const itemInCart = findItemInCart(
      itemToAdd,
      selectedAttributes,
      oldState.cartItems
    );
    if (itemInCart) {
      setQuantity(itemInCart, itemInCart.quantity + 1);
      renderAddedToCartModal(itemInCart);
      return true;
    } else {
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
      const newState = {
        ...oldState,
        cartItems: [...oldState.cartItems, cartItemToAdd],
      };

      globalStore(newState);
      saveCartOnLocalStorage(newState.cartItems);
      renderAddedToCartModal(cartItemToAdd);
      return true;
    }
  } catch (e: any) {
    if (
      e instanceof OutOfStockError ||
      e instanceof AlreadyInCartError ||
      e instanceof MissingAttributeError
    ) {
      renderErrorModal(`<b>${e.message}</b>`);
      return false;
    } else {
      throw e;
    }
  }
};

export const setQuantity = (cartItem: CartItem, newQuantity: number) => {
  const oldStore = globalStore();
  const cartItemsCopy = [...oldStore.cartItems];
  const itemIndex = cartItemsCopy.findIndex(
    (cItem) => cItem.id === cartItem.id
  );
  if (itemIndex === -1) {
    throw new Error(
      "Item is not really in the cart, try refreshing your page."
    );
  }
  if (newQuantity === 0) {
    const removeItem = () => {
      cartItemsCopy.splice(itemIndex, 1);
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
  cartItemsCopy[itemIndex].quantity = newQuantity;
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
