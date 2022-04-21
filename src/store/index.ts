import { makeVar } from "@apollo/client";
import { localStorageCart, localStorageCurrency } from "./localStorage";
import { GlobalStoreType } from "./types";

const initialState: GlobalStoreType = {
  pageCurrency: localStorageCurrency || {
    label: "GBP",
    symbol: "£",
  },
  defaultCategory: "all",
  cartItems: localStorageCart || [],
  isCurrencySwitcherOpen: false,
  isMiniCartOpen: false,
  showModal: false,
  ModalChildren: null,
};

const store = makeVar(initialState);
export default store;
