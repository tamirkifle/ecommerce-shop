import styled from "@emotion/styled";
import { Component } from "react";
import ReactDOM from "react-dom";

interface OverlayStyledProps {
  zIndex?: string;
  bgColor?: string;
}
const OverlayStyled = styled.div<OverlayStyledProps>`
  position: fixed;
  top: 0;
  z-index: ${(p) => p.zIndex || "1"};
  min-width: 100vw;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  background-color: ${(p) => (p.bgColor ? p.bgColor : "transparent")};
`;

interface OverlayProps {
  bgColor?: string;
  zIndex?: string;
  onClick?: () => void;
}

interface OverlayState {}
export default class Overlay extends Component<OverlayProps, OverlayState> {
  render() {
    return ReactDOM.createPortal(
      <OverlayStyled
        bgColor={this.props.bgColor}
        zIndex={this.props.zIndex}
        onClick={this.props.onClick}
      />,
      document.getElementById("overlay") as HTMLElement
    );
  }
}
