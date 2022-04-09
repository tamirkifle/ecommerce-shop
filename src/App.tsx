import NavBar from "./components/NavBar";
import { ProductListing } from "./pages";
import { Global, css } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDescription from "./pages/ProductDescription/ProductDescription";

const GlobalStyles = css`
  :root {
    --text: #43464e;
    --accent: #5ece7b;
    --ff-main: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    --ff-roboto: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    --ff-roboto-c: "Roboto Condensed", -apple-system, BlinkMacSystemFont,
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

  ul {
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
    color: var(--text);
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

function App() {
  return (
    <Router>
      <Global styles={GlobalStyles} />
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/:category" element={<ProductListing />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
      </Routes>
    </Router>
  );
}

export default App;
