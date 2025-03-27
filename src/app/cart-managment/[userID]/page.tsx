"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

// Type definition for each cart item.
interface CartItem {
  _id: string;           // The unique cart item ID from MongoDB.
  productId: string;     // The product's ID (populated via server populate).
  name?: string;         // Product name.
  price?: number;        // Product price.
  stock?: number;        // Product stock.
  quantity: number;      // Quantity in the cart.
  images?: string[];     // Array of image URLs from the product.
}

export default function CartPage() {
  const router = useRouter();
  const { userID } = useParams(); // dynamic route parameter
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);

  // Helper: transform items to have top-level name, price, stock, images, and productId as string.
  const transformItem = (item: any) => ({
    ...item,
    name: item.productId?.name,
    price: item.productId?.price,
    stock: item.productId?.stock,
    images: item.productId?.images, // include images from the product
    productId: item.productId?._id ?? item.productId,
  });

  // 1. Load cart on mount (from local storage and server)
  useEffect(() => {
    if (!userID) return;

    // Check local storage for a cached cart
    const localCart = localStorage.getItem(`cart-${userID}`);
    if (localCart) {
      setCartItems(JSON.parse(localCart));
    }

    // Fetch the latest cart data from the server
    fetch(`/api/shop/cart/${userID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cart && data.cart.items) {
          const transformedItems = data.cart.items.map(transformItem);
          setCartItems(transformedItems);
        }
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, [userID]);

  // 2. Save cart changes to local storage whenever the cart changes
  useEffect(() => {
    if (userID) {
      localStorage.setItem(`cart-${userID}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userID]);

  // 3. Calculate the subtotal for a cart item
  const getSubtotal = (item: CartItem) => {
    const price = item.price ?? 0;
    return price * item.quantity;
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + getSubtotal(item), 0);

  // 4. Update the cart on the server (via PUT)
  async function updateCartOnServer(newItems: CartItem[]) {
    try {
      const res = await fetch(`/api/shop/cart/${userID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: newItems }),
      });
      const data = await res.json();
      if (res.ok && data.cart) {
        const transformedItems = data.cart.items.map(transformItem);
        setCartItems(transformedItems);
      } else {
        console.error("Error updating cart:", data.error);
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  }

  // 5. Remove a single item from the cart (via DELETE with itemId)
  async function removeItem(itemId: string) {
    try {
      const res = await fetch(`/api/shop/cart/${userID}?itemId=${itemId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.cart) {
        const transformedItems = data.cart.items.map(transformItem);
        setCartItems(transformedItems);
      } else {
        console.error("Error removing item:", data.error);
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  }

  // 6. Remove all items from the cart (via DELETE without itemId)
  async function removeAllItems() {
    try {
      const res = await fetch(`/api/shop/cart/${userID}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setCartItems([]);
      } else {
        console.error("Error removing all items:", data.error);
      }
    } catch (err) {
      console.error("Error removing all items:", err);
    }
  }

  // 7. Handle quantity changes for an item
  const handleQuantityChange = (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);
    updateCartOnServer(updated);
  };

  // 8. Save an item for later: remove from cart and add to savedItems (client side)
  const handleSaveForLater = (itemId: string) => {
    const itemToSave = cartItems.find((it) => it._id === itemId);
    if (!itemToSave) return;
    const newCart = cartItems.filter((it) => it._id !== itemId);
    setCartItems(newCart);
    setSavedItems((prev) => [...prev, itemToSave]);
    updateCartOnServer(newCart);
  };

  // 9. Move an item from saved-for-later back to the cart
  const handleMoveToCart = (itemId: string) => {
    const itemToMove = savedItems.find((it) => it._id === itemId);
    if (!itemToMove) return;
    const newSaved = savedItems.filter((it) => it._id !== itemId);
    setSavedItems(newSaved);
    const newCart = [...cartItems, itemToMove];
    setCartItems(newCart);
    updateCartOnServer(newCart);
  };

  // 10. Redirect back to shopping (home page)
  const handleBackToShopping = () => {
    router.push("/");
  };

  return (
    <main className="cart-page-container">
      <h1 className="cart-page-title">My cart ({cartItems.length})</h1>

      <div className="cart-main">
        {/* LEFT SIDE: CART ITEMS */}
        <section className="cart-items-section">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-img">
                  {/* Use product image from the DB if available, otherwise fallback */}
                  <Image
                    src={
                      item.images && item.images.length > 0
                        ? item.images[0]
                        : "/images/sample-shirt.png"
                    }
                    alt={item.name || "Item"}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="cart-item-content">
                  <div className="cart-item-top">
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">
                        {item.name || "T-shirt"}
                      </h3>
                      <p className="cart-item-subtitle">
                        Price: ${item.price?.toFixed(2)} — Stock: {item.stock ?? 0}
                      </p>
                    </div>
                    <div className="cart-item-right">
                      <div className="cart-item-price">
                        ${(item.price ?? 0).toFixed(2)}
                      </div>
                      <div className="qty-box">
                        <label className="qty-label">Qty:</label>
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item._id,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {Array.from({ length: 20 }, (_, i) => i + 1).map(
                            (num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="cart-save-btn"
                      onClick={() => handleSaveForLater(item._id)}
                    >
                      Save for later
                    </button>
                  </div>
                  <div style={{ marginTop: "8px", fontSize: "14px" }}>
                    Subtotal: ${getSubtotal(item).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="cart-bottom-buttons">
            <button className="back-to-shop-btn" onClick={handleBackToShopping}>
              <span className="arrow-left">&larr;</span> Back to shop
            </button>
            <button className="remove-all-btn" onClick={removeAllItems}>
              Remove All
            </button>
          </div>
        </section>

        {/* RIGHT SIDE: COUPON + SUMMARY */}
        <aside className="cart-aside">
          <div className="cart-coupon-box">
            <p className="cart-coupon-label">Have a coupon?</p>
            <div className="coupon-box">
              <input type="text" placeholder="Add coupon" />
              <button>Apply</button>
            </div>
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Total price:</span>
              <span>${totalPrice.toFixed(2)}</span>
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
              <span className="final-price">
                ${(totalPrice - 60 + 14).toFixed(2)}
              </span>
            </div>
            <button className="checkout-btn">Checkout</button>
          </div>
        </aside>
      </div>

      {/* SAVED FOR LATER SECTION */}
      <div className="saved-for-later">
        <h2 className="saved-title">Saved for later</h2>
        {savedItems.length === 0 ? (
          <p>No items saved for later.</p>
        ) : (
          <div className="saved-grid">
            {savedItems.map((item) => (
              <div key={item._id} className="saved-card">
                <Image
                  src={
                    item.images && item.images.length > 0
                      ? item.images[0]
                      : "/images/products/tablet.png"
                  }
                  alt={item.name || "Saved Item"}
                  width={80}
                  height={80}
                  className="saved-img"
                />
                <p className="saved-price">${(item.price ?? 0).toFixed(2)}</p>
                <p className="saved-name">{item.name || "Saved Item"}</p>
                <button
                  className="saved-move-btn"
                  onClick={() => handleMoveToCart(item._id)}
                >
                  Move to cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BLUE BANNER SECTION */}
      <div className="blue-banner">
        <div className="banner-text">
          <h3>Super discount on more than 100 USD</h3>
          <p>Have you ever finally just write dummy info</p>
        </div>
        <button className="banner-yellow-btn">
          <Image
            src="/images/yellow-button.png"
            alt="Shop now"
            width={100}
            height={100}
          />
        </button>
      </div>

      {/* STYLES */}
      <style jsx>{`
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
          margin-left: 40px;
          margin-bottom: 20px;
        }

        .cart-main {
          display: flex;
          gap: 20px;
          padding: 0 40px;
        }

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

        .cart-item-img {
          position: relative;
          width: 80px;
          height: 80px;
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
        }.coupon-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;   /* So height includes border */
  height: 40px;
  border-radius: 6px;
  border: 1px solid #dee2e7;
  /* overflow: hidden;        <-- Remove if it cuts off text */
}

.coupon-box input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0 0px;
  font-size: 14px;
  color: #8b96a5;
  background: #fff;
  box-sizing: border-box;
}

.coupon-box button {
  margin: 0;
  border: none;
  outline: none;
  background: #0d6efd;      /* Example: blue background */
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;           /* Ensures text is vertically centered */
  padding: 0 0px;           /* Adjust horizontal space */
  cursor: pointer;
  height: 100%;             /* Match parent's height */
   /* Visual separator */
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;   /* So height includes border/padding */
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
          padding: 0 40px;
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

        .saved-for-later {
          margin: 40px 40px 0;
          background: #fff;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          padding: 20px;
        }
        .saved-title {
          font-size: 20px;
          font-weight: 600;
          color: #1c1c1c;
          margin-bottom: 20px;
          text-align: left;
        }
        .saved-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .saved-card {
          background: none;
          border: none;
          text-align: left;
        }
        .saved-img {
          position: relative;
          width: 80px;
          height: 80px;
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
          width: 100px;
          height: auto;
        }
      `}</style>
    </main>
  );
}
