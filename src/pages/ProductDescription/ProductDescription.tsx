import styled from "@emotion/styled";
import { Component } from "react";
import ImageViewer from "../../components/ImageViewer";
import { AttributeInput } from "../../components/AttributeRelated";
import { products } from "../../mockData";
import { withRouter, WithRouterProps } from "../../utils/withRouter";
import { Product } from "../../types/Product";

const ProductDescriptionStyled = styled.div`
  display: flex;
  --flow-sapcer: 6.25rem;
  .section-title {
    font-family: var(--ff-roboto-c, "sans-serif");
    font-weight: 700;
    text-transform: uppercase;
  }
  .section-main {
    margin-top: 0.5rem;
  }
`;
const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
    margin-top: 2rem;
  }
`;
const ProductTitle = styled.section`
  .product-brand {
    font-weight: 600;
    margin-bottom: 0.8rem;
  }
  .product-name {
    font-weight: 400;
  }
`;

const Price = styled.section`
  .section-main {
    font-size: 24px;
    font-weight: 700;
  }
`;
const AddToCartButton = styled.button`
  text-transform: uppercase;
  padding: 1rem 0;
  background-color: var(--accent, green);
  color: white;
  width: 400px;
`;
const Description = styled.div`
  font-family: var(--ff-roboto, "sans-serif");
  line-height: 1.6;
`;

interface Params {
  productId: string;
}

type State = {
  currentProduct: Product | null;
  selectedAttributes: object;
};

type Props = WithRouterProps<Params>;

class ProductDescription extends Component<Props, State> {
  state: State = { currentProduct: null, selectedAttributes: {} };
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
      const { currentProduct } = this.state;
      return (
        <ProductDescriptionStyled className="flow-content">
          <ImageViewer images={currentProduct.gallery} />
          <ProductDetails>
            <ProductTitle>
              <h2 className="product-brand">{currentProduct.brand}</h2>
              <h2 className="product-name">{currentProduct.name}</h2>
            </ProductTitle>
            {currentProduct.attributes.map((attribute) => (
              <AttributeInput key={attribute.id} attribute={attribute} />
            ))}
            <Price>
              <h4 className="section-title">Price: </h4>
              <p className="section-main">
                $
                {
                  currentProduct.prices.find(
                    (price) => price.currency.label === "USD"
                  )?.amount
                }
              </p>
            </Price>
            <AddToCartButton>Add to Cart</AddToCartButton>
            <Description
              dangerouslySetInnerHTML={{
                __html: currentProduct.description,
              }}
            ></Description>
          </ProductDetails>
        </ProductDescriptionStyled>
      );
    } else {
      //TO-DO: Better Product Not Found Dialog
      return (
        <ProductDescriptionStyled className="container">
          <div>Product Not Found</div>
        </ProductDescriptionStyled>
      );
    }
  }
}

export default withRouter(ProductDescription);
