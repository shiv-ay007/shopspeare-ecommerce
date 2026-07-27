import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import HeaderSearchModal from "./HeaderSearchModal";
import ProductModal from "./ProductModal";
import "./CSS/Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  // Dark/Light theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const checkUser = () => {
      const data = localStorage.getItem("user");
      setUser(data ? JSON.parse(data) : null);
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Log out?",
      text: "Are you sure you want to sign out?",
      showCancelButton: true,
      confirmButtonText: "Log out",
      confirmButtonColor: "#6366f1",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setMenuOpen(false);

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1400,
        });

        navigate("/");
      }
    });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="site-header-inner">
          <Link to="/Home" className="site-logo" onClick={() => setMenuOpen(false)}>
            <span className="logo-icon">🛍️</span>
            <span className="logo-text">ShopSphere<span className="logo-star">⭐</span></span>
          </Link>

          {/* Quick Header Search Trigger Bar */}
          <div
            className="header-search-trigger"
            onClick={() => setSearchModalOpen(true)}
            title="Click or press / to search products"
          >
            <span className="search-icon">🔍</span>
            <span className="search-placeholder">Search products...</span>
            <span className="search-shortcut">⌘K</span>
          </div>

          <nav className={`site-nav ${menuOpen ? "open" : ""}`}>
            <Link
              to="/Home"
              className={`nav-link ${isActive("/Home") ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/Product"
              className={`nav-link ${isActive("/Product") ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/about"
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            
            <Link
              to="/cart"
              className={`nav-link nav-cart ${isActive("/cart") ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              🛒 Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>

            {wishlistCount > 0 && (
              <Link
                to="/Product"
                className="nav-link nav-wishlist"
                onClick={() => setMenuOpen(false)}
              >
                ❤️ Wishlist
                <span className="wishlist-badge">{wishlistCount}</span>
              </Link>
            )}

            {/* Theme toggle button inside navbar */}
            <button
              className="header-theme-toggle"
              onClick={toggleTheme}
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {user ? (
              <div className="nav-user">
                <Link
                  to="/profile"
                  className="user-profile-link"
                  onClick={() => setMenuOpen(false)}
                  title="View My Profile"
                >
                  <div className="user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="nav-user-name">Hi, {user.name}</span>
                </Link>

                <button
                  className="nav-btn nav-btn-outline"
                  style={{ padding: "6px 12px", fontSize: "12px" }}
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                >
                  Profile 👤
                </button>

                <button className="nav-btn nav-btn-outline" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="nav-auth-buttons">
                <button
                  className="nav-btn nav-btn-ghost"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/login");
                  }}
                >
                  Log In
                </button>
                <button
                  className="nav-btn nav-btn-primary"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
          </nav>

          <button
            className={`nav-toggle ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Global Header Instant Search Modal */}
      <HeaderSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      {/* Quick View Product Modal from Search */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
};

export default Header;