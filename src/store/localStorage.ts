import { CartItem, Currency } from "../types";

export const localStorageCart = JSON.parse(
  localStorage.getItem("shophaven-cart") as string
)?.map((cartItem: CartItem) => ({
  ...cartItem,
  selectedAttributes: new Map(Object.entries(cartItem.selectedAttributes)),
}));

export const localStorageCurrency = JSON.parse(
  localStorage.getItem("shophaven-currency") as string
);

export const saveCartOnLocalStorage = (cartItems: CartItem[]) => {
  const cartItemsForLS = cartItems.map((cartItem) => ({
    ...cartItem,
    selectedAttributes: Object.fromEntries(cartItem.selectedAttributes),
  }));
  localStorage.setItem("shophaven-cart", JSON.stringify(cartItemsForLS));
};
export const saveCurrencyOnLocalStorage = (currency: Currency) => {
  localStorage.setItem("shophaven-currency", JSON.stringify(currency));
};
