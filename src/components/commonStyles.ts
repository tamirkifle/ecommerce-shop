import styled from "@emotion/styled";
import { CartViewerTypes, ProductViewerTypes } from "../types";

export const ModalBaseStyled = styled.div`
  padding: 1rem;
  & > * {
    flex-basis: 100%;
  }
  & > .action-buttons {
    flex-basis: 10%;
  }
`;

export const PageTitle = styled.h2`
  text-transform: capitalize;
  margin-bottom: 5rem;
  font-weight: 400;
  font-size: 2.5rem;
`;

interface StyleProps {
  type?: CartViewerTypes | ProductViewerTypes;
}
export const ProductTitle = styled.header<StyleProps>`
  --flow-spacer: ${(p) =>
    p.type === "cart" || p.type === "pdp" ? "0.8rem" : "0.5rem"};
  span {
    display: block;
    font-size: ${(p) =>
      p.type === "cart" ? "1.13rem" : p.type === "pdp" ? "1.5rem" : "inherit"};
  }

  span:first-of-type {
    font-weight: ${(p) =>
      p.type === "cart" || p.type === "pdp" ? "600" : "300"};
  }
  span:last-of-type {
    font-weight: ${(p) =>
      p.type === "cart" || p.type === "pdp" ? "400" : "300"};
  }
`;
