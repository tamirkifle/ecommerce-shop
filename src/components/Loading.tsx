import { Component } from "react";
import styled from "@emotion/styled";

type PlaceholderProps = {
  width?: string;
  spacer?: string;
  "max-width"?: string;
};
const Placeholder = styled.div<PlaceholderProps>`
  --flex-spacer: ${(p) => p.spacer || "10px"};
  padding: 5px;
  width: ${(p) => p.width || "100%"};
  max-width: ${(p) => p["max-width"] || "auto"};
  overflow: hidden;
`;
type AnimatedBgProps = { width?: string };
const AnimatedBg = styled.div<AnimatedBgProps>`
  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: 0.7rem;
  width: ${(p) => p.width || "100%"};

  position: relative;
`;

interface LoadingProps {
  widths?: (string | undefined)[];
  width?: string;
  spacer?: string;
  "max-width"?: string;
}

export default class Loading extends Component<LoadingProps> {
  render() {
    return (
      <Placeholder
        width={this.props.width}
        spacer={this.props.spacer}
        className="split-column justify-center"
        max-width={this.props["max-width"]}
      >
        {this.props.widths ? (
          this.props.widths.map((width) => <AnimatedBg width={width} />)
        ) : (
          <>
            <AnimatedBg />
            <AnimatedBg width="95%" />
            <AnimatedBg width="90%" />
          </>
        )}
      </Placeholder>
    );
  }
}
