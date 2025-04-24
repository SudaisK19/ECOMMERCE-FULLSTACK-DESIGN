"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Sidebarlisting from "@/components/sidebarlisting";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

interface Category {
  _id: string;
  name: string;
}

export default function ProductListingPage() {
  const { catID } = useParams();
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories] = useState<Category[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]); // Store wishlist items as product IDs
  const [saving, setSaving] = useState(false);

  const handleGridClick = () => setViewMode("grid");
  const handleListClick = () => setViewMode("list");

  // Fetch user info (user ID)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();
        setUserId(data.user._id);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch products for the category
  useEffect(() => {
    if (!catID) return;
    fetch(`/api/shop/product-list/${catID}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, [catID]);

  // Fetch the user's wishlist and set only product IDs in state
  useEffect(() => {
    if (!userId) return;
    fetch(`/api/shop/wishlist/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.wishlist?.items) {
          // Extract product IDs from the wishlist items
          const wishlistItems = data.wishlist.items.map((item: any) => item.productId._id);
          setWishlist(wishlistItems); // Store product IDs in state
        }
      })
      .catch((err) => console.error("Error fetching wishlist:", err));
  }, [userId]);

  const currentCategory = categories.find((cat) => cat._id === catID);

  // Handle "Save for Later" action
  const handleSaveForLater = async (productId: string) => {
    if (saving) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/shop/wishlist/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (res.ok) {
        // Update wishlist in state (add product ID)
        setWishlist((prev) => [...prev, productId]);
      } else {
        throw new Error("Failed to save item");
      }
    } catch (err) {
      console.error("Failed to save for later:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex mx-auto p-4 max-w-[1400px]">
      <Sidebarlisting />

      <main className="flex-1 relative">
        <div className="bg-white border border-[#dee2e7] rounded-md mb-4 p-4 font-sans">
          <div className="flex items-center justify-between">
            <p className="text-gray-800">
              {products.length} items in category:{" "}
              <span className="font-medium">
                {currentCategory ? currentCategory.name : catID}
              </span>
            </p>
            <div className="flex items-center gap-4">
              <button
                className={`w-10 h-10 flex items-center justify-center rounded ${
                  viewMode === "grid" ? "bg-[#eff2f4]" : ""
                }`}
                onClick={handleGridClick}
                aria-label="Grid view"
              >
                <Image
                  src="/images/grid-button.png"
                  alt="Grid"
                  width={20}
                  height={20}
                />
              </button>
              <button
                className={`w-10 h-10 flex items-center justify-center rounded ${
                  viewMode === "list" ? "bg-[#eff2f4]" : ""
                }`}
                onClick={handleListClick}
                aria-label="List view"
              >
                <Image
                  src="/images/list-button.png"
                  alt="List"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${
            viewMode === "grid"
              ? "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "flex flex-col gap-4"
          } px-4`}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className={`relative bg-white shadow-md rounded-lg p-4 transition-all hover:shadow-xl ${
                  viewMode === "list" ? "flex items-center gap-4" : ""
                }`}
              >
                <button
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition-transform"
                  onClick={() => handleSaveForLater(product._id)} // Pass product ID here
                  disabled={saving} // Disable while saving
                >
                  <Image
                    src={
                      wishlist.includes(product._id)
                        ? "/images/icons/heart-filled.png"
                        : "/images/wishlist-button.png"
                    }
                    alt="Wishlist"
                    width={20}
                    height={20}
                  />
                </button>

                <div
                  className={`${
                    viewMode === "list"
                      ? "w-[100px] h-[100px] flex-shrink-0"
                      : "w-full flex justify-center"
                  }`}
                >
                  <Image
                    src={
                      product.images?.length > 0
                        ? product.images[0]
                        : "/images/default-product.png"
                    }
                    alt={product.name}
                    width={viewMode === "list" ? 100 : 200}
                    height={viewMode === "list" ? 100 : 200}
                    className="rounded-lg object-cover"
                  />
                </div>

                <div
                  className={`${
                    viewMode === "list" ? "flex flex-col" : "text-center mt-3"
                  } flex-1`}
                >
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {product.name}
                  </h3>
                  <div className="text-blue-600 font-bold text-lg">
                    ${product.price}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{product.description}</p>

                  <Link href={`/product-detail/${product._id}`} passHref>
                    <span className="text-blue-500 hover:underline cursor-pointer text-sm mt-2 inline-block">
                      View details
                    </span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found for this category.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}