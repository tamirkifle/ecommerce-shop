import styled from "@emotion/styled";
import { Component } from "react";
import ImageViewer from "../../components/ImageViewer";
import { products } from "../../mockData";
import { withRouter, WithRouterProps } from "../../utils/withRouter";
import { Product } from "../../types/Product";
const ProductDescriptionStlyed = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

interface Params {
  productId: string;
}

type State = { currentProduct: Product | null };

type Props = WithRouterProps<Params>;

class ProductDescription extends Component<Props, State> {
  state: State = { currentProduct: null };
  componentDidMount() {
    const { productId } = this.props.match.params;
    const product = products.categories.all.find(
      (product) => product.id === productId
    );
    if (product) {
      this.setState({ currentProduct: product });
    }
  }
  render() {
    if (this.state.currentProduct) {
      return (
        <ProductDescriptionStlyed className="container">
          <ImageViewer images={this.state.currentProduct.gallery} />
        </ProductDescriptionStlyed>
      );
    } else {
      return (
        <ProductDescriptionStlyed className="container">
          <div>Product Not Found</div>
        </ProductDescriptionStlyed>
      );
    }
  }
}

export default withRouter(ProductDescription);
