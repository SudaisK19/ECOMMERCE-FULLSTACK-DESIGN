"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DummyPaymentPage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedAddress = localStorage.getItem("shippingAddress");

    if (storedUserId) setUserId(storedUserId);
    if (storedAddress) setShippingAddress(storedAddress);
  }, []);

  const handleConfirmOrder = async () => {
    if (!userId || !shippingAddress) {
      alert("Missing user information. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/shop/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          shippingAddress,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear cart
        localStorage.removeItem(`cart-${userId}`);
        // Set orderPlaced to true to show success message and hide the confirm button
        setOrderPlaced(true);
      } else {
        alert("Failed to place order: " + data.error);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          {orderPlaced ? "Order Placed Successfully!" : "Confirm Your Order"}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {orderPlaced
            ? "Thank you for your purchase. Your order has been successfully placed."
            : "Please review your order details and confirm the payment."}
        </p>

        {!orderPlaced && (
          <button
            onClick={handleConfirmOrder}
            disabled={loading}
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>
        )}

        <button
          onClick={() => router.push("/")}
          className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default DummyPaymentPage;
