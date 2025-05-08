"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Sidebar = ({
  isOpen,
  cart,
  onClose,
  onPlaceOrder,
}: {
  isOpen: boolean;
  cart: any[];
  onClose: () => void;
  onPlaceOrder: (shippingAddress: string) => void;
}) => {
  const [shippingAddress, setShippingAddress] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    if (shippingAddress.trim() === "") {
      alert("Please enter a shipping address.");
      return;
    }

    localStorage.setItem("shippingAddress", shippingAddress);
    onPlaceOrder(shippingAddress);
    router.push("/payment");
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = 60.0; // Hardcoded discount
  const tax = 14.0; // Hardcoded tax
  const total = totalPrice - discount + tax;

  return (
    <div className="fixed inset-0 bg-gray-600/30 z-50 flex justify-end">
      <div className="w-96 bg-white p-6 transform transition-transform duration-300 ease-in-out max-h-full overflow-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-600"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        <ul className="divide-y divide-gray-200 mb-6">
          {cart.map((item: any) => (
            <li key={item._id} className="py-2 flex justify-between">
              <p className="text-sm text-gray-700">
                {item.name} x {item.quantity}
              </p>
              <p className="text-sm text-gray-900 font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-300 pt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between mb-2">
            <span>Total price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount:</span>
            <span className="text-green-600">- ${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span className="text-yellow-600">+ ${tax.toFixed(2)}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Shipping Address</label>
          <textarea
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter your shipping address"
            className="w-full p-3 border border-gray-300 rounded-lg resize-y"
          />
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Sidebar;