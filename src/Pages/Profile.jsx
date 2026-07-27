import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import Swal from "sweetalert2";
import "./CSS/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Mock order history for user profile
  const [orders, setOrders] = useState([
    {
      id: "ORD-98214",
      date: "July 24, 2026",
      total: 12999,
      status: "Delivered",
      itemsCount: 1,
      paymentMethod: "COD",
    },
    {
      id: "ORD-97412",
      date: "July 12, 2026",
      total: 4999,
      status: "In Transit",
      itemsCount: 2,
      paymentMethod: "UPI",
    },
  ]);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please sign in to view your profile.",
        confirmButtonColor: "#6366f1",
      }).then(() => navigate("/login"));
      return;
    }

    const userData = JSON.parse(data);
    setUser(userData);
    setEditForm({
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "+91 98765 43210",
      address: userData.address || "Flat 402, Royal Residency, Connaught Place, New Delhi - 110001",
    });
  }, [navigate]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...editForm };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);

    // Trigger storage event for navbar updates
    window.dispatchEvent(new Event("storage"));

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Profile updated successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Log Out?",
      text: "Are you sure you want to log out of your account?",
      showCancelButton: true,
      confirmButtonText: "Log Out",
      confirmButtonColor: "#6366f1",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("storage"));
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Logged out successfully",
          showConfirmButton: false,
          timer: 1300,
        });
        navigate("/login");
      }
    });
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Banner Card */}
        <div className="profile-header-card glass-card">
          <div className="profile-header-flex">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </div>

            <div className="profile-info-main">
              <div className="profile-badge">⭐ VIP Member</div>
              <h1 className="profile-name">{user.name}</h1>
              <p className="profile-email">📧 {user.email}</p>
            </div>

            <div className="profile-quick-stats">
              <div className="stat-pill" onClick={() => navigate("/cart")}>
                <span className="stat-num">{cartCount}</span>
                <span className="stat-lbl">Cart Items</span>
              </div>
              <div className="stat-pill" onClick={() => navigate("/Product")}>
                <span className="stat-num">{wishlistCount}</span>
                <span className="stat-lbl">Wishlist</span>
              </div>
              <div className="stat-pill">
                <span className="stat-num">{orders.length}</span>
                <span className="stat-lbl">Orders</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content Layout */}
        <div className="profile-grid">
          {/* Account Details Card */}
          <div className="account-details-card glass-card">
            <div className="card-top-bar">
              <h2>Account Information 👤</h2>
              <button
                className="edit-toggle-btn"
                onClick={() => setIsEditing((v) => !v)}
              >
                {isEditing ? "Cancel Edit" : "✏️ Edit Profile"}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="profile-edit-form">
                <div className="field-group">
                  <label htmlFor="editName">Full Name</label>
                  <input
                    id="editName"
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="editEmail">Email Address</label>
                  <input
                    id="editEmail"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="editPhone">Phone Number</label>
                  <input
                    id="editPhone"
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="editAddress">Saved Delivery Address</label>
                  <textarea
                    id="editAddress"
                    rows={3}
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  />
                </div>

                <button type="submit" className="save-profile-btn">
                  Save Changes 🎉
                </button>
              </form>
            ) : (
              <div className="profile-details-list">
                <div className="detail-item">
                  <span className="detail-label">Full Name</span>
                  <span className="detail-value">{user.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-value">{user.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone Number</span>
                  <span className="detail-value">{editForm.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Delivery Address</span>
                  <span className="detail-value">{editForm.address}</span>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                  🚪 Log Out of Account
                </button>
              </div>
            )}
          </div>

          {/* Orders History Card */}
          <div className="orders-history-card glass-card">
            <h2>Recent Orders 📦</h2>

            <div className="orders-list">
              {orders.map((ord) => (
                <div className="order-item-card" key={ord.id}>
                  <div className="order-item-header">
                    <div>
                      <span className="order-id">{ord.id}</span>
                      <span className="order-date">{ord.date}</span>
                    </div>
                    <span
                      className={`order-status-badge ${
                        ord.status === "Delivered" ? "delivered" : "in-transit"
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  <div className="order-item-body">
                    <span>{ord.itemsCount} Item(s) • Paid via {ord.paymentMethod}</span>
                    <span className="order-total">₹{ord.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
