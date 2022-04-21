import styled from "@emotion/styled";
import { Component } from "react";
import Overlay from "../portals/Overlay";

interface DropdownStyledProps {
  isOpen: boolean;
  top?: string;
}
const DropdownStyled = styled.div<DropdownStyledProps>`
  position: absolute;
  top: 100%;
  z-index: 1;
  box-shadow: var(--bs);
  background-color: white;
  display: ${(p) => (p.isOpen ? "inline-block" : "none")};
  min-width: 150px;
`;
interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  overlayConfig?: { opacity?: string; bgColor?: string };
  top?: string;
  style?: React.CSSProperties;
}

interface DropdownState {}

class Dropdown extends Component<DropdownProps, DropdownState> {
  render() {
    return (
      this.props.isOpen && (
        <>
          <DropdownStyled isOpen={this.props.isOpen} style={this.props.style}>
            {this.props.children}
          </DropdownStyled>
          <Overlay onClick={this.props.onClose} {...this.props.overlayConfig} />
        </>
      )
    );
  }
}

export default Dropdown;
