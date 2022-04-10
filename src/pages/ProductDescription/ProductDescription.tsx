import styled from "@emotion/styled";
import { Component } from "react";
import ImageViewer from "../../components/ImageViewer";
import { products } from "../../mockData";
import { withRouter, WithRouterProps } from "../../utils/withRouter";
import { Product } from "../../types/Product";

const ProductDescriptionStyled = styled.div`
  display: flex;
  & > * + * {
    margin-left: 6.25rem;
  }
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
const Attribute = styled.section``;
const AttributeChooser = styled.div`
  display: flex;
  & > * + * {
    margin-left: 0.75rem;
  }
`;
const AttributeItem = styled.button`
  width: 63px;
  height: 45px;
  border: 1px solid var(--dark, black);
  font-family: var(--ff-source-s, "sans-serif");
  position: relative;
  &.selected {
    background-color: var(--dark, black);
    color: white;
    transform: scale(1.1);
  }
  &.swatch.selected::after {
    content: "✓";
    opacity: 50%;
    background-color: black;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    line-height: 45px;
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

  selectAttribute = (attribute: { name: string }, item: { value: string }) => {
    console.log(this.state.selectedAttributes);
    //TODO: Attribute and Item Type Definition
    this.setState((oldState) => {
      const newAttributes = {};
      (newAttributes as any)[attribute.name] = item.value;
      return {
        selectedAttributes: {
          ...oldState.selectedAttributes,
          ...newAttributes,
        },
      };
    });
  };
  render() {
    if (this.state.currentProduct) {
      const { currentProduct } = this.state;
      return (
        <ProductDescriptionStyled>
          <ImageViewer images={currentProduct.gallery} />
          <ProductDetails>
            <ProductTitle>
              <h2 className="product-brand">{currentProduct.brand}</h2>
              <h2 className="product-name">{currentProduct.name}</h2>
            </ProductTitle>
            {currentProduct.attributes.map((attribute) => (
              <Attribute key={attribute.id}>
                <h4 className="section-title">{attribute.name}:</h4>
                <AttributeChooser className="section-main">
                  {attribute.items.map((item) => (
                    <AttributeItem
                      key={item.id}
                      onClick={() => this.selectAttribute(attribute, item)}
                      className={`${
                        (this.state.selectedAttributes as any)[
                          attribute.name
                        ] === item.value
                          ? "selected"
                          : ""
                      } ${attribute.type === "swatch" ? "swatch" : ""}`}
                      title={item.displayValue}
                      style={
                        attribute.type === "swatch"
                          ? { backgroundColor: item.value }
                          : {}
                      }
                    >
                      {attribute.type !== "swatch" && item.value}
                    </AttributeItem>
                  ))}
                </AttributeChooser>
              </Attribute>
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
