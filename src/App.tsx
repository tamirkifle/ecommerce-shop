import NavBar from "./components/NavBar";
import { ProductListing, ProductDescription, Cart } from "./pages";
import { Global } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import styled from "@emotion/styled";
import GlobalStyles from "./GlobalStyles";
import client from "./apolloClient";
import { ApolloProvider } from "@apollo/client";

const MainContent = styled.main`
  margin: 5rem auto;
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Global styles={GlobalStyles} />
        <ScrollToTop />
        <NavBar />
        <MainContent className="container">
          <Routes>
            <Route path="/" element={<ProductListing />} />
            <Route path="/:category" element={<ProductListing />} />
            <Route
              path="/product/:productId"
              element={<ProductDescription />}
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </MainContent>
      </Router>
    </ApolloProvider>
  );
}

export default App;
