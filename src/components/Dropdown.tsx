import styled from "@emotion/styled";
import { Component } from "react";
import Overlay from "../portals/Overlay";

interface DropdownStyledProps {
  isOpen: boolean;
  top?: string;
}
const DropdownStyled = styled.div<DropdownStyledProps>`
  position: absolute;
  top: ${(p) => p.top || "100%"};
  left: 0;
  z-index: 1;
  box-shadow: var(--bs);
  text-align: center;
  background-color: white;
  display: ${(p) => (p.isOpen ? "inline-block" : "none")};
  min-width: 150px;
`;
interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  overlayConfig?: { opacity: string; bgColor: string };
  top?: string;
}

interface DropdownState {}

class Dropdown extends Component<DropdownProps, DropdownState> {
  render() {
    return (
      this.props.isOpen && (
        <>
          <DropdownStyled isOpen={this.props.isOpen} top={this.props.top}>
            {this.props.children}
          </DropdownStyled>
          {
            <Overlay
              onClick={() => this.props.onClose()}
              {...this.props.overlayConfig}
            />
          }
        </>
      )
    );
  }
}

export default Dropdown;
