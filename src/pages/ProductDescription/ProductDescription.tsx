import styled from "@emotion/styled";
import { Component } from "react";
import { products } from "../../mockData";
import { withRouter, WithRouterProps } from "../../utils/withRouter";

const ProductDescriptionStlyed = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

interface Params {
  productId: string;
}

type Props = WithRouterProps<Params>;

class ProductDescription extends Component<Props> {
  render() {
    const { productId } = this.props.match.params;
    const currentProduct = products.categories.all.find(
      (product) => product.id === productId
    );

    return (
      <ProductDescriptionStlyed className="container">
        {JSON.stringify(currentProduct)}
      </ProductDescriptionStlyed>
    );
  }
}

export default withRouter(ProductDescription);
