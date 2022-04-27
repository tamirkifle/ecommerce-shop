import styled from "@emotion/styled";
import { Component } from "react";

interface TypeProps {
  mini?: boolean;
}
const QuantityCounterStyled = styled.div`
  text-align: center;
`;
const QuanitityButton = styled.button<TypeProps>`
  font-size: 1rem;
  padding: ${(p) => p.mini && "0"};
  font-weight: 500;
  min-width: ${(p) => (p.mini ? "24px" : "45px")};
  min-height: ${(p) => (p.mini ? "24px" : "45px")};
`;

interface QuantityCounterProps {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  mini?: boolean;
}

interface QuantityCounterState {}

class QuantityCounter extends Component<
  QuantityCounterProps,
  QuantityCounterState
> {
  render() {
    return (
      <QuantityCounterStyled className="split-column space-between">
        <QuanitityButton
          className="btn"
          onClick={() => {
            this.props.increaseQuantity();
          }}
          mini={this.props.mini}
        >
          ＋
        </QuanitityButton>
        <div>{this.props.quantity}</div>
        <QuanitityButton
          className="btn"
          onClick={() => this.props.decreaseQuantity()}
          mini={this.props.mini}
        >
          －
        </QuanitityButton>
      </QuantityCounterStyled>
    );
  }
}

export default QuantityCounter;
