import { CartItem, Currency } from "../types";

const calculateTotal = (cartItems: CartItem[], currency: Currency) =>
  cartItems.reduce((acc, item) => {
    return (
      acc +
      (item.prices.find((price) => price.currency.label === currency.label)
        ?.amount || 0) *
        item.quantity
    );
  }, 0);
export const calculateTotalQuantity = (cartItems: CartItem[]) =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0);

export default calculateTotal;
