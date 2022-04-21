import { Component } from "react";
import { closeModal } from "../../store/actions";
import { ModalBaseStyled } from "../commonStyles";

interface ErrorModalProps {
  errorMessage: string;
}

interface ErrorModalState {}

class ErrorModal extends Component<ErrorModalProps, ErrorModalState> {
  render() {
    return (
      <ModalBaseStyled className="split-column justify-center">
        <div className="split align-center justify-center">
          <p>{this.props.errorMessage}</p>
        </div>
        <div className="action-buttons split flex-end align-end">
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </ModalBaseStyled>
    );
  }
}

export default ErrorModal;
