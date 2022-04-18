import { Component } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as CartIcon } from "../assets/empty_cart.svg";
import { Category, Currency } from "../types";
import Loading from "./Loading";
import { NAVBAR__QUERY } from "../graphql/queries";
import { withClient, WithClientProps } from "../graphql/withApolloClient";

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
    color: inherit;
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

interface NavBarExtraProps {}
interface NavBarState {
  categories: Category[] | null;
  currencies: Currency[] | null;
  loading: boolean;
}
type NavBarProps = NavBarExtraProps & WithClientProps;
class NavBar extends Component<NavBarProps, NavBarState> {
  state: NavBarState = {
    categories: null,
    currencies: null,
    loading: true,
  };

  getNavData = async () => {
    if (this.props.client) {
      const { data, loading } = await this.props.client.query({
        query: NAVBAR__QUERY,
      });
      this.setState({
        categories: data?.categories,
        currencies: data?.currencies,
        loading,
      });
    }
  };

  componentDidMount() {
    this.getNavData();
  }

  render() {
    return this.state.loading ? (
      <LoadingNavBar />
    ) : (
      <StyledNav className="container">
        <ul className="nav--links">
          {this.state.categories?.map((category: Category) => {
            return (
              <li key={String(category.name)}>
                <Link className="nav-link" to={`/${category.name}`}>
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="nav--logo-container">
          <Logo />
        </div>
        <div className="nav--buttons">
          <button
            className="nav-button dropdown"
            title={this.state.currencies?.[0].label}
          >
            {this.state.currencies?.[0].symbol}
          </button>
          <button className="nav-button">
            <CartIcon />
          </button>
        </div>
      </StyledNav>
    );
  }
}

class LoadingNavBar extends Component {
  render() {
    return (
      <StyledNav className="container">
        <ul className="nav--links">
          <Loading max-width="200px" />
        </ul>
        <div className="nav--logo-container">
          <Logo />
        </div>
        <div className="nav--buttons">
          <Loading width="50px" spacer="5px" />
          <Loading width="50px" spacer="5px" />
        </div>
      </StyledNav>
    );
  }
}

export default withClient(NavBar);
