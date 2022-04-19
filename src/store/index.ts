import { makeVar } from "@apollo/client";
import { GlobalStoreType } from "./types";

const initialState: GlobalStoreType = {
  pageCurrency: { label: "GBP", symbol: "£" },
  defaultCategory: "all",
  cartItems: [],
};

const store = makeVar(initialState);
export default store;
