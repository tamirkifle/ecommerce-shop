import { makeVar } from "@apollo/client";
import { GlobalStoreType } from "./types";

const initialState: GlobalStoreType = {
  pageCurrency: { label: "GBP", symbol: "£" },
  defaultCategory: "all",
  cartItems: [],
  isCurrencySwitcherOpen: false,
  isMiniCartOpen: false,
  showModal: false,
  ModalChildren: null,
};

const store = makeVar(initialState);
export default store;
