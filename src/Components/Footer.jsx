import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./CSS/Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "Thank you for joining the ShopSphere VIP list.",
        timer: 1600,
        showConfirmButton: false,
      });
      e.target.reset();
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-container">
          {/* Brand Col */}
          <div className="footer-col brand-col">
            <Link to="/Home" className="footer-logo">
              🛍️ <span>ShopSphere ⭐</span>
            </Link>
            <p className="footer-tagline">
              Elevating everyday online shopping with curated collections, premium quality, and swift global delivery.
            </p>
            <div className="social-links">
              <a href="#instagram" aria-label="Instagram">📸</a>
              <a href="#twitter" aria-label="Twitter">🐦</a>
              <a href="#facebook" aria-label="Facebook">📘</a>
              <a href="#github" aria-label="GitHub">💻</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul>
              <li><Link to="/Home">Home</Link></li>
              <li><Link to="/Product">Browse Shop</Link></li>
              <li><Link to="/about">About Our Story</Link></li>
              <li><Link to="/cart">My Cart</Link></li>
              <li><Link to="/login">User Login</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4 className="footer-title">Categories</h4>
            <ul>
              <li><Link to="/Product">Electronics & Tech</Link></li>
              <li><Link to="/Product">Fashion & Wear</Link></li>
              <li><Link to="/Product">Footwear & Kicks</Link></li>
              <li><Link to="/Product">Home & Workspace</Link></li>
              <li><Link to="/Product">Smart Accessories</Link></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-title">Stay in the Loop</h4>
            <p className="newsletter-desc">Subscribe to unlock exclusive discounts and early drops.</p>
            <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
              <input type="email" name="email" placeholder="Enter your email" required />
              <button type="submit">Join</button>
            </form>
            <div className="payment-badges">
              <span className="payment-badge">💳 VISA</span>
              <span className="payment-badge">💳 Mastercard</span>
              <span className="payment-badge">📲 UPI</span>
              <span className="payment-badge">🍎 Pay</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container bottom-inner">
          <p>© {new Date().getFullYear()} ShopSphere Inc. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#security">Security</a>
          </div>
          <button className="back-to-top" onClick={scrollToTop} title="Back to Top">
            ↑ Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;