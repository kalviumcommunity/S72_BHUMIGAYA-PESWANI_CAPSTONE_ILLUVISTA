import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import CreateProduct from "./pages/CreateProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
