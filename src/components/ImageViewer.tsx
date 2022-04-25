import styled from "@emotion/styled";
import { Component, createRef } from "react";

const ViewerContainer = styled.div`
  --max-viewer-wh: 600px;
  --min-viewer-wh: 400px;
  --preview-wh: 80px;
  --previewMargin: 0.5rem;
  & > * {
    --flex-spacer: 2.5rem;
  }
  max-height: var(--max-viewer-wh);
  min-height: var(--min-viewer-wh);
  height: calc(100vh - 200px);
`;

const PreviewBox = styled.div`
  & > * {
    --flex-spacer: 0.5rem;
  }
  width: var(--preview-wh);
`;

const ScrollButton = styled.button`
  border: 1px solid #ccc;
  svg {
    stroke: #3665f3;
  }
  width: 100%;
  padding: 1rem 0;
  &:disabled {
    svg {
      stroke: #ccc;
    }
  }
`;

const PreviewImages = styled.div`
  & > * {
    --flex-spacer: var(--previewMargin);
  }
  overflow-y: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  width: var(--previewwh);

  img {
    width: 100%;
    min-height: var(--preview-wh);
    object-fit: contain;
    position: relative;
    cursor: pointer;
  }
  img.selected {
    border: 2px solid rgb(6, 84, 186);
  }
`;

const CurrentImageWindow = styled.div`
  max-width: var(--max-viewer-wh);
  max-height: var(--max-viewer-wh);
  min-width: var(--min-viewer-wh);
  min-height: var(--min-viewer-wh);
  width: calc(100vh - 200px);
  height: calc(100vh - 200px);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
interface ImageViewerProps {
  images: string[];
}

interface ImageViewerState {
  selectedIndex: number;
  showScrollButtons: boolean;
}
//TODO: No Image
class ImageViewer extends Component<ImageViewerProps, ImageViewerState> {
  state: ImageViewerState = { selectedIndex: 0, showScrollButtons: false };
  previewImagesRef: React.RefObject<HTMLDivElement> = createRef();
  previewBoxRef: React.RefObject<HTMLDivElement> = createRef();
  topButtonRef: React.RefObject<HTMLButtonElement> = createRef();
  bottomButtonRef: React.RefObject<HTMLButtonElement> = createRef();

  updateShowScrollButtons = () => {
    const previewsScrollHeight = this.previewImagesRef.current?.scrollHeight;
    const previewBoxHeight = this.previewBoxRef.current?.clientHeight;
    if (previewsScrollHeight && previewBoxHeight) {
      const newShowScrollButtons = Boolean(
        previewsScrollHeight > previewBoxHeight
      );
      if (newShowScrollButtons !== this.state.showScrollButtons) {
        this.setState((oldState) => ({
          ...oldState,
          showScrollButtons: newShowScrollButtons,
        }));
      }
    }
  };

  updateButtonsDisable = () => {
    if (
      this.topButtonRef.current &&
      this.bottomButtonRef.current &&
      this.topButtonRef.current &&
      this.previewImagesRef.current
    ) {
      this.topButtonRef.current.disabled =
        this.previewImagesRef.current.scrollTop === 0;
      this.bottomButtonRef.current.disabled =
        this.previewImagesRef.current.scrollTop +
          this.previewImagesRef.current.clientHeight ===
        this.previewImagesRef.current.scrollHeight;
    }
  };
  componentDidMount() {
    this.updateShowScrollButtons();
    // this.updateButtonsDisable();
    window.addEventListener("resize", this.updateShowScrollButtons, false);
  }

  componentDidUpdate(prevProps: ImageViewerProps, prevState: ImageViewerState) {
    if (!prevState.showScrollButtons && this.state.showScrollButtons) {
      this.updateButtonsDisable();
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateShowScrollButtons, false);
  }

  render() {
    return (
      <ViewerContainer className="split">
        <PreviewBox
          ref={this.previewBoxRef}
          className="split-column space-between"
        >
          {this.state.showScrollButtons && (
            <ScrollButton
              onClick={() =>
                this.previewImagesRef.current?.scrollBy({
                  top: -240,
                  behavior: "smooth",
                })
              }
              ref={this.topButtonRef}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="m12 6.586-8.707 8.707 1.414 1.414L12 9.414l7.293 7.293 1.414-1.414L12 6.586z" />
              </svg>
            </ScrollButton>
          )}
          <PreviewImages
            ref={this.previewImagesRef}
            onScroll={this.updateButtonsDisable}
            className="split-column"
          >
            {this.props.images.map((imgUrl, index) => (
              <img
                src={imgUrl}
                alt="Product"
                key={imgUrl}
                onClick={() => this.setState({ selectedIndex: index })}
                className={this.state.selectedIndex === index ? "selected" : ""}
              />
            ))}
          </PreviewImages>
          {this.state.showScrollButtons && (
            <ScrollButton
              onClick={() =>
                this.previewImagesRef.current &&
                this.previewImagesRef.current.scrollBy({
                  top: 240,
                  behavior: "smooth",
                })
              }
              ref={this.bottomButtonRef}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
              </svg>
            </ScrollButton>
          )}
        </PreviewBox>
        <CurrentImageWindow>
          <img
            src={this.props.images[this.state.selectedIndex]}
            alt="Product"
          />
        </CurrentImageWindow>
      </ViewerContainer>
    );
  }
}

export default ImageViewer;
