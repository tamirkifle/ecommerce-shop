import styled from "@emotion/styled";
import { Component } from "react";
import ReactDOM from "react-dom";
import { withStore, WithStoreProps } from "../graphql/withStore";
import { closeModal } from "../store/actions";
import Overlay from "./Overlay";

interface ModalStyledProps {
  zIndex?: string;
  bgColor?: string;
}
const ModalStyled = styled.div<ModalStyledProps>`
  position: fixed;
  top: 0;
  z-index: ${(p) => p.zIndex || "3"};
  display: flex;
  & > * {
    flex-grow: 1;
  }
  min-width: 500px;
  min-height: 200px;
  left: 50%;
  top: 50%;
  margin-left: calc(-1 * min(calc(500px / 2), calc(60vw / 2)));
  margin-top: calc(-1 * min(calc(600px / 2), calc(70vh / 2)));
  background-color: ${(p) => (p.bgColor ? p.bgColor : "white")};
`;

interface ModalOwnProps {
  bgColor?: string;
  zIndex?: string;
  onClose?: () => void;
}
type ModalProps = ModalOwnProps & WithStoreProps;
interface ModalState {}
class Modal extends Component<ModalProps, ModalState> {
  render() {
    const { showModal, ModalChildren } = this.props.storeVar;
    return (
      showModal &&
      ReactDOM.createPortal(
        <>
          <ModalStyled bgColor={this.props.bgColor} zIndex={this.props.zIndex}>
            {ModalChildren}
          </ModalStyled>
          <Overlay
            onClick={closeModal}
            bgColor={"rgba(0,0,0,0.5)"}
            zIndex="2"
          />
        </>,
        document.getElementById("modal") as HTMLElement
      )
    );
  }
}

export default withStore(Modal);
