import NavBar from "./components/NavBar";
import { ProductListing, ProductDescription, Cart } from "./pages";
import { Global } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import styled from "@emotion/styled";
import GlobalStyles from "./GlobalStyles";
import client from "./apolloClient";
import { ApolloProvider } from "@apollo/client";
import Modal from "./portals/Modal";
import { PageTitle } from "./components/commonStyles";

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
            <Route path="/categories/:category" element={<ProductListing />} />
            <Route
              path="/product/:productId"
              element={<ProductDescription />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="*"
              element={<PageTitle>404: Page Not Found</PageTitle>}
            />
          </Routes>
        </MainContent>
        <Modal />
      </Router>
    </ApolloProvider>
  );
}

export default App;
