import { css } from "@emotion/react";

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
    --bs: 0px 4px 35px rgba(168, 172, 176, 0.19);
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

  .justify-center {
    justify-content: center;
  }
  .justify-stretch {
    & > * {
      flex-basis: 100%;
    }
  }
  .align-center {
    align-items: center;
  }
  .align-end {
    align-items: end;
  }

  .space-between {
    justify-content: space-between;
  }
  .flex-end {
    justify-content: flex-end;
  }

  .btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: var(--dark, black);
    font-weight: 600;
    font-size: 14px;
    border: 1px solid var(--dark, black);
  }

  .accent {
    color: white;
    border: none;
    background-color: var(--accent);
  }

  .bold {
    font-weight: 700;
  }
`;

export default GlobalStyles;
