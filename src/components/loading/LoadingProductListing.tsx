import styled from "@emotion/styled";
import { Component } from "react";
import Loading from ".";

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 6rem;
`;

export default class LoadingProductListing extends Component {
  render() {
    return (
      <>
        <Loading widths={["10%"]} singleHeight="47px" spacer="80px" />
        <ProductGrid>
          {Array.from(Array(6), (_, i) => (
            <Loading
              key={i}
              width="386px"
              widths={["386px"]}
              heights={["475px"]}
              noAnimation
            />
          ))}
        </ProductGrid>
      </>
    );
  }
}
