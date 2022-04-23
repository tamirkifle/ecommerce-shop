import { CartItem, Currency } from "../types";

const calculateTotal = (cartItems: CartItem[], currency: Currency) => {
  return (
    Math.round(
      cartItems.reduce((acc, item) => {
        return (
          acc +
          (item.prices.find((price) => price.currency.label === currency.label)
            ?.amount || 0) *
            item.quantity
        );
      }, 0) * 100
    ) / 100
  );
};

export default calculateTotal;
