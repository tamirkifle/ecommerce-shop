import { Component } from "react";
import Loading from ".";

export default class LoadingProductDescription extends Component {
  render() {
    return (
      <div className="flow-content split justify-stretch">
        <Loading widths={["90%"]} singleHeight={"550px"} noAnimation />
        <div>
          <Loading
            widths={["30%", "40%"]}
            heights={["28px", "28px"]}
            spacer="13px"
          />
          <Loading
            widths={["50%", "20%", "70%", "40%"]}
            heights={["72px", "55px", "51px", "26px"]}
            spacer="32px"
          />
        </div>
      </div>
    );
  }
}
