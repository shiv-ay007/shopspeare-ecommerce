import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CSS/HeaderSearchModal.css";

const HeaderSearchModal = ({ isOpen, onClose, onSelectProduct }) => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [query, setQuery] = useState("");

  const products = useSelector((state) => state.storeData.products) || [];

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter((item) =>
        (item.productName || item.name || "").toLowerCase().includes(query.trim().toLowerCase()) ||
        (typeof item.category === 'object' ? item.category?.categoryName : item.category || "").toLowerCase().includes(query.trim().toLowerCase())
      )
    : products.slice(0, 5); // Show 5 featured items when empty

  const handleResultClick = (product) => {
    onClose();
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      navigate("/Product");
    }
  };

  const handleSeeAll = () => {
    onClose();
    navigate(`/Product?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Input Bar */}
        <div className="search-modal-header">
          <span className="search-input-icon">🔍</span>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search products by name, category, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSeeAll();
            }}
          />
          {query && (
            <button className="search-clear-btn" onClick={() => setQuery("")}>
              ✕
            </button>
          )}
          <button className="search-close-btn" onClick={onClose}>
            ESC
          </button>
        </div>

        {/* Live Results Section */}
        <div className="search-results-box">
          <div className="results-label">
            {query.trim()
              ? `Found ${filteredProducts.length} result(s) for "${query}"`
              : "🔥 Popular Searches & Featured Products"}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-search-results">
              <span className="no-res-emoji">🔍</span>
              <p>No products found matching "{query}"</p>
              <button className="browse-all-btn" onClick={handleSeeAll}>
                Browse All Products
              </button>
            </div>
          ) : (
            <div className="search-results-list">
              {filteredProducts.slice(0, 6).map((item) => {
                const itemImg =
                  (item.images && item.images[0]?.url) ||
                  item.image ||
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80";
                const itemTitle = item.productName || item.name || "Product";
                const catName = typeof item.category === 'object' ? item.category?.categoryName : (item.category || "Featured");

                return (
                  <div
                    className="search-result-item"
                    key={item._id}
                    onClick={() => handleResultClick(item)}
                  >
                    <img src={itemImg} alt={itemTitle} className="result-thumb" />
                    <div className="result-info">
                      <span className="result-cat">
                        {catName}
                      </span>
                      <h4 className="result-title">{itemTitle}</h4>
                      <span className="result-rating">⭐ {item.rating || 4.8}</span>
                    </div>
                    <div className="result-price-col">
                      <span className="result-price">
                        ₹{Number(item.price).toLocaleString()}
                      </span>
                      <span className="result-arrow">→</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {query.trim() && filteredProducts.length > 0 && (
            <div className="search-footer-bar">
              <button className="see-all-results-btn" onClick={handleSeeAll}>
                View all {filteredProducts.length} results in shop catalog →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSearchModal;
