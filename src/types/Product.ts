export type Product = {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: {
    id: string;
    name: string;
    type: string;
    items: {
      id: string;
      displayValue: string;
      value: string;
    }[];
  }[];
  prices: {
    currency: {
      label: string;
      symbol: string;
    };
    amount: number;
  }[];
  brand: string;
};
