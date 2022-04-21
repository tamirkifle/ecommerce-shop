import { CartItem, Currency } from "../types";

export type GlobalStoreType = {
  pageCurrency: Currency;
  defaultCategory: string;
  cartItems: CartItem[];
  isCurrencySwitcherOpen: boolean;
  isMiniCartOpen: boolean;
  showModal: boolean;
  ModalChildren: React.ReactNode;
};
