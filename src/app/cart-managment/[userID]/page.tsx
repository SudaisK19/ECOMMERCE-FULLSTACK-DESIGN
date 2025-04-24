"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/components/sidebar"; // Import Sidebar

// Type definitions...
interface ProductDetails {
  _id: string;
  name?: string;
  price?: number;
  stock?: number;
  images?: string[];
}

// Type definition for cart items
interface CartItem {
  _id: string;
  productId: string;
  name?: string;
  price?: number;
  stock?: number;
  quantity: number;
  images?: string[];
}

export default function CartPage() {
  const router = useRouter();
  const { userID } = useParams(); // dynamic route parameter
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<ProductDetails[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<string>("");

  // Fetch user profile from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();
        setUserId(data.user._id);
        localStorage.setItem("userId", data.user._id);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUser();
  }, []);

  // Helper: transform items to have top-level name, price, stock, images, and productId as string.
  const transformItem = (item: any): CartItem => ({
    _id: item._id,
    name: item.productId?.name,
    price: item.productId?.price,
    stock: item.productId?.stock,
    images: item.productId?.images,
    productId: typeof item.productId === "string" ? item.productId : item.productId._id,
    quantity: item.quantity,
  });

  // 1. Load cart on mount (from local storage and server)
  useEffect(() => {
    if (!userID) return;

    const localCart = localStorage.getItem(`cart-${userID}`);
    if (localCart) {
      setCartItems(JSON.parse(localCart));
    }

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

  // Fetch saved items
  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const response = await fetch(`/api/shop/wishlist/${userID}`);
        const data = await response.json();
        const wishlistItems = data.wishlist?.items || [];

        const savedProducts: ProductDetails[] = wishlistItems.map((item: any) => ({
          _id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          stock: item.productId.stock,
          images: item.productId.images,
        }));

        setSavedItems(savedProducts);
      } catch (error) {
        console.error("Error fetching saved items:", error);
      }
    };

    if (userID) {
      fetchSavedItems();
    }
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

  const handleSaveForLater = async (itemId: string) => {
    const item = cartItems.find((i) => i._id === itemId);
    if (!item) return;

    try {
      // 1. Add product to wishlist
      await fetch(`/api/shop/wishlist/${userID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: item.productId }),
      });

      // 2. Remove product from cart
      const updatedCart = cartItems.filter((i) => i._id !== itemId);
      setCartItems(updatedCart);
      updateCartOnServer(updatedCart);

      // 3. Refetch wishlist and update saved items
      const res = await fetch(`/api/shop/wishlist/${userID}`);
      const data = await res.json();
      const wishlistItems = data.wishlist?.items || [];

      const updatedSavedItems: ProductDetails[] = wishlistItems.map((item: any) => ({
        _id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        stock: item.productId.stock,
        images: item.productId.images,
      }));

      setSavedItems(updatedSavedItems);
    } catch (err) {
      console.error("Failed to save item for later:", err);
    }
  };

  const handleMoveToCart = async (productId: string) => {
    try {
      // Step 1: Remove from wishlist
      const deleteRes = await fetch(`/api/shop/wishlist/${userID}?productId=${productId}`, {
        method: "DELETE",
      });

      if (!deleteRes.ok) {
        throw new Error("Failed to remove item from wishlist");
      }

      // Step 2: Add to cart
      const addToCartRes = await fetch(`/api/shop/cart/${userID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),  // Ensure you're passing the correct data
      });

      if (!addToCartRes.ok) {
        throw new Error("Failed to add item to cart");
      }

      // Step 3: Refetch updated data
      const [cartRes, wishlistRes] = await Promise.all([
        fetch(`/api/shop/cart/${userID}`),
        fetch(`/api/shop/wishlist/${userID}`),
      ]);

      const cartData = await cartRes.json();
      const wishlistData = await wishlistRes.json();

      setCartItems(cartData.cart?.items || []);

      const updatedSavedItems: ProductDetails[] =
        wishlistData.wishlist?.items?.map((item: any) => ({
          _id: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          stock: item.productId.stock,
          images: item.productId.images,
        })) || [];

      setSavedItems(updatedSavedItems);
    } catch (err) {
      console.error("Failed to move item to cart:", err);
    }
  };

  // 10. Redirect back to shopping (home page)
  const handleBackToShopping = () => {
    router.push("/");
  };

  // Handle opening sidebar
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Handle place order
  const handlePlaceOrder = () => {
    console.log("Placing order...");
    router.push("/payment"); // Redirect to payment page (without shipping address)
  };

  return (
    <main className="w-full min-h-screen bg-gray-100 font-sans py-10">
      <h1 className="text-2xl font-semibold text-gray-900 ml-10 mb-5">
        My cart ({cartItems.length})
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 px-10">
        {/* LEFT SIDE: CART ITEMS */}
        <section className="flex-1 bg-white border border-gray-300 rounded-md p-5">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 border-b border-gray-300 pb-5 mb-5 last:border-b-0">
                <div className="w-20 h-20 relative">
                  <Image
                    src={item.images && item.images.length > 0 ? item.images[0] : "/images/sample-shirt.png"}
                    alt={item.name || "Item"}
                    width={80}
                    height={80}
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-1">{item.name || "T-shirt"}</h3>
                      <p className="text-sm text-gray-500">
                        Price: ${item.price?.toFixed(2)} — Stock: {item.stock ?? 0}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-base font-medium text-gray-900">${(item.price ?? 0).toFixed(2)}</div>
                      <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 text-sm">
                        <label className="mr-2">Qty:</label>
                        <select
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                          className="outline-none bg-transparent"
                        >
                          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-2 text-sm">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </button>
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleSaveForLater(item._id)}
                    >
                      Save for later
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">Subtotal: ${getSubtotal(item).toFixed(2)}</div>
                </div>
              </div>
            ))
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={handleBackToShopping}
              className="bg-gradient-to-b from-[#127fff] to-[#0067ff] text-white py-2 px-5 rounded-md text-base font-medium flex items-center hover:opacity-90 transition"
            >
              <span className="mr-1">&larr;</span> Back to shop
            </button>
            <button
              onClick={removeAllItems}
              className="border border-[#dee2e7] bg-white text-[#0d6efd] text-base px-4 py-2 rounded-md hover:bg-[#f8f9fa] transition"
            >
              Remove All
            </button>
          </div>
        </section>

        {/* RIGHT SIDE: COUPON + SUMMARY */}
        <aside className="w-full lg:w-80 flex flex-col gap-4">
          <div className="bg-white border border-gray-300 rounded-md p-4">
            <p className="font-medium text-gray-800 mb-2">Have a coupon?</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add coupon"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                Apply
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-md p-4">
            <div className="flex justify-between mb-2">
              <span>Total price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount:</span>
              <span className="text-green-600">- $60.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span className="text-yellow-600">+ $14.00</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total:</span>
              <span>${(totalPrice - 60 + 14).toFixed(2)}</span>
            </div>

            <button
              onClick={openSidebar}
              disabled={cartItems.length === 0}
              className={`w-full mt-4 text-white py-2 rounded-md  text-sm ${
                cartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Checkout
            </button>
          </div>
        </aside>
      </div>

      {/* Sidebar component for Checkout */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        cart={cartItems}
        onPlaceOrder={handlePlaceOrder} // Now no need to pass shippingAddress here
      />
    </main>
  );
}
