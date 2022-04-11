import { Component } from "react";
import { withRouter, WithRouterProps } from "./withRouter";

type Props = WithRouterProps;

export class ScrollToTop extends Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);
