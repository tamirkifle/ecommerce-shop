export type Product = {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: Attribute[];
  prices: Price[];
  brand: string;
};
export type AttributeItem = {
  id: string;
  displayValue: string;
  value: string;
};

export type Attribute = {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
};

export type Currency = {
  label: string;
  symbol: string;
};

export type Price = {
  currency: Currency;
  amount: number;
};

export type SelectedAttribute = {
  id: string;
  name: string;
  type: string;
  item: AttributeItem;
};

export type CartItem = {
  id: string;
  brand: string;
  name: string;
  quantity: number;
  gallery: string[];
  prices: Price[];
  selectedAttributes: SelectedAttribute[];
};

export type Category = {
  name: string;
};

export type ListingProduct = {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  brand: string;
  prices: Price[];
};
