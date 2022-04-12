import styled from "@emotion/styled";
import { Component } from "react";

export const AttributeInputStyled = styled.div`
  .section-title {
    font-family: var(--ff-roboto-c, "sans-serif");
    font-weight: 700;
    text-transform: uppercase;
  }
`;
const Chooser = styled.div`
  display: flex;
`;
const AttributeItemStyled = styled.button`
  --flow-spacer: 0.75rem;
  width: 63px;
  height: 45px;
  border: 1px solid var(--dark, black);
  font-family: var(--ff-source-s, "sans-serif");
  position: relative;
  cursor: default;
  &.clickable {
    cursor: pointer;
  }
  &.selected {
    background-color: var(--dark, black);
    color: white;
  }
  &.selected.clickable {
    transform: scale(1.1);
  }
  &.swatch.clickable.selected::after {
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

  &.disabled {
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

export class AttributeInput extends Component<
  AttributeInputProps,
  AttributeInputState
> {
  state: AttributeInputState = {
    selectedAttributes: {},
  };
  selectAttribute = (attributeName: string, selectedValue: string) => {
    console.log(this.state.selectedAttributes);
    //TODO: Attribute and Item Type Definition
    this.setState((oldState) => {
      const newAttributes = {};
      (newAttributes as any)[attributeName] = selectedValue;
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
        <Chooser className="flow-x-content">
          {attribute.items.map((item) => (
            <AttributeOption
              key={item.id}
              attribute={attribute}
              attributeItem={item}
              selectAttribute={this.selectAttribute}
              isSelected={
                (this.state.selectedAttributes as any)[
                  this.props.attribute.name
                ] === item.value
              }
            />
          ))}
        </Chooser>
      </AttributeInputStyled>
    );
  }
}

interface AttributeOptionProps {
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
  attributeItem: {
    id: string;
    displayValue: string;
    value: string;
  };
  selectAttribute?: (attributeName: string, attributeItemValue: string) => void;
  isSelected: boolean;
}
export class AttributeOption extends Component<AttributeOptionProps> {
  render() {
    return (
      <AttributeItemStyled
        onClick={() => {
          this.props.selectAttribute &&
            this.props.selectAttribute(
              this.props.attribute.name,
              this.props.attributeItem.value
            );
        }}
        className={`${this.props.isSelected ? "selected" : ""} ${
          this.props.selectAttribute ? "clickable" : ""
        } ${this.props.attribute.type === "swatch" ? "swatch" : ""}`}
        title={this.props.attributeItem.displayValue}
        style={
          this.props.attribute.type === "swatch"
            ? { backgroundColor: this.props.attributeItem.value }
            : {}
        }
      >
        {this.props.attribute.type !== "swatch" &&
          this.props.attributeItem.value}
      </AttributeItemStyled>
    );
  }
}

interface AttributeViewerProps {
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
export class AttributeViewer extends Component<AttributeViewerProps> {
  render() {
    return (
      <AttributeInputStyled className="flow-content">
        <h4 className="section-title">{this.props.attribute.name}:</h4>
        <AttributeOption
          key={this.props.attribute.id}
          attribute={this.props.attribute}
          attributeItem={this.props.attribute.items[0]}
          isSelected={true}
        />
      </AttributeInputStyled>
    );
  }
}
