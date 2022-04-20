import styled from "@emotion/styled";
import { Component } from "react";

const QuantityCounterStyled = styled.div`
  text-align: center;
`;
const QuanitityButton = styled.button`
  font-size: 1.5rem;
  font-weight: 500;
`;

interface QuantityCounterProps {
  quantity: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  btnStyle?: React.CSSProperties;
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
            console.log("onClick called");
            this.props.increaseQuantity();
          }}
          style={this.props.btnStyle}
        >
          ＋
        </QuanitityButton>
        <div>{this.props.quantity}</div>
        <QuanitityButton
          className="btn"
          onClick={() => this.props.decreaseQuantity()}
          style={this.props.btnStyle}
        >
          －
        </QuanitityButton>
      </QuantityCounterStyled>
    );
  }
}

export default QuantityCounter;
