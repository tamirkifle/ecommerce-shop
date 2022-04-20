import globalStore from ".";
import { CartItem, Currency } from "../types";
import { AlreadyInCartError, OutOfStockError } from "./errors";
import { GlobalStoreType } from "./types";

export const changeCurrency = (newCurrency: Currency): GlobalStoreType => {
  const newState: GlobalStoreType = {
    ...globalStore(),
    pageCurrency: newCurrency,
  };
  return globalStore(newState);
};

export const addToCart = (itemToAdd: CartItem): boolean => {
  if (!itemToAdd.inStock) {
    throw new OutOfStockError("Item is out of stock.");
  }
  const oldState = globalStore();
  const itemInOldState = oldState.cartItems.find((oldCartItem) => {
    //Check if they are the from the same item
    const sameItem = oldCartItem.id === itemToAdd.id;
    if (!sameItem) {
      return false;
    }
    //Check if all selected attributes are the same value
    let allSameAttributes = true;
    for (const [key, value] of itemToAdd.selectedAttributes) {
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

  console.log("New Item");
  const newState = {
    ...oldState,
    cartItems: [...oldState.cartItems, itemToAdd],
  };
  globalStore(newState);
  return true;
};
export const setQuantity = (itemId: string, newQuantity: number) => {
  const newStore = { ...globalStore() };

  if (newQuantity === 0) {
    //TODO: Replace Confirm with Modal
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(`Are you sure you want to remove the item from your cart?
    `)
    ) {
      //remove the item if quantity is one
      const itemIndex = newStore.cartItems.findIndex(
        (cartItem) => cartItem.id === itemId
      );
      if (itemIndex !== -1) {
        newStore.cartItems.splice(itemIndex, 1);
        return globalStore(newStore);
      }
    }
    return;
  }
  const itemIndex = newStore.cartItems.findIndex(
    (cartItem) => cartItem.id === itemId
  );
  newStore.cartItems[itemIndex].quantity = newQuantity;
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
