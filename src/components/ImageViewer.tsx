import styled from "@emotion/styled";
import { Component, createRef } from "react";
interface Props {
  images: string[];
}

interface State {
  selectedIndex: number;
}

const ViewerContainer = styled.div`
  --viewerwh: 37.5rem;
  --previewwh: 5rem;
  --previewMargin: 2.5rem;
  /* visibleThumbs = (viewerwh - previewMargin) / (previewwh + previewMargin) = 6.333 , so 6 images will show */
  display: flex;
  /* width: 800px; */
  max-height: var(--viewerwh);
  /* outline: 1px dashed red; */

  & > * + * {
    margin-left: 2.5rem;
  }
`;

const PreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--previewwh);
  & > * + * {
    margin-top: 0.5rem;
  }

  button {
    border: 1px solid grey;
    width: 100%;
    padding: 5px 0;
  }
  svg {
    stroke: grey;
  }
`;

const PreviewImages = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  width: var(--previewwh);

  & > * + * {
    margin-top: var(--previewMargin);
  }

  img {
    width: 100%;
    height: var(--previewwh);
    object-fit: contain;
    /* outline: 1px solid green; */
    position: relative;
    cursor: pointer;
  }
  img.selected {
    border: 2px solid rgb(6, 84, 186);
  }
`;

const CurrentImageWindow = styled.div`
  /* flex-basis: 90%; */
  /* background-color: green; */
  width: var(--viewerwh);
  height: var(--viewerwh);
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* outline: 1px dashed red; */
  }
`;

//TODO: No Image
class ImageViewer extends Component<Props, State> {
  state: State = { selectedIndex: 0 };
  previewImagesRef: React.RefObject<HTMLDivElement> = createRef();
  render() {
    const visibleImgs = 5; //(600px + 40px) / (80px + 40px) rounded down
    return (
      <ViewerContainer>
        <PreviewBox>
          {visibleImgs < this.props.images.length && (
            <button
              onClick={() =>
                this.previewImagesRef.current &&
                this.previewImagesRef.current.scrollBy({
                  top: -240,
                  behavior: "smooth",
                })
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="m12 6.586-8.707 8.707 1.414 1.414L12 9.414l7.293 7.293 1.414-1.414L12 6.586z" />
              </svg>
            </button>
          )}
          <PreviewImages
            ref={this.previewImagesRef as React.RefObject<HTMLDivElement>}
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
          {visibleImgs < this.props.images.length && (
            <button
              onClick={() =>
                this.previewImagesRef.current &&
                this.previewImagesRef.current.scrollBy({
                  top: 240,
                  behavior: "smooth",
                })
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
              </svg>
            </button>
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
