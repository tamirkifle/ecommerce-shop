import { CartItem, Currency } from "../types";

const localStoragePrefix = `shophavenv2`;

export const localStorageCart = JSON.parse(
  localStorage.getItem(`${localStoragePrefix}-cart`) as string
)?.map((cartItem: CartItem) => ({
  ...cartItem,
  selectedAttributes: new Map(Object.entries(cartItem.selectedAttributes)),
}));

export const localStorageCurrency = JSON.parse(
  localStorage.getItem(`${localStoragePrefix}-currency`) as string
);

export const saveCartOnLocalStorage = (cartItems: CartItem[]) => {
  const cartItemsForLS = cartItems.map((cartItem) => ({
    ...cartItem,
    selectedAttributes: Object.fromEntries(cartItem.selectedAttributes),
  }));
  localStorage.setItem(
    `${localStoragePrefix}-cart`,
    JSON.stringify(cartItemsForLS)
  );
};
export const saveCurrencyOnLocalStorage = (currency: Currency) => {
  localStorage.setItem(
    `${localStoragePrefix}-currency`,
    JSON.stringify(currency)
  );
};
