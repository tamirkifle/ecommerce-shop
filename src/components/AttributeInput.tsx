import styled from "@emotion/styled";
import { Component } from "react";

const AttributeInputStyled = styled.div`
  .section-title {
    font-family: var(--ff-roboto-c, "sans-serif");
    font-weight: 700;
    text-transform: uppercase;
  }
`;
const Chooser = styled.div`
  display: flex;
  --flow-spacer: 0.75rem;
  margin-top: 0.5rem;
`;
const AttributeItem = styled.button`
  --flow-spacer: 0.75rem;
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

interface AttributeInputProps {
  attribute: {
    id: string;
    name: string;
    type: string;
    items: {
      id: string;
      displayValue: string;
      value: string;
    }[];
  };
}

interface AttributeInputState {
  selectedAttributes: object;
}

class AttributeInput extends Component<
  AttributeInputProps,
  AttributeInputState
> {
  state: AttributeInputState = {
    selectedAttributes: {},
  };
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
    const { attribute } = this.props;
    return (
      <AttributeInputStyled className="flow-content">
        <h4 className="section-title">{attribute.name}:</h4>
        <Chooser className="flow-x-content section-main">
          {attribute.items.map((item) => (
            <AttributeItem
              key={item.id}
              onClick={() => this.selectAttribute(attribute, item)}
              className={`${
                (this.state.selectedAttributes as any)[attribute.name] ===
                item.value
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
        </Chooser>
      </AttributeInputStyled>
    );
  }
}

export default AttributeInput;
