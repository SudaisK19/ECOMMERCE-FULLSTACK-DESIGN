"use client";
import React from "react";

export default function CartPage() {
  return (
    <main className="cart-page-container">
      {/* Page Title */}
      <h1 className="cart-page-title">My cart (3)</h1>

      {/* Main cart area */}
      <div className="cart-main">
        {/* Left side: Cart items */}
        <section className="cart-items-section">
          {/* Single Cart Item #1 */}
          <div className="cart-item">
            <div className="cart-item-img">
              <img src="/images/sample-shirt.png" alt="Sample Shirt" />
            </div>
            <div className="cart-item-content">
              <div className="cart-item-top">
                <div className="cart-item-details">
                  <h3 className="cart-item-title">
                    T-shirts with multiple colors, for men and lady
                  </h3>
                  <p className="cart-item-subtitle">
                    Size: Medium • Color: Blue, Material: Plastic
                  </p>
                </div>
                <div className="cart-item-right">
                  <div className="cart-item-price">$79.99</div>
                  <div className="qty-box">
                    <label className="qty-label">Qty:</label>
                    <select defaultValue={1}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="9">9</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="cart-item-actions">
                <button className="cart-remove-btn">Remove</button>
                <button className="cart-save-btn">Save for later</button>
              </div>
            </div>
          </div>

          {/* Single Cart Item #2 */}
          <div className="cart-item">
            <div className="cart-item-img">
              <img
                src="https://via.placeholder.com/100x100/eeeeee?text=Product+2"
                alt="Product 2"
              />
            </div>
            <div className="cart-item-content">
              <div className="cart-item-top">
                <div className="cart-item-details">
                  <h3 className="cart-item-title">
                    T-shirts with multiple colors, for men and lady
                  </h3>
                  <p className="cart-item-subtitle">
                    Size: Large • Color: Black, Material: Plastic
                  </p>
                </div>
                <div className="cart-item-right">
                  <div className="cart-item-price">$70.00</div>
                  <div className="qty-box">
                    <label className="qty-label">Qty:</label>
                    <select defaultValue={1}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="cart-item-actions">
                <button className="cart-remove-btn">Remove</button>
                <button className="cart-save-btn">Save for later</button>
              </div>
            </div>
          </div>

          {/* Single Cart Item #3 */}
          <div className="cart-item">
            <div className="cart-item-img">
              <img
                src="https://via.placeholder.com/100x100/eeeeee?text=Product+3"
                alt="Product 3"
              />
            </div>
            <div className="cart-item-content">
              <div className="cart-item-top">
                <div className="cart-item-details">
                  <h3 className="cart-item-title">
                    T-shirts with multiple colors, for men and lady
                  </h3>
                  <p className="cart-item-subtitle">
                    Size: Small • Color: White, Material: Cotton
                  </p>
                </div>
                <div className="cart-item-right">
                  <div className="cart-item-price">$110.50</div>
                  <div className="qty-box">
                    <label className="qty-label">Qty:</label>
                    <select defaultValue={2}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="cart-item-actions">
                <button className="cart-remove-btn">Remove</button>
                <button className="cart-save-btn">Save for later</button>
              </div>
            </div>
          </div>

          {/* Bottom buttons: "Back to shop" & "Remove All" */}
          <div className="cart-bottom-buttons">
            <button className="back-to-shop-btn">
              <span className="arrow-left">&larr;</span> Back to shop
            </button>
            <button className="remove-all-btn">Remove All</button>
          </div>
        </section>

        {/* Right side: Coupon + Summary */}
        <aside className="cart-aside">
          <div className="cart-coupon-box">
            <p className="cart-coupon-label">Have a coupon?</p>
            <div className="coupon-box">
              <input type="text" placeholder="Add coupon" />
              <div className="coupon-divider"></div>
              <button>Apply</button>
            </div>
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Total price:</span>
              <span>$1403.97</span>
            </div>
            <div className="summary-row">
              <span>Discount:</span>
              <span className="discount">- $60.00</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span className="tax">+ $14.00</span>
            </div>
            <hr />
            <div className="summary-total">
              <span>Total:</span>
              <span className="final-price">$1357.97</span>
            </div>
            <button className="checkout-btn">Checkout</button>
          </div>
        </aside>
      </div>

      {/* Info blocks (below the cart) */}
      <div className="cart-info">
        <div className="info-item">
          <img src="/images/icons/lock.png" alt="Secure payment" />
          <div className="info-text">
            <h4>Secure payment</h4>
            <p>Have you ever finally just</p>
          </div>
        </div>
        <div className="info-item">
          <img src="/images/icons/message.png" alt="Customer support" />
          <div className="info-text">
            <h4>Customer support</h4>
            <p>Have you ever finally just</p>
          </div>
        </div>
        <div className="info-item">
          <img src="/images/icons/truck.png" alt="Free delivery" />
          <div className="info-text">
            <h4>Free delivery</h4>
            <p>Have you ever finally just</p>
          </div>
        </div>
      </div>

      {/* Saved for later section */}
      <div className="saved-for-later">
        <h2 className="saved-title">Saved for later</h2>
        <div className="saved-grid">
          {/* Sample item #1 */}
          <div className="saved-card">
            <img
              src="/images/products/tablet.png"
              alt="Tablet"
              className="saved-img"
            />
            <p className="saved-price">$99.50</p>
            <p className="saved-name">GoPro HERO6 4K Action Camera – Black</p>
            <button className="saved-move-btn">Move to cart</button>
          </div>

          {/* Sample item #2 */}
          <div className="saved-card">
            <img
              src="/images/products/phone.png"
              alt="Phone"
              className="saved-img"
            />
            <p className="saved-price">$99.50</p>
            <p className="saved-name">GoPro HERO6 4K Action Camera – Black</p>
            <button className="saved-move-btn">Move to cart</button>
          </div>

          {/* Sample item #3 */}
          <div className="saved-card">
            <img
              src="/images/products/watch.png"
              alt="Watch"
              className="saved-img"
            />
            <p className="saved-price">$99.50</p>
            <p className="saved-name">GoPro HERO6 4K Action Camera – Black</p>
            <button className="saved-move-btn">Move to cart</button>
          </div>

          {/* Sample item #4 */}
          <div className="saved-card">
            <img
              src="/images/products/laptop.png"
              alt="Laptop"
              className="saved-img"
            />
            <p className="saved-price">$99.50</p>
            <p className="saved-name">GoPro HERO6 4K Action Camera – Black</p>
            <button className="saved-move-btn">Move to cart</button>
          </div>
        </div>
      </div>

      {/* Blue banner section */}
      <div className="blue-banner">
        <div className="banner-text">
          <h3>Super discount on more than 100 USD</h3>
          <p>Have you ever finally just write dummy info</p>
        </div>
        <button className="banner-yellow-btn">
          <img src="/images/yellow-button.png" alt="Shop now" />
        </button>
      </div>

      {/* ---- STYLES ---- */}
      <style jsx>{`
        /* Root reset (optional) */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .cart-page-container {
          width: 100%;
          min-height: 100vh;
          background: #f7fafc;
          font-family: "Inter", sans-serif;
          padding: 40px 0;
        }

        .cart-page-title {
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          color: #1c1c1c;
          margin-left: 40px; /* ensures it starts from the same left as cart */
          margin-bottom: 20px;
        }

        .cart-main {
          display: flex;
          gap: 20px;
          padding: 0 40px; /* horizontal padding = 40px, matches figma spacing */
        }

        /* Left side (items) */
        .cart-items-section {
          flex: 1;
          background: #fff;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          padding: 20px;
        }

        .cart-item {
          display: flex;
          gap: 16px;
          border-bottom: 1px solid #dee2e7;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        .cart-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .cart-item-img img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
          background: #f7f7f7;
        }

        .cart-item-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .cart-item-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .cart-item-title {
          font-size: 16px;
          font-weight: 500;
          color: #1c1c1c;
          margin-bottom: 4px;
        }

        .cart-item-subtitle {
          font-size: 14px;
          color: #8b96a5;
        }

        .cart-item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .cart-item-price {
          font-size: 16px;
          font-weight: 500;
          color: #1c1c1c;
        }

        .qty-box {
          position: relative;
          display: flex;
          align-items: center;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          height: 36px;
          padding: 0 10px;
          font-size: 14px;
          color: #1c1c1c;
        }
        .qty-label {
          margin-right: 4px;
          font-weight: 400;
          color: #1c1c1c;
        }
        .qty-box select {
          border: none;
          outline: none;
          background: transparent;
          appearance: none;
          font-size: 14px;
          color: #1c1c1c;
          cursor: pointer;
          padding-right: 16px;
        }
        .qty-box::after {
          content: "";
          position: absolute;
          right: 8px;
          width: 8px;
          height: 8px;
          border-right: 1px solid #8b96a5;
          border-bottom: 1px solid #8b96a5;
          transform: rotate(45deg);
          pointer-events: none;
        }

        .cart-item-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }
        .cart-remove-btn,
        .cart-save-btn {
          padding: 4px 10px;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          background: #ffffff;
          font-size: 13px;
          line-height: 16px;
          cursor: pointer;
          font-weight: 500;
        }
        .cart-remove-btn {
          color: #fa3434;
        }
        .cart-save-btn {
          color: #0d6efd;
        }

        .cart-bottom-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .back-to-shop-btn {
          background: linear-gradient(180deg, #127fff 0%, #0067ff 100%);
          border-radius: 6px;
          color: #fff;
          padding: 10px 20px;
          border: none;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
        }
        .arrow-left {
          margin-right: 5px;
        }
        .remove-all-btn {
          border: 1px solid #dee2e7;
          background: #ffffff;
          border-radius: 6px;
          padding: 0 16px;
          font-size: 16px;
          color: #0d6efd;
          cursor: pointer;
        }

        /* Right side (coupon + summary) */
        .cart-aside {
          width: 280px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cart-coupon-box {
          background: #fff;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          padding: 16px;
        }
        .cart-coupon-label {
          font-size: 16px;
          color: #505050;
          margin-bottom: 8px;
          font-weight: 400;
        }
        .coupon-box {
          display: flex;
          align-items: center;
          height: 40px;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid #dee2e7;
        }
        .coupon-box input {
          flex: 1;
          border: none;
          outline: none;
          padding: 0 12px;
          font-size: 14px;
          color: #8b96a5;
          background: #fff;
        }
        .coupon-divider {
          width: 1px;
          height: 100%;
          background: #dee2e7;
        }
        .coupon-box button {
          border: none;
          background: #fff;
          color: #0d6efd;
          font-size: 16px;
          font-weight: 500;
          padding: 0 12px;
          cursor: pointer;
        }

        .cart-summary {
          background: #fff;
          border: 1px solid #dee2e7;
          box-shadow: 0px 4px 10px rgba(56, 56, 56, 0.1);
          border-radius: 6px;
          padding: 16px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 16px;
          color: #505050;
        }
        .summary-row span:last-child {
          min-width: 60px;
          text-align: right;
        }
        .discount {
          color: #fa3434;
        }
        .tax {
          color: #00b517;
        }
        .cart-summary hr {
          margin: 16px 0;
          border: none;
          border-top: 1px solid #e4e4e4;
        }
        .summary-total {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          margin-bottom: 16px;
          font-size: 18px;
          color: #1c1c1c;
        }
        .checkout-btn {
          width: 100%;
          height: 54px;
          background: #00b517;
          color: #fff;
          font-size: 18px;
          font-weight: 500;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .cart-info {
          display: flex;
          justify-content: flex-start;
          gap: 80px;
          margin-top: 40px;
          padding: 0 40px; /* matches horizontal spacing of the cart */
        }
        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .info-item img {
          width: 40px;
          height: 40px;
        }
        .info-text h4 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 500;
          color: #1c1c1c;
        }
        .info-text p {
          margin: 0;
          font-size: 14px;
          color: #8b96a5;
        }

        /* SAVED FOR LATER SECTION */
        .saved-for-later {
          margin: 40px 40px 0; /* same left spacing as .cart-main */
          background: #fff; /* container background */
          border: 1px solid #dee2e7; /* container border */
          border-radius: 6px; /* container border-radius */
          padding: 20px;
        }
        .saved-title {
          font-size: 20px;
          font-weight: 600;
          color: #1c1c1c;
          margin-bottom: 20px;
          text-align: left; /* left-aligned heading */
        }
        .saved-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* exactly 4 items per row */
          gap: 24px;
        }
        /* Product cards: no bounding box for a cleaner look */
        .saved-card {
          background: none; /* remove card background */
          border: none;     /* remove card border */
          text-align: left;
        }
        .saved-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 6px;
          margin-bottom: 8px;
        }
        .saved-price {
          font-size: 16px;
          font-weight: 600;
          color: #1c1c1c;
          margin-bottom: 4px;
        }
        .saved-name {
          font-size: 14px;
          color: #8b96a5;
          margin-bottom: 8px;
        }
        .saved-move-btn {
          border: 1px solid #dee2e7;
          background: #fff;
          border-radius: 6px;
          padding: 6px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #0d6efd;
          cursor: pointer;
        }

        /* BLUE BANNER SECTION */
        .blue-banner {
          width: auto;
          margin: 40px 40px;
          background-color: #127fff;
          border-radius: 6px;
          padding: 20px;
          display: flex;
          align-items: center;
          color: #fff;
        }
        .banner-text {
          text-align: left;
        }
        .banner-text h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .banner-text p {
          font-size: 16px;
          color: #f0f0f0;
        }
        .banner-yellow-btn {
          margin-left: auto;
          background: none;
          border: none;
          cursor: pointer;
        }
        .banner-yellow-btn img {
          display: block;
          width: 100px; /* adjust as needed */
          height: auto;
        }
      `}</style>
    </main>
  );
}