"use client";

import React from "react";

/**
 * A small reusable component for each collapsible sidebar section.
 * You can move this to a separate file if desired.
 */
function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="collapsible-section">
      <div className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
        <h4 className="collapsible-title">{title}</h4>
        <span className="collapsible-icon">
          <img
            src="/images/arrow.png" // Make sure this arrow.png is DOWN by default
            alt="toggle arrow"
            className={`arrow-img ${isOpen ? "arrow-open" : "arrow-closed"}`}
          />
        </span>
      </div>
      {isOpen && <div className="collapsible-body">{children}</div>}
    </div>
  );
}

export default function ProductListingPage() {
  // State to track current view mode: 'grid' or 'list'
  const [viewMode, setViewMode] = React.useState("grid");

  // Handlers for toggling the view
  const handleGridClick = () => setViewMode("grid");
  const handleListClick = () => setViewMode("list");

  return (
    <div className="product-listing-container">
      {/* LEFT SIDEBAR WITH COLLAPSIBLE SECTIONS */}
      <aside className="sidebar-filters">
        {/* Categories */}
        <CollapsibleSection title="Category">
          <ul className="filter-list">
            <li>Mobile accessory</li>
            <li>Electronics</li>
            <li>Smartphones</li>
            <li>Modern tech</li>
          </ul>
          <a href="#" className="see-all">
            See all
          </a>
        </CollapsibleSection>

        {/* Brands */}
        <CollapsibleSection title="Brands">
          <div className="checkbox-row">
            <input type="checkbox" id="brandSamsung" />
            <label htmlFor="brandSamsung">Samsung</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="brandApple" />
            <label htmlFor="brandApple">Apple</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="brandHuawei" />
            <label htmlFor="brandHuawei">Huawei</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="brandPocco" />
            <label htmlFor="brandPocco">Pocco</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="brandLenovo" />
            <label htmlFor="brandLenovo">Lenovo</label>
          </div>
          <a href="#" className="see-all">
            See all
          </a>
        </CollapsibleSection>

        {/* Features */}
        <CollapsibleSection title="Features">
          <div className="checkbox-row">
            <input type="checkbox" id="featureMetallic" />
            <label htmlFor="featureMetallic">Metallic</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="featurePlastic" />
            <label htmlFor="featurePlastic">Plastic cover</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="feature8GB" />
            <label htmlFor="feature8GB">8GB Ram</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="featureSuper" />
            <label htmlFor="featureSuper">Super power</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="featureLarge" />
            <label htmlFor="featureLarge">Large Memory</label>
          </div>
        </CollapsibleSection>

        {/* Price Range */}
        <CollapsibleSection title="Price range">
          <div className="price-inputs">
            <div>
              <label>Min</label>
              <input type="number" placeholder="0" />
            </div>
            <div>
              <label>Max</label>
              <input type="number" placeholder="999999" />
            </div>
          </div>

          {/* Visual range bar (no real slider logic) */}
          <div className="range-bar">
            <div className="range-active"></div>
            <div className="range-control left-control"></div>
            <div className="range-control right-control"></div>
          </div>

          <button className="apply-button">APPLY</button>
        </CollapsibleSection>

        {/* Condition */}
        <CollapsibleSection title="Condition">
          <div className="checkbox-row">
            <input type="checkbox" id="condAny" />
            <label htmlFor="condAny">Any</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="condRefurb" />
            <label htmlFor="condRefurb">Refurbished</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="condBrandNew" />
            <label htmlFor="condBrandNew">Brand new</label>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="condOldItems" />
            <label htmlFor="condOldItems">Old items</label>
          </div>
        </CollapsibleSection>

        {/* Rating */}
        <CollapsibleSection title="Ratings">
          {/* 5 Stars */}
          <div className="checkbox-row">
            <input type="checkbox" id="rating5" />
            <label htmlFor="rating5">
              <div className="stars">
                <span className="star star-active"></span>
                <span className="star star-active"></span>
                <span className="star star-active"></span>
                <span className="star star-active"></span>
                <span className="star star-active"></span>
              </div>
            </label>
          </div>
          {/* 4 Stars */}
          <div className="checkbox-row">
            <input type="checkbox" id="rating4" />
            <label htmlFor="rating4">
              <div className="stars">
                <span className="star star-active"></span>
                <span className="star star-active"></span>
                <span className="star star-active"></span>
                <span className="star star-active"></span>
                <span className="star"></span>
              </div>
            </label>
          </div>
          {/* 3 Stars */}
          <div className="checkbox-row">
            <input type="checkbox" id="rating3" />
            <label htmlFor="rating3">
              <div className="stars">
                <span className="star star-active"></span>
                <span className="star star-active"></span>
                <span className="star star-active"></span>
                <span className="star"></span>
                <span className="star"></span>
              </div>
            </label>
          </div>
          {/* 2 Stars */}
          <div className="checkbox-row">
            <input type="checkbox" id="rating2" />
            <label htmlFor="rating2">
              <div className="stars">
                <span className="star star-active"></span>
                <span className="star star-active"></span>
                <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
              </div>
            </label>
          </div>
          {/* 1 Star */}
          <div className="checkbox-row">
            <input type="checkbox" id="rating1" />
            <label htmlFor="rating1">
              <div className="stars">
                <span className="star star-active"></span>
                <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
                <span className="star"></span>
              </div>
            </label>
          </div>
        </CollapsibleSection>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <div className="top-bar">
          <div className="top-bar-inner">
            <div className="top-bar-left">
              <p className="top-bar-text">12,911 items in Mobile accessory</p>
            </div>
            <div className="top-bar-right">
              <div className="verified-only">
                <input type="checkbox" id="verifiedOnly" defaultChecked />
                <label htmlFor="verifiedOnly">Verified only</label>
              </div>

              <div className="selectbox-done">
                <span
                  className="selectbox-text"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Featured
                </span>
                <span className="selectbox-icon">
                  <img
                    src="/images/arrow-d.png"
                    alt="Arrow down"
                    className="arrow-down"
                  />
                </span>
              </div>

              <div className="btn-group">
                <button
                  className={`btn-grid ${viewMode === "grid" ? "active" : ""}`}
                  onClick={handleGridClick}
                  aria-label="Grid view"
                >
                  <img
                    src="/images/grid-button.png"
                    alt="Grid view"
                    className="toggle-icon"
                  />
                </button>
                <button
                  className={`btn-list ${viewMode === "list" ? "active" : ""}`}
                  onClick={handleListClick}
                  aria-label="List view"
                >
                  <img
                    src="/images/list-button.png"
                    alt="List view"
                    className="toggle-icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product listing cards */}
        <div className={`products-wrapper ${viewMode}-view`}>
          {/* Example product card */}
          <div className="product-card">
            <button className="btn-favorite" aria-label="Add to wishlist">
              <img
                src="/images/cart-button.png"
                alt="Add to cart"
                className="favorite-icon"
              />
            </button>
            <div className="product-image">
              <div className="image-placeholder">Image Here</div>
            </div>
            <div className="product-details">
              <h3 className="product-title">Canon Camera EOS 2000</h3>
              <div className="product-price">
                <span className="price">$998.00</span>
                <span className="old-price">$1,298.00</span>
              </div>
              <div className="product-rating">
                <div className="stars">
                  <span className="star star-active"></span>
                  <span className="star star-active"></span>
                  <span className="star star-active"></span>
                  <span className="star star-active"></span>
                  <span className="star"></span>
                </div>
                <span className="rating-text">7.5</span>
                <span className="dot-separator"></span>
                <span className="free-shipping">Free Shipping</span>
              </div>
              <p className="product-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </p>
              <a href="#" className="view-details">
                View details
              </a>
            </div>
          </div>

          {/* Another product card */}
          <div className="product-card">
            <button className="btn-favorite" aria-label="Add to wishlist">
              <img
                src="/images/cart-button.png"
                alt="Add to cart"
                className="favorite-icon"
              />
            </button>
            <div className="product-image">
              <div className="image-placeholder">Image Here</div>
            </div>
            <div className="product-details">
              <h3 className="product-title">GoPro HERO9 4K Action Camera</h3>
              <div className="product-price">
                <span className="price">$998.00</span>
                <span className="old-price hidden">$1,198.00</span>
              </div>
              <div className="product-rating">
                <div className="stars">
                  <span className="star star-active"></span>
                  <span className="star star-active"></span>
                  <span className="star star-active"></span>
                  <span className="star star-active"></span>
                  <span className="star"></span>
                </div>
                <span className="rating-text">7.5</span>
                <span className="dot-separator"></span>
                <span className="free-shipping">Free Shipping</span>
              </div>
              <p className="product-description">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <a href="#" className="view-details">
                View details
              </a>
            </div>
          </div>
          {/* ...repeat more product-card blocks as needed... */}
        </div>

        {/* PAGINATION (connected buttons) */}
        <div className="pagination-container">
          <button className="page-btn disabled">&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">...</button>
          <button className="page-btn">10</button>
          <button className="page-btn">&gt;</button>
        </div>
      </main>

      {/* --- STYLES (inline for demonstration) --- */}
      <style jsx>{`
        /****************************
         * PAGE LAYOUT
         ****************************/
        .product-listing-container {
          display: flex;
          margin: 0 auto;
          padding: 1rem;
          max-width: 1400px;
        }

        /****************************
         * SIDEBAR
         ****************************/
        .sidebar-filters {
          width: 240px;
          margin-right: 2rem;
        }

        /* Collapsible sections have a top border for separation */
        .collapsible-section {
          border-top: 1px solid #dee2e7;
          padding-top: 1rem;
          margin-bottom: 1rem;
        }

        /* Collapsible header: title on left, arrow on far right */
        .collapsible-header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Title on the left, arrow on the far right */
  cursor: pointer;
  margin-bottom: 0.5rem;
}

        .collapsible-title {
          font-family: "Inter", sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #1c1c1c;
          margin: 0;
        }
        .collapsible-icon {
          display: flex;
          align-items: center;
        }
        .arrow-img {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }
        /* If arrow.png is down by default: rotate(0deg) = down, rotate(180deg) = up */
        .arrow-open {
          transform: rotate(180deg);
        }
        .arrow-closed {
          transform: rotate(0deg);
        }

        .collapsible-body {
          margin-top: 0.5rem;
        }

        .filter-list {
          list-style: none;
          margin: 0;
          padding: 0;
          font-family: "Inter", sans-serif;
        }
        .filter-list li {
          margin-bottom: 0.5rem;
          cursor: pointer;
        }
        .see-all {
          display: inline-block;
          margin-top: 0.5rem;
          color: #0d6efd;
          font-size: 14px;
          text-decoration: none;
          font-family: "Inter", sans-serif;
        }
        .checkbox-row {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          font-family: "Inter", sans-serif;
        }
        .checkbox-row input[type="checkbox"] {
          margin-right: 0.5rem;
        }
        .checkbox-row label {
          font-size: 14px;
          color: #1c1c1c;
        }

        /****************************
         * PRICE RANGE
         ****************************/
        .price-inputs {
          display: flex;
          gap: 1rem;
          margin: 0.5rem 0;
        }
        .price-inputs label {
          display: block;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          margin-bottom: 0.25rem;
          color: #1c1c1c;
        }
        .price-inputs input {
          width: 80px;
          padding: 4px;
          border: 1px solid #dee2e7;
          border-radius: 4px;
          font-family: "Inter", sans-serif;
        }
        .range-bar {
          position: relative;
          height: 6px;
          background: #dee2e7;
          border-radius: 3px;
          margin-bottom: 1rem;
          margin-top: 0.5rem;
        }
        .range-active {
          position: absolute;
          left: 20%;
          width: 50%;
          top: 0;
          bottom: 0;
          background: #0d6efd;
          border-radius: 3px;
        }
        .range-control {
          position: absolute;
          width: 16px;
          height: 16px;
          background: #ffffff;
          border: 2px solid #0d6efd;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .left-control {
          left: 20%;
        }
        .right-control {
          left: 70%;
        }
        .apply-button {
          padding: 6px 12px;
          background: #0d6efd;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-family: "Inter", sans-serif;
        }

        /****************************
         * RATING STARS
         ****************************/
        .stars {
          display: inline-flex;
          gap: 2px;
        }
        .star {
          width: 16px;
          height: 16px;
          background: url("/images/star-empty.png") no-repeat center/cover;
          display: inline-block;
        }
        .star-active {
          background: url("/images/star-filled.png") no-repeat center/cover;
        }

        /****************************
         * MAIN CONTENT + TOP BAR
         ****************************/
        .main-content {
          flex: 1;
          position: relative;
        }
        .top-bar {
          background: #ffffff;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          margin-bottom: 1rem;
          padding: 0.5rem;
          font-family: "Inter", sans-serif;
        }
        .top-bar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .top-bar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-right: 1rem;
        }
        .verified-only {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .verified-only input[type="checkbox"] {
          width: 20px;
          height: 20px;
          background: #0d6efd;
          border-radius: 5px;
          cursor: pointer;
        }
        .top-bar-text {
          margin: 0 1rem;
          font-family: "Inter", sans-serif;
        }

        /* Sort selectbox */
        .selectbox-done {
          position: relative;
          width: 172px;
          height: 40px;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.5rem;
          cursor: pointer;
        }
        .selectbox-text {
          font-family: "Inter", sans-serif;
          font-size: 16px;
          color: #1c1c1c;
        }
        .selectbox-icon {
          display: flex;
          align-items: center;
        }
        .arrow-down {
          width: 8px;
          height: 8px;
          margin-left: 4px;
        }

        /* Grid / List toggle buttons */
        .btn-group {
          display: flex;
          gap: 0.25rem;
        }
        .btn-grid,
        .btn-list {
          width: 38px;
          height: 40px;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-grid.active,
        .btn-list.active {
          background: #eff2f4;
        }
        .toggle-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /****************************
         * PRODUCT CARDS
         ****************************/
        .products-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .products-wrapper.grid-view {
          flex-direction: row;
          flex-wrap: wrap;
        }
        .products-wrapper.grid-view .product-card {
          width: calc(33.333% - 1rem);
        }
        .products-wrapper.list-view .product-card {
          width: 100%;
        }
        .product-card {
          position: relative;
          min-height: 230px;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          background: #ffffff;
          padding: 1rem;
          display: flex;
          gap: 1rem;
        }
        .btn-favorite {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .favorite-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .product-image {
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }
        .image-placeholder {
          background-color: #f0f0f0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b96a5;
          font-size: 14px;
          border-radius: 6px;
          font-family: "Inter", sans-serif;
        }
        .product-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .product-title {
          font-family: "Inter", sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #1c1c1c;
          margin: 0;
        }
        .product-price {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .price {
          font-family: "Inter", sans-serif;
          font-weight: 600;
          font-size: 20px;
          color: #1c1c1c;
        }
        .old-price {
          font-family: "Inter", sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #8b96a5;
          text-decoration: line-through;
        }
        .old-price.hidden {
          visibility: hidden;
        }
        .product-rating {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .rating-text {
          font-family: "Inter", sans-serif;
          font-size: 16px;
          color: #8b96a5;
        }
        .dot-separator {
          width: 4px;
          height: 4px;
          background: #dee2e7;
          border-radius: 50%;
          margin: 0 0.25rem;
        }
        .free-shipping {
          font-family: "Inter", sans-serif;
          font-size: 16px;
          color: #00b517;
        }
        .product-description {
          font-family: "Inter", sans-serif;
          font-size: 16px;
          line-height: 24px;
          color: #505050;
          margin: 0.5rem 0;
          flex: 1;
        }
        .view-details {
          font-family: "Inter", sans-serif;
          font-weight: 500;
          font-size: 16px;
          color: #0d6efd;
          text-decoration: none;
        }

        /****************************
         * PAGINATION
         ****************************/
        .pagination-container {
          /* Single container with border for all buttons */
          display: inline-flex;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          overflow: hidden;
          margin: 2rem auto 0 auto; /* center horizontally */
        }
        .page-btn {
          /* No individual borders; rely on container's border */
          border: none;
          background: #fff;
          padding: 8px 16px;
          cursor: pointer;
          color: #505050;
          font-family: "Inter", sans-serif;
          font-size: 16px;
          transition: background 0.2s ease;
        }
        /* Thin divider between each button */
        .page-btn + .page-btn {
          border-left: 1px solid #dee2e7;
        }
        .page-btn.active {
          background: #0d6efd;
          color: #fff;
        }
        .page-btn:hover:not(.active):not(.disabled) {
          background: #f5f5f5;
        }
        .page-btn.disabled {
          color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}