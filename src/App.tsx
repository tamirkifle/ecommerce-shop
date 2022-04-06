import NavBar from "./components/NavBar";
import { ProductListing } from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/:category" element={<ProductListing />} />
      </Routes>
    </Router>
  );
}

export default App;
