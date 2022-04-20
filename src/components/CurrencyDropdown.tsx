import styled from "@emotion/styled";
import { Component, createRef } from "react";
import Dropdown from "./Dropdown";
import { withStore, WithStoreProps } from "../graphql/withStore";
import {
  changeCurrency,
  closeDropdowns,
  toggleCurrencySwitcher,
} from "../store/actions";
import { Currency } from "../types";

const CurrencyDropdownStyled = styled.div`
  position: relative;
  z-index: 3;
  .action-button {
    padding: 1rem;
    font-size: 1.25rem;
    line-height: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .action-button::after {
    content: "\u2304";
    margin-left: 10px;
    margin-bottom: 5px;
  }
`;

const CurrencyButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  &:hover {
    background-color: #f6f6f6;
    opacity: 1;
  }

  &:active {
    background-color: #e8e8e8;
    opacity: 1;
  }
`;

interface CurrencyDropdownOwnProps {
  currencies: Currency[] | null;
}

type CurrencyDropdownProps = CurrencyDropdownOwnProps & WithStoreProps;
interface CurrencyDropdownState {}
class CurrencyDropdown extends Component<
  CurrencyDropdownProps,
  CurrencyDropdownState
> {
  state = {
    isCurrencySwitcherOpen: false,
  };
  currencyBtn = createRef<HTMLButtonElement>();

  render() {
    const { pageCurrency, isCurrencySwitcherOpen } = this.props.storeVar;

    return (
      <CurrencyDropdownStyled>
        <button
          className="action-button"
          title={pageCurrency.label}
          onClick={toggleCurrencySwitcher}
        >
          {pageCurrency.symbol}
        </button>
        <Dropdown
          isOpen={isCurrencySwitcherOpen}
          onClose={closeDropdowns}
          top={"calc(100% - 15px)"}
        >
          {this.props.currencies?.map((currency) => (
            <CurrencyButton
              key={currency.label}
              onClick={() => {
                changeCurrency(currency);
                closeDropdowns();
              }}
            >
              {currency.symbol} {currency.label}
            </CurrencyButton>
          ))}
        </Dropdown>
      </CurrencyDropdownStyled>
    );
  }
}

export default withStore(CurrencyDropdown);
