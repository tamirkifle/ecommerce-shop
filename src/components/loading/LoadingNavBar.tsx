import styled from "@emotion/styled";
import { Component } from "react";
import Loading from ".";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const StyledNav = styled.nav`
  height: var(--nav-height, 80px);
  display: flex;

  & > * {
    display: flex;
    flex-basis: 100%;
  }

  .nav--logo-container {
    flex-basis: 0%;
    line-height: 0;
    padding: 1rem;
  }

  .nav--buttons {
    justify-content: flex-end;
  }

  .nav-link {
    text-transform: uppercase;
    display: inline-block;
    padding: 1rem;
    height: var(--nav-height, 80px);
    text-decoration: none;
    color: inherit;
  }

  .nav-link:before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
`;
export default class LoadingNavBar extends Component {
  render() {
    return (
      <StyledNav className="container">
        <ul className="nav--links split align-center justify-start">
          <Loading width="70px" widths={["50px", "40px"]} />
          <Loading width="70px" widths={["50px", "40px"]} />
          <Loading width="70px" widths={["50px", "40px"]} />
        </ul>
        <div className="nav--logo-container">
          <Logo />
        </div>
        <div className="nav--buttons split align-center">
          <Loading width="40px" widths={["40px"]} singleHeight="30px" />
          <Loading width="40px" widths={["40px"]} singleHeight="30px" />
        </div>
      </StyledNav>
    );
  }
}
