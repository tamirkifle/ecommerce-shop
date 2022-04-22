import { Component } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Category, Currency } from "../types";
import { NAVBAR__QUERY } from "../graphql/queries";
import { withClient, WithClientProps } from "../graphql/withApolloClient";
import CurrencyDropdown from "./CurrencyDropdown";
import MiniCartDropdown from "./MiniCartDropdown";
import { closeDropdowns } from "../store/actions";
import LoadingNavBar from "./loading/LoadingNavBar";

const Header = styled.header`
  position: relative;
  z-index: 2;
  background-color: white;
`;
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

  /* Nav Links */
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
    display: flex;
    align-items: center;
  }

  .dropdown::after {
    content: "\u2304";
    margin-left: 10px;
    margin-bottom: 5px;
  }
`;

interface NavBarOwnProps {}
interface NavBarState {
  categories: Category[] | null;
  currencies: Currency[] | null;
  loading: boolean;
}

type NavBarProps = NavBarOwnProps & WithClientProps;
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
    return this.state.categories && this.state.currencies ? (
      <Header>
        <StyledNav className="container">
          <ul className="nav--links">
            {this.state.categories.map((category: Category) => {
              return (
                <li key={String(category.name)}>
                  <Link
                    className="nav-link"
                    to={`/categories/${category.name}`}
                    onClick={() => closeDropdowns()}
                  >
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
            <CurrencyDropdown currencies={this.state.currencies} />
            <MiniCartDropdown />
          </div>
        </StyledNav>
      </Header>
    ) : this.state.loading ? (
      <LoadingNavBar />
    ) : null;
  }
}

export default withClient(NavBar);
