import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./CSS/Login.css";

const Login = () => {
  const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call Backend API login endpoint
      const res = await axios.post(`${api_url}/api/user/login`, formData);

      if (res.status === 200) {
        const { token, userData, message } = res.data;

        // Store JWT token and User Object in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData || { name: formData.email.split("@")[0], email: formData.email }));

        await Swal.fire({
          icon: "success",
          title: "Logged in Successfully! 🎉",
          text: message || `Welcome back, ${userData?.name || "Shopper"}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Trigger custom storage event so Header immediately updates
        window.dispatchEvent(new Event("storage"));

        navigate("/Product");
        return;
      }
    } catch (err) {
      console.error("Login API Error:", err);
      const errorMessage = err.response?.data?.message || "Invalid email or password. Please try again.";
      setError(errorMessage);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setFormData({
      email: "demo@shopsphere.com",
      password: "password123",
    });
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Left Visual Branding Panel */}
        <div className="login-brand-panel">
          <div className="brand-gradient-overlay"></div>
          <div className="brand-content">
            <div className="brand-badge">✨ ShopSphere Experience</div>
            <h1 className="brand-title">Step into the future of online shopping.</h1>
            <p className="brand-sub">
              Access your personalized recommendations, track orders in real-time, and unlock VIP drop deals.
            </p>

            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <div>
                  <strong>Instant Express Checkout</strong>
                  <p>Saved addresses & fast payment options.</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛡️</span>
                <div>
                  <strong>Bank-Grade Security</strong>
                  <p>256-bit encrypted authentication & privacy.</p>
                </div>
              </div>
            </div>

            <div className="brand-footer-quote">
              <p>"The slickest e-commerce design and fastest delivery I've ever experienced."</p>
              <span>— Sarah Jenkins, Verified Buyer</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="login-form-panel">
          <div className="auth-tab-switch">
            <button className="tab-btn active">Log In</button>
            <button className="tab-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>

          <div className="login-card-header">
            <h2>Welcome Back 👋</h2>
            <p>Please enter your credentials to log in to your account.</p>
          </div>

          <form onSubmit={loginUser} className="auth-form">
            {error && <div className="auth-error-banner">{error}</div>}

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-field-wrap">
                <span className="input-icon">📧</span>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
              <div className="input-field-wrap">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <div className="remember-row">
              <label className="checkbox-wrap">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Authenticating..." : "Sign In to Account 🚀"}
            </button>

            <button
              type="button"
              className="demo-login-btn"
              onClick={handleDemoFill}
              title="Auto-fill sample credentials for quick testing"
            >
              📝 Fill Sample Credentials
            </button>
          </form>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-login-grid">
            <button
              type="button"
              className="social-btn"
              onClick={() =>
                Swal.fire({ icon: "info", title: "Google Login", text: "Please sign in using your email and password." })
              }
            >
              🌐 Google
            </button>
            <button
              type="button"
              className="social-btn"
              onClick={() =>
                Swal.fire({ icon: "info", title: "GitHub Login", text: "Please sign in using your email and password." })
              }
            >
              💻 GitHub
            </button>
          </div>

          <p className="auth-footer-text">
            Don't have an account yet? <Link to="/signup">Create free account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;