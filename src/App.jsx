import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import CustomCursor from "./Components/CustomCursor";

import { CartProvider } from "./Context/CartContext";
import { WishlistProvider } from "./Context/WishlistContext";

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          {/* Global Decorated Custom Cursor */}
          <CustomCursor />

          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Home" element={<Home />} />

            <Route path="/product" element={<Product />} />
            <Route path="/Product" element={<Product />} />

            <Route path="/about" element={<About />} />
            <Route path="/About" element={<About />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/Cart" element={<Cart />} />

            <Route path="/login" element={<Login />} />
            <Route path="/Login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/Signup" element={<Signup />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Profile" element={<Profile />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;