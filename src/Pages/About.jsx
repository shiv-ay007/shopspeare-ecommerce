import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/About.css";

const stats = [
  { label: "Happy Customers", value: "50,000+", icon: "👥" },
  { label: "Products Delivered", value: "120,000+", icon: "📦" },
  { label: "Satisfaction Rate", value: "99.9%", icon: "⭐" },
  { label: "Countries Served", value: "35+", icon: "🌍" },
];

const values = [
  {
    icon: "💎",
    title: "Uncompromising Quality",
    desc: "Every product in our catalog undergoes strict multi-point quality inspections before listing.",
  },
  {
    icon: "🚀",
    title: "Lightning Express Shipping",
    desc: "Same-day dispatch for orders placed before 2 PM with real-time GPS tracking capabilities.",
  },
  {
    icon: "🌱",
    title: "Sustainable & Eco-Friendly",
    desc: "100% recyclable packaging materials and carbon-neutral shipping options.",
  },
  {
    icon: "🛡️",
    title: "Ironclad Security",
    desc: "End-to-end encrypted payment gateways and 7-day hassle-free returns.",
  },
];

const team = [
  {
    name: "Aarav Sharma",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Passionate about creating modern, effortless retail experiences.",
  },
  {
    name: "Sophia Chen",
    role: "Head of Product Design",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    bio: "Crafting minimalist, intuitive visual aesthetic systems.",
  },
  {
    name: "Vikram Malhotra",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Architecting high-speed, secure, real-time web infrastructure.",
  },
];

const faqs = [
  {
    q: "How long does shipping usually take?",
    a: "Standard shipping takes 2-4 business days. Express shipping delivers within 24-48 hours depending on your city pincode.",
  },
  {
    q: "What is your return & exchange policy?",
    a: "We offer a 7-day no-questions-asked return and exchange policy. Items must be in original condition with tags attached.",
  },
  {
    q: "Are all products original and brand new?",
    a: "Yes, 100%! We source directly from authorized manufacturers and official distributors.",
  },
  {
    q: "Which payment options do you support?",
    a: "We support Credit/Debit Cards, Net Banking, UPI (GPay, PhonePe, Paytm), Apple Pay, and Cash on Delivery (COD).",
  },
];

const About = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="about-page">
      {/* Hero Header Section */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <span className="about-badge">✨ Our Journey & Vision</span>
          <h1 className="about-hero-title">
            Redefining Online Shopping for the <span>Modern Era</span>.
          </h1>
          <p className="about-hero-sub">
            ShopSphere was built with a simple promise: curated premium products, transparent prices, and zero compromise on customer happiness.
          </p>
          <div className="about-hero-actions">
            <button className="about-cta-primary" onClick={() => navigate("/Product")}>
              Explore Our Collection →
            </button>
            <button
              className="about-cta-secondary"
              onClick={() => {
                document.getElementById("values-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Why Choose Us
            </button>
          </div>
        </div>
      </section>

      {/* Live Stats Counter Strip */}
      <section className="about-stats-section">
        <div className="about-container">
          <div className="stats-grid">
            {stats.map((item, index) => (
              <div className="stat-card glass-card" key={index}>
                <span className="stat-icon">{item.icon}</span>
                <h3 className="stat-value">{item.value}</h3>
                <p className="stat-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="about-story-section">
        <div className="about-container story-grid">
          <div className="story-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
              alt="ShopSphere Storefront"
              className="story-img main"
            />
            <div className="story-floating-card glass-card">
              <span className="floating-icon">⭐</span>
              <div>
                <strong>Rated 4.9 / 5</strong>
                <p>By over 10,000+ verified customer reviews</p>
              </div>
            </div>
          </div>

          <div className="story-content">
            <span className="section-eyebrow">OUR STORY</span>
            <h2 className="section-title">Built by shoppers, for shoppers who demand the best.</h2>
            <p className="story-text">
              Founded in 2024, ShopSphere originated from a vision to eliminate counterfeit products, slow shipping times, and clunky user interfaces. We curate items that balance function, elegance, and durability.
            </p>
            <p className="story-text">
              Whether you are upgrading your workspace tech, refreshing your wardrobe with premium apparel, or gifting a loved one, our platform ensures every order feels special.
            </p>

            <ul className="story-bullets">
              <li>✔️ Hand-selected product catalog with 100% authenticity guarantee.</li>
              <li>✔️ Instant real-time order tracking via SMS and Email.</li>
              <li>✔️ Dedicated 24/7 customer support team ready to assist.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values-section" id="values-section">
        <div className="about-container">
          <div className="section-header text-center">
            <span className="section-eyebrow">OUR VALUES</span>
            <h2 className="section-title">The principles that guide everything we do.</h2>
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-card glass-card" key={i}>
                <span className="value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="about-team-section">
        <div className="about-container">
          <div className="section-header text-center">
            <span className="section-eyebrow">MEET THE TEAM</span>
            <h2 className="section-title">The minds powering ShopSphere.</h2>
          </div>

          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card glass-card" key={i}>
                <div className="team-img-wrap">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="about-faq-section">
        <div className="about-container">
          <div className="section-header text-center">
            <span className="section-eyebrow">GOT QUESTIONS?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <div
                className={`faq-item glass-card ${openFaq === index ? "open" : ""}`}
                key={index}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <h3>{faq.q}</h3>
                  <span className="faq-icon">{openFaq === index ? "−" : "+"}</span>
                </div>
                {openFaq === index && <p className="faq-answer">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
