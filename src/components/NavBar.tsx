import { Component } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as CartIcon } from "../assets/empty_cart.svg";

const StyledNav = styled.nav`
  text-transform: uppercase;
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

  /* Nav Links */
  .nav-link {
    display: inline-block;
    padding: 1rem;
    height: var(--nav-height, 80px);
    text-decoration: none;
  }

  .nav-link:before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }

  .nav-link:visited {
    color: inherit;
  }

  .nav-link:hover {
    border-bottom: 2px solid var(--accent);
  }

  /* Action Buttons */
  .nav-button {
    padding: 1rem;
    font-size: 1.25rem;
    line-height: 0;
    height: 100%;
  }

  .dropdown::after {
    content: "\u2304";
    margin-left: 10px;
    vertical-align: 3px;
  }
`;

class NavBar extends Component {
  render() {
    return (
      <StyledNav className="container">
        <ul className="nav--links">
          <li>
            <Link className="nav-link" to="/women">
              Women
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/men">
              Men
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/kids">
              Kids
            </Link>
          </li>
        </ul>
        <div className="nav--logo-container">
          <Logo />
        </div>
        <div className="nav--buttons">
          <button className="nav-button dropdown">$</button>
          <button className="nav-button">
            <CartIcon />
          </button>
        </div>
      </StyledNav>
    );
  }
}

export default NavBar;
