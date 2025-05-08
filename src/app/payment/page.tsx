"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CODPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const address = localStorage.getItem("shippingAddress");
    const cartData = localStorage.getItem(`cart-${userId}`);

    if (address) setShippingAddress(address);
    if (cartData) setCart(JSON.parse(cartData));

    fetch("/api/auth/profile")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const handleConfirmOrder = async () => {
    if (!user?._id || !shippingAddress || cart.length === 0) {
      alert("Missing information. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/shop/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          shippingAddress,
          cart,
          paymentMethod: "Cash on Delivery",
          status: "Pending",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem(`cart-${user._id}`);
        setOrderPlaced(true);
      } else {
        alert("Failed to place order: " + data.error);
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = 60.0;
  const tax = 14.0;
  const total = totalPrice - discount + tax;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          {orderPlaced ? "Order Placed!" : "Review & Confirm Your Order"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {orderPlaced
            ? "Thank you! Your order has been successfully placed."
            : "Please review your items and confirm your order."}
        </p>

        {/* Order Summary */}
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <ul className="divide-y divide-gray-200 mb-6">
          {cart.map((item: any) => (
            <li key={item._id} className="py-4 flex items-center gap-4">
              <img
                src={item.images?.[0] || "/placeholder.jpg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                Rs {(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        {/* Price Breakdown */}
        <div className="border-t border-gray-300 pt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Total price:</span>
            <span>Rs {totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span className="text-green-600">- Rs {discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span className="text-yellow-600">+ Rs {tax.toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total:</span>
            <span>Rs {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Customer Info</h3>
          <div className="text-sm space-y-2 text-gray-700">
            <p><strong>Name:</strong> {user?.name || "N/A"}</p>
            <p><strong>Email:</strong> {user?.email || "N/A"}</p>
            {user?.phone && <p><strong>Phone:</strong> {user.phone}</p>}
            <p><strong>Shipping Address:</strong> {shippingAddress}</p>
          </div>
        </div>

        {/* Confirm Button */}
        {!orderPlaced && (
          <button
            onClick={handleConfirmOrder}
            disabled={loading}
            className="w-full mt-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>
        )}

        <button
          onClick={() => router.push("/")}
          className="w-full mt-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default CODPage;
