import styled from "@emotion/styled";
import { Component } from "react";
import { withStore, WithStoreProps } from "../graphql/withStore";
import { Price, PriceViewerTypes } from "../types";
import currencyFormatter from "../utils/currencyFormatter";
import getPrice from "../utils/getPrice";

interface StyleProps {
  type: PriceViewerTypes;
}
const PriceStyled = styled.div<StyleProps>`
  font-size: ${(props) => {
    switch (props.type) {
      case "card":
        return "18px";
      case "pdp":
        return "24px";
      case "minicart":
      case "minicartTotal":
        return "16px";
      case "cart":
        return "20px";
      case "cartTotal":
        return "24px";
    }
  }};
  font-weight: ${(props) => {
    switch (props.type) {
      case "card":
      case "minicart":
      case "minicartTotal":
        return "500";
      case "pdp":
      case "cart":
      case "cartTotal":
        return "700";
    }
  }};
`;
interface PriceViewerOwnProps {
  type: PriceViewerTypes;
  priceData: Price[] | number;
  quantity?: number;
}

interface PriceViewerState {}

type PriceViewerProps = PriceViewerOwnProps & WithStoreProps;
class PriceViewer extends Component<PriceViewerProps, PriceViewerState> {
  render() {
    const { pageCurrency } = this.props.storeVar;
    return this.props.type === "cartTotal" ||
      this.props.type === "minicartTotal" ? (
      <PriceStyled type={this.props.type}>
        {typeof this.props.priceData === "number"
          ? currencyFormatter(
              getPrice(this.props.priceData, pageCurrency, this.props.quantity),
              pageCurrency
            )
          : currencyFormatter(
              getPrice(this.props.priceData, pageCurrency, this.props.quantity),
              pageCurrency
            )}
      </PriceStyled>
    ) : (
      <PriceStyled type={this.props.type}>
        {typeof this.props.priceData === "number"
          ? currencyFormatter(
              getPrice(this.props.priceData, pageCurrency),
              pageCurrency
            )
          : currencyFormatter(
              getPrice(this.props.priceData, pageCurrency),
              pageCurrency
            )}
      </PriceStyled>
    );
  }
}

export default withStore(PriceViewer);
