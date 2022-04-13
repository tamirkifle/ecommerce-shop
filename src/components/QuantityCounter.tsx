import styled from "@emotion/styled";
import { Component } from "react";

interface QuantityCounterProps {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

interface QuantityCounterState {}
const QuantityCounterStyled = styled.div`
  text-align: center;
`;
const QuanitityButton = styled.button`
  font-size: 1.5rem;
  font-weight: 500;
`;
class QuantityCounter extends Component<
  QuantityCounterProps,
  QuantityCounterState
> {
  render() {
    return (
      <QuantityCounterStyled className="flow-content">
        <QuanitityButton
          className="btn"
          onClick={() => {
            console.log("onClick called");
            this.props.increaseQuantity();
          }}
        >
          +
        </QuanitityButton>
        <div>{this.props.quantity}</div>
        <QuanitityButton
          className="btn"
          onClick={() => this.props.decreaseQuantity()}
        >
          -
        </QuanitityButton>
      </QuantityCounterStyled>
    );
  }
}

export default QuantityCounter;
