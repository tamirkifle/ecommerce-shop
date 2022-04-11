import NavBar from "./components/NavBar";
import { ProductListing } from "./pages";
import { Global, css } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDescription from "./pages/ProductDescription/ProductDescription";
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
  }

  button:hover {
    cursor: pointer;
  }

  /* General Styles */
  body {
    font-family: var(--ff-main);
    color: var(--dark);
  }

  header {
    padding: 0 1rem;
  }

  /* Utility Classes */
  .container {
    max-width: 1400px;
    margin: 0 auto;
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
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
