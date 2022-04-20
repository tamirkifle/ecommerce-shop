import styled from "@emotion/styled";
import { Component } from "react";
import ReactDOM from "react-dom";

interface OverlayStyledProps {
  opacity?: string;
  bgColor?: string;
}
const OverlayStyled = styled.div<OverlayStyledProps>`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: ${(p) => (p.bgColor ? p.bgColor : "transparent")};
  opacity: ${(p) => (p.opacity ? p.opacity : "100%")};
`;

interface OverlayProps {
  opacity?: string;
  bgColor?: string;
  onClick: () => void;
}

interface OverlayState {}
export default class Overlay extends Component<OverlayProps, OverlayState> {
  render() {
    return ReactDOM.createPortal(
      <OverlayStyled
        opacity={this.props.opacity}
        bgColor={this.props.bgColor}
        onClick={this.props.onClick}
      />,
      document.getElementById("overlay") as HTMLElement
    );
  }
}
