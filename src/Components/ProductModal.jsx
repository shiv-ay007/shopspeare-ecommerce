import React, { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import Swal from "sweetalert2";
import "./CSS/ProductModal.css";

const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isFavorited = isInWishlist(product._id);
  const mainImg = (product.images && product.images[0]?.url) || product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";
  const itemTitle = product.productName || product.name || "Product";
  const catName = typeof product.category === 'object' ? product.category?.categoryName : (product.category || "Featured");

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${quantity} × ${itemTitle} added!`,
      showConfirmButton: false,
      timer: 1500,
    });
    onClose();
  };

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: added ? "success" : "info",
      title: added ? "Saved to Wishlist" : "Removed from Wishlist",
      showConfirmButton: false,
      timer: 1300,
    });
  };

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-body-grid">
          {/* Image side */}
          <div className="modal-image-col">
            <img src={mainImg} alt={itemTitle} className="modal-main-img" />
            <span className="modal-badge">{catName}</span>
          </div>

          {/* Details side */}
          <div className="modal-details-col">
            <div className="modal-rating">
              <span className="stars">⭐ {product.rating || 4.8}</span>
              <span className="review-count">({product.reviewsCount || 120} reviews)</span>
            </div>

            <h2 className="modal-title">{itemTitle}</h2>

            <div className="modal-price-row">
              <span className="modal-price">₹{Number(product.price).toLocaleString()}</span>
              {product.originalPrice && (
                <span className="modal-original-price">₹{Number(product.originalPrice).toLocaleString()}</span>
              )}
              {product.originalPrice && (
                <span className="modal-discount-tag">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="modal-description">
              {product.description ||
                "Crafted with top-grade materials, engineered for sleek performance, durability, and daily elegance."}
            </p>

            <div className="modal-stock-status">
              <span className="stock-dot"></span> In Stock & Ready to Ship
            </div>

            <div className="modal-qty-selector">
              <label>Quantity:</label>
              <div className="qty-controls">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>

            <div className="modal-actions">
              <button className="modal-add-btn" onClick={handleAddToCart}>
                🛍️ Add to Cart (₹{(Number(product.price) * quantity).toLocaleString()})
              </button>
              <button
                className={`modal-wishlist-btn ${isFavorited ? "active" : ""}`}
                onClick={handleToggleWishlist}
                title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isFavorited ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
