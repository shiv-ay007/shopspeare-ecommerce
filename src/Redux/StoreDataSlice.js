import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fallback Mock Data in case backend API is not running
const MOCK_CATEGORIES = [
  {
    _id: "cat_1",
    categoryName: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Premium gadgets & cutting-edge tech gear"
  },
  {
    _id: "cat_2",
    categoryName: "Fashion & Wear",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    description: "Modern minimalist fashion and urban apparel"
  },
  {
    _id: "cat_3",
    categoryName: "Footwear & Kicks",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "High performance sneakers & luxury shoes"
  },
  {
    _id: "cat_4",
    categoryName: "Home & Work",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    description: "Ergonomic workspace furniture & minimalist decor"
  },
  {
    _id: "cat_5",
    categoryName: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "Smartwatches, leather bags & lifestyle items"
  }
];

const MOCK_PRODUCTS = [
  {
    _id: "prod_1",
    productName: "Aura Noise-Canceling Wireless Headphones",
    price: 12999,
    originalPrice: 16999,
    category: { _id: "cat_1", categoryName: "Electronics" },
    rating: 4.9,
    reviewsCount: 342,
    images: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" }],
    description: "High-resolution acoustic studio audio, active hybrid noise cancellation, 40-hour battery life, and ultra-soft memory foam ear cushions.",
    inStock: true
  },
  {
    _id: "prod_2",
    productName: "Urban Runner Pro Sneaker v2",
    price: 4999,
    originalPrice: 7499,
    category: { _id: "cat_3", categoryName: "Footwear & Kicks" },
    rating: 4.8,
    reviewsCount: 218,
    images: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" }],
    description: "Breathable flyknit mesh with responsive cloud cushion tech for continuous comfort during high-intensity training or daily street style.",
    inStock: true
  },
  {
    _id: "prod_3",
    productName: "Pulse Horizon Smartwatch Series X",
    price: 8499,
    originalPrice: 11999,
    category: { _id: "cat_5", categoryName: "Accessories" },
    rating: 4.7,
    reviewsCount: 189,
    images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" }],
    description: "AMOLED curved display, real-time SpO2 & ECG tracking, titanium frame with water resistance up to 50 meters.",
    inStock: true
  },
  {
    _id: "prod_4",
    productName: "Minimalist Ergonomic Workspace Chair",
    price: 14999,
    originalPrice: 19999,
    category: { _id: "cat_4", categoryName: "Home & Work" },
    rating: 4.9,
    reviewsCount: 95,
    images: [{ url: "https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=800&q=80" }],
    description: "Multi-point lumbar support, breathable Korean mesh backrest, and 3D adjustable armrests for all-day comfort.",
    inStock: true
  },
  {
    _id: "prod_5",
    productName: "Oversized Heavyweight Cotton Hoodie",
    price: 2499,
    originalPrice: 3999,
    category: { _id: "cat_2", categoryName: "Fashion & Wear" },
    rating: 4.6,
    reviewsCount: 154,
    images: [{ url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80" }],
    description: "450 GSM French Terry cotton with drop shoulder silhouette, double-lined hood, and pre-shrunk premium finish.",
    inStock: true
  },
  {
    _id: "prod_6",
    productName: "Studio Mechanical Wireless Keyboard",
    price: 6799,
    originalPrice: 8999,
    category: { _id: "cat_1", categoryName: "Electronics" },
    rating: 4.8,
    reviewsCount: 412,
    images: [{ url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80" }],
    description: "Gateron hot-swappable tactile switches, RGB backlight per key, CNC aluminum chassis with bluetooth multi-device pairing.",
    inStock: true
  },
  {
    _id: "prod_7",
    productName: "Classic Italian Leather Duffle Bag",
    price: 7999,
    originalPrice: 10999,
    category: { _id: "cat_5", categoryName: "Accessories" },
    rating: 4.9,
    reviewsCount: 87,
    images: [{ url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80" }],
    description: "Handcrafted full-grain leather, brass hardware, spacious main compartment with dedicated shoe pocket.",
    inStock: true
  },
  {
    _id: "prod_8",
    productName: "Lumina Touch Smart Desk Lamp",
    price: 3299,
    originalPrice: 4599,
    category: { _id: "cat_4", categoryName: "Home & Work" },
    rating: 4.7,
    reviewsCount: 120,
    images: [{ url: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=800&q=80" }],
    description: "Eye-care warm & cool LED lighting with wireless fast charging base and smooth brightness slider touch control.",
    inStock: true
  }
];

const StoreDataSlice = createSlice({
  name: "StoreData",
  initialState: {
    category: MOCK_CATEGORIES,
    products: MOCK_PRODUCTS,
    loading: false
  },
  reducers: {
    setCategory: (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.category = action.payload;
      }
    },
    setProduct: (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.products = action.payload;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setCategory, setProduct, setLoading } = StoreDataSlice.actions;

const api_url = import.meta.env.VITE_API_URL || "https://backend-kuo4.onrender.com";

export const fetchCategory = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get(`${api_url}/api/category/all-category`);
    const categoryData = res.data.category || res.data.data;
    if (categoryData && categoryData.length > 0) {
      dispatch(setCategory(categoryData));
    }
  } catch (error) {
    console.warn("API fetchCategory unreachable, using fallback mock categories.", error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchProduct = () => async (dispatch) => {
  if (!api_url) return;
  try {
    dispatch(setLoading(true));
    const res = await axios.get(`${api_url}/api/product/get-all`);
    const productData = res.data.product || res.data.data;
    if (productData && productData.length > 0) {
      dispatch(setProduct(productData));
    }
  } catch (error) {
    console.warn("API fetchProduct unreachable, using fallback mock products.", error.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export default StoreDataSlice.reducer;