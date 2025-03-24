"use client";

import React from "react";

const Header = () => {
  return (
    <>
      <header className="header-container">
        {/* Desktop Header */}
        <div className="top-bar desktop-only">
          {/* Logo */}
          <div className="logo">
            <div className="logo-icon">
              <img src="/images/brand-icon.png" alt="Brand Icon" />
            </div>
            <span className="logo-text">Brand</span>
          </div>

          {/* Search Form */}
          <div className="search-form">
            <input type="text" placeholder="Search" className="search-input" />
            <select className="search-select">
              <option>All category</option>
            </select>
            <button className="search-button">Search</button>
          </div>

          {/* Action Icons */}
          <div className="actions">
            {[
              { icon: "profile.png", label: "Profile" },
              { icon: "message.png", label: "Message" },
              { icon: "orders.png", label: "Orders" },
              { icon: "cart.png", label: "My cart" },
            ].map((item) => (
              <div className="action-item" key={item.label}>
                <img src={`/images/icons/${item.icon}`} alt={item.label} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="mobile-header mobile-only">
          <img src="/images/icons/menu.png" alt="menu" className="mobile-icon" />
          <div className="logo mobile-logo">
            <div className="logo-icon mobile-brand-icon">
              <img src="/images/brand-icon.png" alt="Brand Icon" />
            </div>
            <span className="logo-text">Brand</span>
          </div>
          <div className="mobile-icons">
            <img src="/images/icons/cart.png" alt="cart" className="mobile-icon" />
            <img src="/images/icons/profile.png" alt="user" className="mobile-icon" />
          </div>
        </div>

        {/* Bottom Nav (desktop only) */}
        <div className="bottom-nav desktop-only">
          <div className="nav-links">
            <span className="nav-item">
              <img src="/images/icons/menu.png" className="nav-icon" />
              All category
            </span>
            <span className="nav-item">Hot offers</span>
            <span className="nav-item">Gift boxes</span>
            <span className="nav-item">Projects</span>
            <span className="nav-item">Menu item</span>
            <span className="nav-item">
              Help <span className="arrow">⌄</span>
            </span>
          </div>

          <div className="nav-right">
            <span className="nav-item">
              English, USD <span className="arrow">⌄</span>
            </span>
            <span className="nav-item">
              Ship to
              <img src="/images/germany.png" alt="Flag" className="flag" />
              <span className="arrow">⌄</span>
            </span>
          </div>
        </div>
      </header>

      <style jsx>{`
        .header-container {
          font-family: 'Inter', sans-serif;
          background: white;
          width: 100%;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 48px;
          border-bottom: 1px solid #e0e0e0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-icon {
          background: #8cb7f5;
          padding: 8px;
          border-radius: 8px;
          opacity: 0.8;
        }

        .logo-icon img {
          width: 24px;
          height: 24px;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 700;
          color: #0d6efd;
        }

        .search-form {
          display: flex;
          flex: 1;
          max-width: 600px;
          margin: 0 40px;
          border: 1px solid #0d6efd;
          border-radius: 6px;
          overflow: hidden;
        }

        .search-input {
          flex: 1;
          padding: 10px;
          border: none;
          outline: none;
          font-size: 14px;
        }

        .search-select {
          border: none;
          border-left: 1px solid #0d6efd;
          padding: 0 16px;
          outline: none;
          font-size: 14px;
        }

        .search-button {
          background: linear-gradient(180deg, #127fff 0%, #0067ff 100%);
          color: white;
          padding: 0 24px;
          border: none;
          font-weight: 500;
          cursor: pointer;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 32px;
          color: #8b96a5;
        }

        .action-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
        }

        .action-item img {
          width: 20px;
          height: 20px;
          margin-bottom: 4px;
        }

        .bottom-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 48px;
          border-bottom: 1px solid #e0e0e0;
          font-size: 14px;
          font-weight: 500;
          color: #1c1c1c;
        }

        .nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        .nav-icon {
          width: 16px;
          height: 16px;
        }

        .arrow {
          font-size: 10px;
          color: #8b96a5;
        }

        .flag {
          width: 20px;
          height: 14px;
          border-radius: 2px;
          object-fit: cover;
        }

        .nav-right {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        /* Mobile Header */
        .mobile-header {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }

          .mobile-only {
            display: flex !important;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid #dee2e7;
            background: #ffffff;
          }

          .mobile-icon {
            width: 24px;
            height: 24px;
          }

          .mobile-icons {
            display: flex;
            gap: 16px;
          }

          .mobile-logo {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .mobile-brand-icon {
            background: #0d6efd;
            padding: 6px;
            border-radius: 6px;
          }

          .mobile-brand-icon img {
            width: 20px;
            height: 20px;
          }

          .logo-text {
            font-size: 18px;
            font-weight: 600;
            color: #8cb7f5;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
