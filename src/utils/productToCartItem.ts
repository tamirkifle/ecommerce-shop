import { CartItem, Product, SelectedAttributes } from "../types";

export const productToCartItem = (
  product: Product,
  selectedAttributes: SelectedAttributes
): CartItem => ({
  id: product.id,
  brand: product.brand,
  name: product.name,
  inStock: product.inStock,
  prices: product.prices,
  gallery: product.gallery,
  quantity: 1,
  selectedAttributes: selectedAttributes,
});
