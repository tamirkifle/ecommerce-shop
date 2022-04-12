import NavBar from "./components/NavBar";
import { ProductListing, ProductDescription, Cart } from "./pages";
import { Global, css } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import styled from "@emotion/styled";

const GlobalStyles = css`
  :root {
    --text: #43464e;
    --dark: #1d1f22;
    --accent: #5ece7b;
    --ff-main: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    --ff-roboto: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    --ff-roboto-c: "Roboto Condensed", -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    --ff-source-s: "Source Sans Pro", -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    --nav-height: 80px;
  }

  /* RESETS */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p {
    padding: 0;
    margin: 0;
  }

  ul[class] {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  button {
    border: none;
    margin: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }

  /* General Styles */
  body {
    font-family: var(--ff-main);
    color: var(--dark);
  }

  /* Utility Classes */
  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .split {
    display: flex;
  }
  .split > * + * {
    margin-left: var(--flex-spacer, 1rem);
  }
  .split-column {
    display: flex;
    flex-direction: column;
  }
  .split-column > * + * {
    margin-top: var(--flex-spacer, 1rem);
  }
  .flow-content > * + * {
    margin-top: var(--flow-spacer, 1rem);
  }

  .btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: var(--dark, black);
    border: 1px solid var(--dark, black);
  }

  .accent {
    color: white;
    background-color: var(--accent);
  }
`;

const MainContent = styled.main`
  margin: 5rem auto;
`;

function App() {
  return (
    <Router>
      <Global styles={GlobalStyles} />
      <ScrollToTop />
      <header>
        <NavBar />
      </header>
      <MainContent className="container">
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/:category" element={<ProductListing />} />
          <Route path="/product/:productId" element={<ProductDescription />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
