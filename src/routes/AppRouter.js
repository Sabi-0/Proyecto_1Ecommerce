import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import Cart from "../pages/Cart";
import LoginPage from "../pages/LoginPage";

const AppRouter = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route
          path="/product/:id"
          element={
            <ProductPage cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
