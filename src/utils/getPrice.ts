import { Currency, Price } from "../types";

export default function getPrice(
  priceData: Price[] | number,
  pageCurrency: Currency,
  quantity: number = 1
) {
  if (typeof priceData === "number") {
    return priceData * quantity;
  } else {
    const priceForCurrency = priceData.find(
      (price) => price.currency.label === pageCurrency.label
    );
    if (priceForCurrency === undefined) {
      throw Error("No price available for the page currency");
    }
    return priceForCurrency.amount * quantity;
  }
}
