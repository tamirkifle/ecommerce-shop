import styled from "@emotion/styled";
import { Component } from "react";
import { Attribute, AttributeItem, SelectedAttribute } from "../types";

const AttributeInputStyled = styled.div`
  --flow-spacer: 0.5rem;
`;
const AttributeTitle = styled.h4`
  font-family: var(--ff-roboto-c, "sans-serif");
  font-weight: 700;
  text-transform: uppercase;
`;
const MiniAttributeTitle = styled.h4`
  font-family: var(--ff-roboto-c, "sans-serif");
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
`;

const Chooser = styled.div`
  --flex-spacer: 0.75rem;
`;
const AttributeItemStyled = styled.button`
  min-width: 63px;
  min-height: 45px;
  padding: 0.7rem 1rem;
  border: 1px solid var(--dark, black);
  font-family: var(--ff-source-s, "sans-serif");
  font-weight: 400;
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
        <AttributeTitle>{attribute.name}:</AttributeTitle>
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
  style?: React.CSSProperties;
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
            ? {
                ...this.props.style,
                backgroundColor: this.props.attributeItem.value,
              }
            : this.props.style
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
        <AttributeTitle>{this.props.selectedAttribute.name}:</AttributeTitle>
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
interface MiniAttributeViewerProps {
  selectedAttribute: SelectedAttribute;
}
export class MiniAttributeViewer extends Component<MiniAttributeViewerProps> {
  render() {
    return (
      <AttributeInputStyled className="flow-content">
        <MiniAttributeTitle>
          {this.props.selectedAttribute.name}:
        </MiniAttributeTitle>
        <AttributeOption
          key={this.props.selectedAttribute.id}
          attribute={this.props.selectedAttribute}
          attributeItem={this.props.selectedAttribute.item}
          isSelected={true}
          style={{
            backgroundColor: "#e9e9e9",
            color: "#A6A6A6",
            borderColor: "#A6A6A6",
            minWidth: "24px",
            minHeight: "24px",
            padding: "3px 6px",
            fontSize: "14px",
          }}
        />
      </AttributeInputStyled>
    );
  }
}

export class MiniAttributeInput extends Component<
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
        <MiniAttributeTitle>{this.props.attribute.name}:</MiniAttributeTitle>
        <Chooser className="split">
          {attribute.items.map((item) => (
            <AttributeOption
              key={item.id}
              attribute={attribute}
              attributeItem={item}
              selectAttribute={this.selectAttribute}
              isSelected={this.props.selectedAttribute?.item.id === item.id}
              style={{
                minWidth: "24px",
                minHeight: "24px",
                padding: "3px 6px",
                fontSize: "14px",
              }}
            />
          ))}
        </Chooser>
      </AttributeInputStyled>
    );
  }
}
