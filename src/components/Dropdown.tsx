import styled from "@emotion/styled";
import { Component } from "react";
import Overlay from "../portals/Overlay";

interface DropdownStyledProps {
  isOpen: boolean;
  top?: string;
  left?: string;
  right?: string;
  minWidth?: string;
}
const DropdownStyled = styled.div<DropdownStyledProps>`
  position: absolute;
  top: ${(p) => (p.top ? p.top : "100%")};
  left: ${(p) => (p.left ? p.left : !p.left && !p.right ? "0" : null)};
  right: ${(p) => p.right && p.right};
  z-index: 1;
  box-shadow: var(--bs);
  background-color: white;
  display: ${(p) => (p.isOpen ? "inline-block" : "none")};
  min-width: ${(p) => (p.minWidth ? p.minWidth : "150px")};
`;
interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  clearOverlay?: boolean;
  top?: string;
  left?: string;
  right?: string;
  minWidth?: string;
}

interface DropdownState {}

class Dropdown extends Component<DropdownProps, DropdownState> {
  render() {
    return (
      this.props.isOpen && (
        <>
          <DropdownStyled
            isOpen={this.props.isOpen}
            left={this.props.left}
            right={this.props.right}
            top={this.props.top}
            minWidth={this.props.minWidth}
          >
            {this.props.children}
          </DropdownStyled>
          <Overlay
            onClick={this.props.onClose}
            bgColor={
              !this.props.clearOverlay
                ? "rgba(57, 55, 72, 0.22)"
                : "transparent"
            }
          />
        </>
      )
    );
  }
}

export default Dropdown;
