import styled from "@emotion/styled";
import { Component } from "react";
import { Attribute, AttributeItem, SelectedAttribute } from "../types";

export const AttributeInputStyled = styled.div`
  .section-title {
    font-family: var(--ff-roboto-c, "sans-serif");
    font-weight: 700;
    text-transform: uppercase;
  }
`;
const Chooser = styled.div`
  --flex-spacer: 0.75rem;
`;
const AttributeItemStyled = styled.button`
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
  attribute: Attribute;
  selectedAttribute: SelectedAttribute | undefined;
  setSelectedAttributes: (selectedAttribute: SelectedAttribute) => void;
}

interface AttributeInputState {}

export class AttributeInput extends Component<
  AttributeInputProps,
  AttributeInputState
> {
  selectAttribute = (attributeItem: AttributeItem) => {
    //TODO: Attribute and Item Type Definition
    const selectedAttribute: SelectedAttribute = {
      id: this.props.attribute.id,
      name: this.props.attribute.name,
      type: this.props.attribute.type,
      item: attributeItem,
    };
    this.props.setSelectedAttributes(selectedAttribute);
  };

  render() {
    const { attribute } = this.props;
    return (
      <AttributeInputStyled className="flow-content">
        <h4 className="section-title">{attribute.name}:</h4>
        <Chooser className="split">
          {attribute.items.map((item) => (
            <AttributeOption
              key={item.id}
              attribute={attribute}
              attributeItem={item}
              selectAttribute={this.selectAttribute}
              isSelected={this.props.selectedAttribute?.item.id === item.id}
            />
          ))}
        </Chooser>
      </AttributeInputStyled>
    );
  }
}

interface AttributeOptionProps {
  attribute: Attribute | SelectedAttribute;
  attributeItem: AttributeItem;
  selectAttribute?: (attributeItem: AttributeItem) => void; //Not passed in cart to create a display-only, non-interactable attribute option
  isSelected: boolean;
}
export class AttributeOption extends Component<AttributeOptionProps> {
  render() {
    return (
      <AttributeItemStyled
        onClick={() => {
          this.props.selectAttribute?.(this.props.attributeItem);
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
  selectedAttribute: SelectedAttribute;
}
export class AttributeViewer extends Component<AttributeViewerProps> {
  render() {
    return (
      <AttributeInputStyled className="flow-content">
        <h4 className="section-title">{this.props.selectedAttribute.name}:</h4>
        <AttributeOption
          key={this.props.selectedAttribute.id}
          attribute={this.props.selectedAttribute}
          attributeItem={this.props.selectedAttribute.item}
          isSelected={true}
        />
      </AttributeInputStyled>
    );
  }
}
