import { Component } from "react";
import parseHtml from "../../utils/parseHtml";
import { ModalBaseStyled } from "../commonStyles";

interface ConfirmationModalProps {
  confirmationMessage?: string | React.ReactNode;
  onYes: () => void;
  onNo: () => void;
  yesButtonText?: string;
  cancelButtonText?: string;
}

interface ConfirmationModalState {}

class ConfirmationModal extends Component<
  ConfirmationModalProps,
  ConfirmationModalState
> {
  state: ConfirmationModalState = { choice: null };

  render() {
    return (
      <ModalBaseStyled className="split-column justify-center">
        <div>
          {!this.props.confirmationMessage ? (
            <p>Are you sure?</p>
          ) : typeof this.props.confirmationMessage === "string" ? (
            parseHtml(this.props.confirmationMessage)
          ) : (
            this.props.confirmationMessage
          )}
        </div>
        <div className="action-buttons split flex-end align-end">
          <button className="btn danger" onClick={this.props.onYes}>
            {this.props.yesButtonText || "Yes"}
          </button>
          <button className="btn" onClick={this.props.onNo}>
            {this.props.cancelButtonText || "Cancel"}
          </button>
        </div>
      </ModalBaseStyled>
    );
  }
}

export default ConfirmationModal;
