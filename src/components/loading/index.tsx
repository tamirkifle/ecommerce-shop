import { Component } from "react";
import styled from "@emotion/styled";

type PlaceholderProps = {
  width?: string;
  spacer?: string;
  maxWidth?: string;
  singleHeight?: string;
};
const Placeholder = styled.div<PlaceholderProps>`
  & > * {
    margin-bottom: ${(p) => p.spacer || "10px"};
  }
  padding: 5px;
  width: ${(p) => p.width || "100%"};
  max-width: ${(p) => p.maxWidth || "auto"};
  overflow: hidden;
`;
type AnimatedBgProps = {
  width?: string;
  singleHeight?: string;
  noAnimation?: boolean;
};
const AnimatedBg = styled.div<AnimatedBgProps>`
  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
  animation-duration: ${(p) => (p.noAnimation ? "0s !important" : "1.25s")};
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: ${(p) =>
    p.noAnimation
      ? "#f0f0f0"
      : "linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%)"};
  /* background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%); */
  background-size: 800px 104px;
  height: ${(p) => p.singleHeight || "0.7rem"};
  width: ${(p) => p.width || "100%"};

  position: relative;
`;

interface LoadingProps {
  widths?: (string | undefined)[];
  heights?: (string | undefined)[];
  width?: string;
  spacer?: string;
  maxWidth?: string;
  singleHeight?: string;
  noAnimation?: boolean;
}

export default class Loading extends Component<LoadingProps> {
  render() {
    return (
      <Placeholder
        width={this.props.width}
        spacer={this.props.spacer}
        maxWidth={this.props.maxWidth}
      >
        {this.props.widths ? (
          this.props.widths.map((width, index) => (
            <AnimatedBg
              key={String(width) + index}
              width={width}
              singleHeight={
                this.props.singleHeight || this.props.heights?.[index]
              }
              noAnimation={this.props.noAnimation}
            />
          ))
        ) : (
          <>
            <AnimatedBg
              singleHeight={this.props.singleHeight}
              noAnimation={this.props.noAnimation}
            />
            <AnimatedBg
              width="95%"
              singleHeight={this.props.singleHeight}
              noAnimation={this.props.noAnimation}
            />
            <AnimatedBg
              width="90%"
              singleHeight={this.props.singleHeight}
              noAnimation={this.props.noAnimation}
            />
          </>
        )}
      </Placeholder>
    );
  }
}
