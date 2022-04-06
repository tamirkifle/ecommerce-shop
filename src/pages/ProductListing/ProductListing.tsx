import { Component } from "react";
import ProductCard from "./components/ProductCard";

export default class ProductListing extends Component {
  render() {
    return (
      <div>
        <h1>ProductListing</h1>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    );
  }
}
