// app/[id]/page.tsx  (or wherever your route)
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Description from "@/components/Description";

interface Product {
  _id: string;
  name: string;
  images: string[];
  price: number;
  description: string;
  inStock: boolean;
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

  // only aggregate stats here
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  // 1) fetch logged-in user
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/profile");
        if (!res.ok) throw new Error();
        const { user } = await res.json();
        setUserId(user._id);
      } catch {
        // silent if not logged in
      }
    })();
  }, []);

  // 2) fetch the product itself
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/shop/product/${id}`);
        const data = await res.json();
        if (!data.success) {
          setError(true);
        } else {
          setProduct(data.product);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // 3) fetch just the stats (avg & count) in its own effect
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/shop/review/${id}`);
        const data = await res.json();
        if (data.success) {
          setAvgRating(data.avgRating);
          setReviewCount(data.count);
        }
      } catch {
        // ignore stats errors
      }
    })();
  }, [id]);

  // 4) fetch wishlist status
  useEffect(() => {
    if (!userId || !product) return;
    (async () => {
      try {
        const res = await fetch(`/api/shop/wishlist/${userId}`);
        const { wishlist } = await res.json();
        if (Array.isArray(wishlist.items)) {
          setSaved(
            wishlist.items.some(
              (it: any) => it.productId._id === product._id
            )
          );
        }
      } catch {
        // ignore
      }
    })();
  }, [userId, product]);

  const handleSaveForLater = async () => {
    if (!userId || !product || saving || saved) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/shop/wishlist/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });
      if (res.ok) setSaved(true);
    } catch {
      // optionally show error
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center">Loading…</p>;
  if (error || !product)
    return (
      <p className="text-center text-red-500">
        Error loading product
      </p>
    );

  const mainImage = product.images[0] || "/images/placeholder.png";

  return (
    <div className="bg-[#f7fafc] min-h-screen p-6 font-['Inter'] flex justify-center">
      <div className="max-w-7xl w-full bg-white rounded-lg p-6">

        {/* === Top: Images / Info / Supplier+Wishlist === */}
        <div className="grid grid-cols-12 gap-6">
          {/* Images */}
          <div className="col-span-4">
            <div className="border border-gray-200 rounded-lg p-2">
              <Image
                src={mainImage}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-1"
                >
                  <Image
                    src={img}
                    alt={`Thumb ${i + 1}`}
                    width={60}
                    height={60}
                    className="cursor-pointer rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="col-span-5">
            <div
              className={`flex items-center gap-2 font-medium ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              <Image
                src={
                  product.inStock
                    ? "/images/icons/tick.png"
                    : "/images/icons/cross.png"
                }
                alt="Stock"
                width={16}
                height={16}
              />
              {product.inStock ? "In Stock" : "Out of Stock"}
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mt-2">
              {product.name}
            </h1>

            {/* Stars + avgRating + count */}
            <div className="flex items-center gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <Image
                  key={n}
                  src={
                    n <= Math.round(avgRating)
                      ? "/images/icons/3.png"
                      : "/images/icons/5.png"
                  }
                  alt="star"
                  width={16}
                  height={16}
                />
              ))}
              <span className="text-orange-500 font-medium">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-gray-500">
                ({reviewCount} review
                {reviewCount === 1 ? "" : "s"})
              </span>
              <span className="text-gray-500">
                • {product.sold} sold
              </span>
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Price tiers */}
            <div className="flex bg-[#FFF0DF] p-3">
              {staticPrices.map((t, i) => (
                <div
                  key={i}
                  className={`flex-1 text-center ${
                    i !== 0 ? "border-l border-gray-300" : ""
                  }`}
                >
                  <p
                    className={`text-lg font-semibold ${
                      i === 0 ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    ${i === 0
                      ? product.price.toFixed(2)
                      : t.price.toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-sm">{t.range}</p>
                </div>
              ))}
            </div>

            <hr className="my-4 border-gray-300" />

            {/* Specs */}
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Price:</strong> Negotiable
              </p>
              <p>
                <strong>Type:</strong> Classic shoes
              </p>
              <p>
                <strong>Material:</strong> Plastic material
              </p>
              <p>
                <strong>Design:</strong> Modern nice
              </p>
              <p>
                <strong>Customization:</strong> Customized logo and
                packages
              </p>
              <p>
                <strong>Protection:</strong> Refund Policy
              </p>
              <p>
                <strong>Warranty:</strong> 2 years full warranty
              </p>
            </div>
          </div>

          {/* Supplier + Wishlist */}
          <div className="col-span-3 flex flex-col">
            <div className="border border-gray-200 p-4 rounded-lg bg-white mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/img.jpg"
                  alt="Supplier"
                  width={40}
                  height={40}
                />
                <div>
                  <p className="text-gray-800 font-semibold">
                    {supplier.name}
                  </p>
                  <p className="text-gray-600 text-sm flex items-center gap-1">
                    <Image
                      src="/images/germany.png"
                      alt="Flag"
                      width={16}
                      height={16}
                    />
                    {supplier.location}
                  </p>
                </div>
              </div>
              <hr className="my-3 border-gray-300" />
              <div className="text-sm text-gray-500">
                {supplier.verified && (
                  <p className="flex items-center gap-1">
                    <Image
                      src="/images/icons/verified.png"
                      alt="Verified"
                      width={16}
                      height={16}
                    />
                    Verified Seller
                  </p>
                )}
                <p className="flex items-center gap-1">
                  <Image
                    src="/images/icons/global.png"
                    alt="Shipping"
                    width={16}
                    height={16}
                  />
                  {supplier.shipping}
                </p>
              </div>
              <hr className="my-3 border-gray-300" />
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Send Inquiry
              </button>
              <button className="w-full mt-2 text-blue-600 border border-blue-600 py-2 rounded-md hover:bg-blue-100">
                Seller&apos;s Profile
              </button>
            </div>
            <button
              onClick={handleSaveForLater}
              disabled={saving || saved}
              className={`mt-4 text-sm flex items-center justify-center gap-2 py-2 rounded-md ${
                saved ? "text-green-600" : "text-gray-600"
              } disabled:opacity-50`}
            >
              <Image
                src={
                  saved
                    ? "/images/icons/heart-filled.png"
                    : "/images/icons/heart.png"
                }
                alt="Save"
                width={18}
                height={18}
              />
              {saved
                ? "Saved to wishlist"
                : saving
                ? "Saving..."
                : "Save for later"}
            </button>
          </div>
        </div>

        {/* === Delegate all tabs, per-review UI, related products, banner … to Description.tsx === */}
        <Description />
      </div>
    </div>
  );
}
