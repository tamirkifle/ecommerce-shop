import styled from "@emotion/styled";
import { Component } from "react";
import { Attribute, AttributeItem, SelectedAttribute } from "../types";

const AttributeInputStyled = styled.div`
  & > * {
    --flow-spacer: 0.5rem;
  }
`;

interface TypeProps {
  mini?: boolean;
  viewer?: boolean;
  swatch?: string | false;
}
const AttributeTitle = styled.p<TypeProps>`
  font-family: ${(p) => !p.mini && "var(--ff-roboto-c, 'sans-serif')"};
  font-weight: ${(p) => (p.mini ? "400" : "700")};
  font-size: ${(p) => (p.mini ? "14px" : "1rem")};
  text-transform: ${(p) => !p.mini && "uppercase"}; ;
`;

const AttributeGroup = styled.div<TypeProps>`
  & > * {
    --flex-spacer: ${(p) => (p.mini ? "0.625rem" : "0.75rem")};
  }
`;

const AttributeItemStyled = styled.button<TypeProps>`
  min-width: ${(p) => (p.swatch ? "32px" : p.mini ? "24px" : "63px")};
  min-height: ${(p) => (p.swatch ? "32px" : p.mini ? "24px" : "45px")};
  padding: ${(p) => (p.swatch ? 0 : "3px 6px")};
  font-size: ${(p) => p.mini && "14px"};
  background: ${(p) =>
    p.swatch
      ? `${p.swatch} content-box`
      : p.viewer && p.mini
      ? "#e9e9e9"
      : "transparent"};
  color: ${(p) => (p.viewer && p.mini ? "#8c8c8c" : "var(--dark, black)")};
  border: 1px solid
    ${(p) =>
      p.swatch
        ? "transparent"
        : p.viewer && p.mini
        ? "#A6A6A6"
        : "var(--dark, black)"};
  font-family: var(--ff-source-s, "sans-serif");
  font-weight: 400;
  position: relative;
  cursor: default;
  &.clickable {
    cursor: pointer;
  }
  &.selected {
    padding: ${(p) => p.swatch && "2px"};
    background-color: ${(p) => !p.swatch && "var(--dark, black)"};
    color: white;
    border: ${(p) =>
      p.swatch ? "1px solid #5ece7b" : "1px solid var(--dark, black)"};
    transform: ${(p) => (p.swatch ? "scale(1.1)" : "scale(1)")};
  }
  /* &.swatch.selected::after {
    display: ${(p) => (p.viewer ? "none" : "flex")};
    justify-content: center;
    align-items: center;
    content: "✓";
    opacity: 80%;
    color: white;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  } */
`;

interface AttributeInputProps {
  attribute: Attribute;
  selectedAttribute: SelectedAttribute | undefined;
  setSelectedAttributes: (selectedAttribute: SelectedAttribute) => void;
  mini?: boolean;
}

interface AttributeInputState {}

export class AttributeInput extends Component<
  AttributeInputProps,
  AttributeInputState
> {
  selectAttribute = (attributeItem: AttributeItem) => {
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
        <AttributeTitle mini={this.props.mini}>
          {attribute.name}:
        </AttributeTitle>
        <AttributeGroup className="split" mini={this.props.mini}>
          {attribute.items.map((item) => (
            <AttributeOption
              key={item.id}
              attribute={attribute}
              attributeItem={item}
              selectAttribute={this.selectAttribute}
              isSelected={this.props.selectedAttribute?.item.id === item.id}
              mini={this.props.mini}
            />
          ))}
        </AttributeGroup>
      </AttributeInputStyled>
    );
  }
}

interface AttributeOptionProps {
  attribute: Attribute | SelectedAttribute;
  attributeItem: AttributeItem;
  selectAttribute?: (attributeItem: AttributeItem) => void; //Not passed in cart to create a display-only, non-interactable attribute option
  isSelected: boolean;
  mini?: boolean;
  viewer?: boolean;
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
        mini={this.props.mini}
        viewer={this.props.viewer}
        swatch={
          this.props.attribute.type === "swatch" &&
          this.props.attributeItem.value
        }
      >
        {this.props.attribute.type !== "swatch" &&
          this.props.attributeItem.value}
      </AttributeItemStyled>
    );
  }
}

interface AttributeViewerProps {
  attribute: Attribute;
  selectedAttribute: SelectedAttribute | undefined;
  mini?: boolean;
}
export class AttributeViewer extends Component<AttributeViewerProps> {
  render() {
    return (
      <AttributeInputStyled className="flow-content">
        <AttributeTitle mini={this.props.mini}>
          {this.props.attribute.name}:
        </AttributeTitle>
        <AttributeGroup className="split" mini={this.props.mini}>
          {this.props.attribute.items.map((item) => (
            <AttributeOption
              key={item.id}
              attribute={this.props.attribute}
              attributeItem={item}
              isSelected={this.props.selectedAttribute?.item.id === item.id}
              mini={this.props.mini}
              viewer
            />
          ))}
        </AttributeGroup>
      </AttributeInputStyled>
    );
  }
}
