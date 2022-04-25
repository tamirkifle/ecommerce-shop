import { Currency } from "../types";

const USDformatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
});
const EURformatter = new Intl.NumberFormat("de", {
  style: "currency",
  currency: "EUR",
});
const GBPformatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "GBP",
});
const AUDformatter = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "AUD",
});
const RUBformatter = new Intl.NumberFormat("ru", {
  style: "currency",
  currency: "RUB",
});
const JPYformatter = new Intl.NumberFormat("ja", {
  style: "currency",
  currency: "JPY",
});
const decimalFormatter = new Intl.NumberFormat("en");

const formatters = {
  USD: USDformatter,
  EUR: EURformatter,
  GBP: GBPformatter,
  AUD: AUDformatter,
  RUB: RUBformatter,
  JPY: JPYformatter,
};
const currencyFormatter = (price: number, currency: Currency) => {
  const formatter = (formatters as any)?.[currency.label];
  if (formatter) {
    return formatter.format(price);
  } else {
    return currency.symbol + decimalFormatter.format(price);
  }
};
export default currencyFormatter;
