import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchCategory, fetchProduct } from "../Redux/StoreDataSlice";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import ProductModal from "../Components/ProductModal";
import Swal from "sweetalert2";
import "./CSS/Product.css";

const Product = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const categoryData = useSelector((state) => state.storeData.category);
  const productData = useSelector((state) => state.storeData.products);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const customerName = user ? user.name : "Valued Shopper";

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchProduct());
  }, [dispatch]);

  // Synchronize URL search params ?search=query
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [location.search]);

  const getCartQty = (id) => cart.find((c) => c._id === id)?.qty || 0;

  // Filter products
  let filteredData = selectedCategory
    ? productData.filter((item) => item.category?._id === selectedCategory)
    : productData;

  if (search.trim()) {
    filteredData = filteredData.filter(
      (item) =>
        item.productName.toLowerCase().includes(search.trim().toLowerCase()) ||
        item.category?.categoryName?.toLowerCase().includes(search.trim().toLowerCase())
    );
  }

  if (sortBy === "low") {
    filteredData = [...filteredData].sort((a, b) => a.price - b.price);
  } else if (sortBy === "high") {
    filteredData = [...filteredData].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredData = [...filteredData].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart(item);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${item.productName} added to cart`,
      showConfirmButton: false,
      timer: 1300,
    });
  };

  const handleWishlistToggle = (e, item) => {
    e.stopPropagation();
    const added = toggleWishlist(item);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: added ? "success" : "info",
      title: added ? "Saved to Wishlist ❤️" : "Removed from Wishlist",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <div className="product-page">
      <div className="product-container">
        {/* Header Hero Banner */}
        <header className="catalog-hero glass-card">
          <span className="catalog-badge">👋 Hello, {customerName}</span>
          <h1 className="catalog-title">
            Discover Our <span>Handpicked</span> Collection
          </h1>
          <p className="catalog-sub">
            Filter by department, compare ratings, and get your favorite items delivered right to your doorstep.
          </p>
        </header>

        {/* Categories Section */}
        <section className="catalog-section">
          <div className="section-title-wrap">
            <h2>Shop by Department</h2>
          </div>

          <div className="category-pills-wrap">
            <button
              className={`category-pill ${!selectedCategory ? "active" : ""}`}
              onClick={() => setSelectedCategory("")}
            >
              🔥 All Items ({productData?.length || 0})
            </button>

            {categoryData?.map((cat) => (
              <button
                key={cat._id}
                className={`category-pill ${selectedCategory === cat._id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat._id)}
              >
                <img src={cat.image} alt={cat.categoryName} className="pill-img" />
                {cat.categoryName}
              </button>
            ))}
          </div>
        </section>

        {/* Filter Controls & Products Section */}
        <section className="catalog-section">
          <div className="catalog-controls-bar glass-card">
            <div className="search-input-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search products by name or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="clear-search-btn" onClick={() => setSearch("")}>
                  ✕
                </button>
              )}
            </div>

            <div className="controls-right">
              <span className="results-count">Showing {filteredData?.length} products</span>
              <select
                className="sort-dropdown"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort: Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredData?.length === 0 ? (
            <div className="empty-products-state glass-card">
              <span className="empty-icon">🔎</span>
              <h3>No products found for "{search}"</h3>
              <p>We couldn't find anything matching your search query or selected category.</p>
              <button
                className="reset-filters-btn"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("");
                  setSortBy("");
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="catalog-grid">
              {filteredData?.map((item) => {
                const qtyInCart = getCartQty(item._id);
                const isFavorited = isInWishlist(item._id);
                const itemImg =
                  item.images?.[0]?.url ||
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";

                return (
                  <div
                    className="catalog-card-item glass-card"
                    key={item._id}
                    onClick={() => setSelectedProductModal(item)}
                  >
                    <div className="card-image-box">
                      {qtyInCart > 0 && <span className="cart-badge-tag">{qtyInCart} in Cart</span>}
                      <button
                        className={`wishlist-btn-icon ${isFavorited ? "active" : ""}`}
                        onClick={(e) => handleWishlistToggle(e, item)}
                        title="Save to Wishlist"
                      >
                        {isFavorited ? "❤️" : "🤍"}
                      </button>
                      <img src={itemImg} alt={item.productName} className="card-thumb" />
                      <div className="hover-quick-overlay">
                        <span>🔍 Quick View</span>
                      </div>
                    </div>

                    <div className="card-details-box">
                      <span className="card-category-tag">
                        {item.category?.categoryName || "Curated"}
                      </span>
                      <h3 className="card-item-title">{item.productName}</h3>

                      <div className="card-rating">
                        <span className="stars">⭐ {item.rating || 4.8}</span>
                        <span className="count">({item.reviewsCount || 110})</span>
                      </div>

                      <div className="card-footer-row">
                        <div>
                          <span className="card-price">
                            ₹{Number(item.price).toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="card-old-price">
                              ₹{Number(item.originalPrice).toLocaleString()}
                            </span>
                          )}
                        </div>

                        <button
                          className="card-cart-btn"
                          onClick={(e) => handleAddToCart(e, item)}
                        >
                          {qtyInCart > 0 ? "+ Add More" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Product Quick View Modal */}
      {selectedProductModal && (
        <ProductModal
          product={selectedProductModal}
          onClose={() => setSelectedProductModal(null)}
        />
      )}
    </div>
  );
};

export default Product;