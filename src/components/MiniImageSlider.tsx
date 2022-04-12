import styled from "@emotion/styled";
import { Component } from "react";

const ViewerContainerStyled = styled.div`
  width: 141px;
  height: 184px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
type SliderButtonProps = { direction: "left" | "right" };
const SliderButton = styled.button<SliderButtonProps>`
  position: absolute;
  padding: 0.8rem 0;
  left: ${(p) => (p.direction === "left" ? "0%" : "auto")};
  right: ${(p) => (p.direction === "right" ? "0%" : "auto")};
  top: 50%;
  transform: translate(0, -50%);
  svg {
    fill: white;
  }
  background-color: rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

interface MiniImageSliderProps {
  gallery: string[];
}

interface MiniImageSliderState {
  selectedIndex: number;
}

class MiniImageSlider extends Component<
  MiniImageSliderProps,
  MiniImageSliderState
> {
  state: MiniImageSliderState = { selectedIndex: 0 };

  render() {
    return (
      <ViewerContainerStyled>
        {this.props.gallery.length > 1 && (
          <SliderButton
            direction="left"
            onClick={() =>
              this.setState((oldState) => {
                let newIndex = oldState.selectedIndex - 1;
                if (newIndex < 0) newIndex += this.props.gallery.length;
                return { selectedIndex: newIndex };
              })
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" />
            </svg>
          </SliderButton>
        )}
        <img src={this.props.gallery[this.state.selectedIndex]} alt="Product" />
        {this.props.gallery.length > 1 && (
          <SliderButton
            direction="right"
            onClick={() =>
              this.setState((oldState) => {
                let newIndex = oldState.selectedIndex + 1;
                if (newIndex >= this.props.gallery.length) newIndex = 0;
                return { selectedIndex: newIndex };
              })
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
            </svg>
          </SliderButton>
        )}
      </ViewerContainerStyled>
    );
  }
}

export default MiniImageSlider;
