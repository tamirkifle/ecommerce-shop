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
  & > * {
    --flex-spacer: 0.5rem;
  }
  height: var(--nav-height, 80px);
`;

const NavLinks = styled.ul`
  flex-basis: 100%;
  .nav-link {
    text-transform: uppercase;
    display: inline-block;
    padding: 1rem;
    height: var(--nav-height, 80px);
    text-decoration: none;
    color: inherit;
    position: relative;
    z-index: 2;
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
`;

const NavLogoContainer = styled.div`
  flex-basis: 0%;
  align-self: center;
  padding: 1rem;
`;

const NavButtons = styled.div`
  & > * {
    --flex-spacer: 0;
  }
  flex-basis: 100%;
`;

const NavOverlay = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  z-index: 1;
  left: 0;
  width: 100%;
  height: 100%;
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
        <StyledNav className="container split">
          <NavLinks className="split">
            {this.state.categories.map((category: Category) => {
              return (
                <li key={String(category.name)}>
                  <Link
                    className="nav-link"
                    to={`/categories/${category.name}`}
                    onClick={closeDropdowns}
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </NavLinks>
          <NavLogoContainer>
            <Logo />
          </NavLogoContainer>
          <NavButtons className="split flex-end">
            <CurrencyDropdown currencies={this.state.currencies} />
            <MiniCartDropdown />
          </NavButtons>
          <NavOverlay onClick={closeDropdowns} />
        </StyledNav>
      </Header>
    ) : this.state.loading ? (
      <LoadingNavBar />
    ) : null;
  }
}

export default withClient(NavBar);
