import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategory, fetchProduct } from "../Redux/StoreDataSlice";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import ProductModal from "../Components/ProductModal";
import Swal from "sweetalert2";
import "./CSS/Home.css";

const heroSlides = [
  {
    eyebrow: "NEW SEASON DROPS ⚡",
    title: "Unmatched Quality for Modern Lifestyles",
    sub: "Explore our latest curated release of premium electronics, kicks, and urban wear.",
    cta: "Explore Collection →",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "EXCLUSIVE FLASH SALE 🏷️",
    title: "Up to 50% Off Top Rated Essentials",
    sub: "Limited quantities available. Grab the best deals before stock runs out.",
    cta: "Shop Flash Deals 🔥",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    eyebrow: "EXPRESS GLOBAL SHIPPING ✈️",
    title: "Free Express Delivery on Orders Over ₹999",
    sub: "Zero hidden charges. Instant dispatch with real-time GPS parcel tracking.",
    cta: "Start Shopping Now",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  },
];

const trustBadges = [
  { title: "Free Express Shipping", desc: "On all orders over ₹999", icon: "🚚" },
  { title: "7-Day Easy Returns", desc: "No-questions-asked refund policy", icon: "🔄" },
  { title: "Bank-Grade Security", desc: "100% encrypted safe payments", icon: "🛡️" },
  { title: "24/7 Global Support", desc: "Instant live chat assistance", icon: "🎧" },
];

const testimonials = [
  {
    name: "Ananya Roy",
    role: "Verified Buyer",
    rating: 5,
    text: "ShopSphere is hands down the best e-commerce site I've used. The product quality is immaculate and delivery was inside 24 hours!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Rohan Kapoor",
    role: "Tech Enthusiast",
    rating: 5,
    text: "Ordered the Aura headphones. Genuine product, beautiful packaging, and super easy checkout process. 10/10 recommendation!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Priya Sharma",
    role: "Fashion Blogger",
    rating: 5,
    text: "The website design is so smooth and luxury! Plus the custom cursor and dark mode vibe make shopping actually fun.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const categoryData = useSelector((state) => state.storeData.category);
  const productData = useSelector((state) => state.storeData.products);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  // Flash Sale Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchProduct());
  }, [dispatch]);

  // Slide autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const getCartQty = (id) => cart.find((c) => c._id === id)?.qty || 0;

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
      title: added ? "Added to Wishlist ❤️" : "Removed from Wishlist",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <div className="home-page">
      {/* Hero Carousel Banner */}
      <section className="hero-banner-section">
        {heroSlides.map((slide, index) => (
          <div
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            key={index}
            style={{ backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.65), rgba(11, 15, 25, 0.8)), url(${slide.image})` }}
          >
            <div className="hero-slide-content fade-in">
              <span className="hero-eyebrow">{slide.eyebrow}</span>
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-sub">{slide.sub}</p>
              <div className="hero-btn-wrap">
                <button className="hero-cta-btn" onClick={() => navigate("/Product")}>
                  {slide.cta}
                </button>
                <button className="hero-secondary-btn" onClick={() => navigate("/about")}>
                  About Us
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* Trust Strip */}
      <section className="trust-strip">
        <div className="home-container">
          <div className="trust-grid">
            {trustBadges.map((badge, idx) => (
              <div className="trust-card glass-card" key={idx}>
                <span className="trust-icon">{badge.icon}</span>
                <div>
                  <h4>{badge.title}</h4>
                  <p>{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Banner with Live Timer */}
      <section className="flash-sale-section">
        <div className="home-container">
          <div className="flash-sale-card glass-card">
            <div className="flash-info">
              <span className="flash-tag">🔥 FLASH SALE ENDS IN</span>
              <h2>Limited Time Bargains — Don't Miss Out</h2>
              <p>Special curated discounts up to 50% off. Offer expires when timer hits zero.</p>
            </div>

            <div className="countdown-box">
              <div className="time-unit">
                <span className="number">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="label">Hours</span>
              </div>
              <span className="time-colon">:</span>
              <div className="time-unit">
                <span className="number">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="label">Mins</span>
              </div>
              <span className="time-colon">:</span>
              <div className="time-unit">
                <span className="number">{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="label">Secs</span>
              </div>
            </div>

            <button className="flash-shop-btn" onClick={() => navigate("/Product")}>
              Shop Deals Now
            </button>
          </div>
        </div>
      </section>

      {/* Shop By Category Grid */}
      {categoryData?.length > 0 && (
        <section className="home-section">
          <div className="home-container">
            <div className="section-header-flex">
              <div>
                <span className="section-subtitle">EXPLORE CATEGORIES</span>
                <h2 className="section-heading">Browse by Department</h2>
              </div>
              <button className="view-all-btn" onClick={() => navigate("/Product")}>
                View All Categories →
              </button>
            </div>

            <div className="category-cards-grid">
              {categoryData.map((cat) => (
                <div
                  className="category-card-item glass-card"
                  key={cat._id}
                  onClick={() => navigate("/Product")}
                >
                  <img src={cat.image} alt={cat.categoryName} className="category-img" />
                  <div className="category-overlay">
                    <h3>{cat.categoryName}</h3>
                    <span className="category-explore">Explore Items →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Products Grid */}
      {productData?.length > 0 && (
        <section className="home-section">
          <div className="home-container">
            <div className="section-header-flex">
              <div>
                <span className="section-subtitle">HANDPICKED SELECTION</span>
                <h2 className="section-heading">Trending & Best Sellers</h2>
              </div>
              <button className="view-all-btn" onClick={() => navigate("/Product")}>
                View All Products →
              </button>
            </div>

            <div className="products-grid">
              {productData.slice(0, 8).map((item) => {
                const qtyInCart = getCartQty(item._id);
                const isFavorited = isInWishlist(item._id);
                const itemImg =
                  item.images?.[0]?.url ||
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80";

                return (
                  <div
                    className="product-card-item glass-card"
                    key={item._id}
                    onClick={() => setSelectedProductModal(item)}
                  >
                    <div className="product-img-box">
                      {qtyInCart > 0 && <span className="cart-qty-badge">{qtyInCart} in Cart</span>}
                      <button
                        className={`wishlist-heart-btn ${isFavorited ? "active" : ""}`}
                        onClick={(e) => handleWishlistToggle(e, item)}
                        title="Save to Wishlist"
                      >
                        {isFavorited ? "❤️" : "🤍"}
                      </button>
                      <img src={itemImg} alt={item.productName} className="product-thumb" />
                      <div className="quick-view-hover">
                        <span>🔍 Quick View</span>
                      </div>
                    </div>

                    <div className="product-info-box">
                      <span className="product-category-tag">
                        {item.category?.categoryName || "Featured"}
                      </span>
                      <h3 className="product-title">{item.productName}</h3>

                      <div className="product-rating-row">
                        <span className="stars">⭐ {item.rating || 4.8}</span>
                        <span className="reviews">({item.reviewsCount || 140})</span>
                      </div>

                      <div className="product-price-action">
                        <div>
                          <span className="price-main">₹{Number(item.price).toLocaleString()}</span>
                          {item.originalPrice && (
                            <span className="price-old">₹{Number(item.originalPrice).toLocaleString()}</span>
                          )}
                        </div>

                        <button
                          className="add-cart-btn"
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
          </div>
        </section>
      )}

      {/* Customer Testimonials Section */}
      <section className="testimonials-section">
        <div className="home-container">
          <div className="section-header-flex center">
            <div>
              <span className="section-subtitle">TESTIMONIALS</span>
              <h2 className="section-heading">Loved by shoppers worldwide.</h2>
            </div>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card glass-card" key={i}>
                <div className="testimonial-stars">{"⭐".repeat(t.rating)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-user">
                  <img src={t.avatar} alt={t.name} />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Quick-View Modal */}
      {selectedProductModal && (
        <ProductModal
          product={selectedProductModal}
          onClose={() => setSelectedProductModal(null)}
        />
      )}
    </div>
  );
};

export default Home;