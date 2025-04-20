"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Description from "@/components/Description";

interface Product {
  _id: string;
  name: string;
  image: string;
  images: string[];
  price: number;
  description: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  sold: number;
}

const supplier = {
  name: "Guanji Trading LLC",
  location: "Germany, Berlin",
  verified: true,
  shipping: "Worldwide shipping",
};

const staticPrices = [
  { price: 0, range: "50-100 pcs" },
  { price: 90, range: "100-700 pcs" },
  { price: 78, range: "700+ pcs" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/shop/product/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const res = await fetch(`/api/shop/wishlist/${userId}`);
        const data = await res.json();
  
        const items = data?.wishlist?.items;
  
        if (Array.isArray(items)) {
          const isInWishlist = items.some(
            (item: any) => item.productId._id === product?._id
          );
          setSaved(isInWishlist);
        } else {
          console.warn("Wishlist items is not an array:", items);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };
  
    if (userId && product?._id) {
      checkWishlist();
    }
  }, [userId, product]);
  

  const handleSaveForLater = async () => {
    if (!userId || !product?._id || saving || saved) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/shop/wishlist/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });

      const data = await res.json();
      if (data?.wishlist || res.ok) {
        setSaved(true);
      } else {
        throw new Error("Failed to save item");
      }
    } catch (err) {
      console.error("Failed to save for later:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading product</p>;

  const mainImage = product?.images?.[0] || "/images/placeholder.png";

  return (
    <div className="w-full bg-[#f7fafc] min-h-screen justify-center p-6 font-['Inter']">
      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg">
        <div className="grid grid-cols-12 gap-6">
          {/* Left - Images */}
          <div className="col-span-4">
            <div className="border border-gray-200 rounded-lg p-2">
              <Image
                src={mainImage}
                alt={product?.name || "Product Image"}
                width={400}
                height={400}
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-1">
                  <Image
                    src={mainImage}
                    alt={`Thumbnail ${i + 1}`}
                    width={60}
                    height={60}
                    className="cursor-pointer rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Middle - Product Info */}
          <div className="col-span-5">
            <div className={`flex items-center gap-2 font-medium ${product?.inStock ? "text-green-600" : "text-red-600"}`}>
              <Image
                src={product?.inStock ? "/images/icons/tick.png" : "/images/icons/cross.png"}
                alt="Stock"
                width={16}
                height={16}
              />
              {product?.inStock ? "In Stock" : "Out of Stock"}
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mt-2">{product?.name || "Product Name"}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-1">
              {[...Array(4)].map((_, i) => (
                <Image key={i} src="/images/icons/3.png" alt="Star" width={16} height={16} />
              ))}
              <Image src="/images/icons/5.png" alt="Gray Star" width={16} height={16} />
              <span className="text-orange-500 font-medium">{product?.rating?.toFixed(1) || "9.3"}</span>
              <span className="text-gray-500">({product?.reviews || 32} reviews)</span>
              <span className="text-gray-500">• {product?.sold || 154} sold</span>
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Price Tiers */}
            <div className="flex bg-[#FFF0DF] p-3">
              {staticPrices.map((tier, index) => (
                <div key={index} className={`flex-1 text-center ${index !== 0 ? "border-l border-gray-300" : ""}`}>
                  <p className={`text-lg font-semibold ${index === 0 ? "text-red-600" : "text-gray-900"}`}>
                    ${index === 0 ? product?.price?.toFixed(2) : tier.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-sm">{tier.range}</p>
                </div>
              ))}
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Specifications */}
            <div className="space-y-2 text-gray-700">
              <p><strong>Price:</strong> Negotiable</p>
              <p><strong>Type:</strong> Classic shoes</p>
              <p><strong>Material:</strong> Plastic material</p>
              <p><strong>Design:</strong> Modern nice</p>
              <p><strong>Customization:</strong> Customized logo and design custom packages</p>
              <p><strong>Protection:</strong> Refund Policy</p>
              <p><strong>Warranty:</strong> 2 years full warranty</p>
            </div>
          </div>

          {/* Right - Supplier + Wishlist */}
          <div className="col-span-3 flex flex-col">
            <div className="border border-gray-200 p-4 rounded-lg bg-white">
              <div className="flex items-center gap-3">
                <Image src="/images/img.jpg" alt="Supplier" width={40} height={40} />
                <div>
                  <p className="text-gray-800 font-semibold">{supplier.name}</p>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    <Image src="/images/germany.png" alt="Flag" width={16} height={16} />
                    {supplier.location}
                  </p>
                </div>
              </div>

              <hr className="my-3 border-gray-300" />

              <div className="text-sm text-gray-500">
                {supplier.verified && (
                  <p className="flex items-center gap-1">
                    <Image src="/images/icons/verified.png" alt="Verified" width={16} height={16} />
                    Verified Seller
                  </p>
                )}
                <p className="flex items-center gap-1">
                  <Image src="/images/icons/global.png" alt="Shipping" width={16} height={16} />
                  {supplier.shipping}
                </p>
              </div>

              <hr className="my-3 border-gray-300" />

              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Send Inquiry
              </button>
              <button className="w-full mt-2 text-blue-600 border border-blue-600 py-2 rounded-md hover:bg-blue-100 transition">
                Seller&apos;s Profile
              </button>
            </div>

            <button
              className={`mt-4 text-sm flex items-center justify-center gap-2 py-2 rounded-md transition ${
                saved ? "text-green-600" : "text-gray-600"
              } disabled:opacity-100`}
              onClick={handleSaveForLater}
              disabled={saving || saved}
            >
              <Image
                src={saved ? "/images/icons/heart-filled.png" : "/images/icons/heart.png"}
                alt="Save"
                width={18}
                height={18}
              />
              {saved ? "Saved to wishlist" : saving ? "Saving..." : "Save for later"}
            </button>
          </div>
        </div>
      </div>

      <Description />
    </div>
  );
}
