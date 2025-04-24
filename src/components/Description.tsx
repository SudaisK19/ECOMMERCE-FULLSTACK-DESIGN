"use client";

import { useEffect, useState, FormEvent } from "react";
import { useParams } from "next/navigation"; // Correctly get `id`
import Image from "next/image";

interface Review {
  _id: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  user: { _id: string; name: string };
}

export default function ProductDetailsStatic() {
  const { id: productId } = useParams();

  // grab the logged-in user ID
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/auth/profile");
        if (!res.ok) throw new Error();
        const { user } = await res.json();
        setUserId(user._id);
      } catch {
        setUserId(null);
      }
    })();
  }, []);

  const [description, setDescription] = useState<string | null>(null);
  const [loadingDesc, setLoadingDesc] = useState(true);
  const [errorDesc, setErrorDesc] = useState<string | null>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "shipping" | "about">("description");

  // Reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newText, setNewText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 1) fetch description
  useEffect(() => {
    if (!productId) return;
    ;(async () => {
      try {
        const res = await fetch(`/api/shop/product/${productId}`);
        const data = await res.json();
        if (data.success) {
          setDescription(data.product.description);
        } else {
          setErrorDesc("Product not found");
        }
      } catch {
        setErrorDesc("Failed to fetch product details");
      } finally {
        setLoadingDesc(false);
      }
    })();
  }, [productId]);

  // 2) fetch reviews when tab = "reviews"
  useEffect(() => {
    if (activeTab !== "reviews" || !productId) return;
    ;(async () => {
      try {
        const res = await fetch(`/api/shop/review/${productId}`);
        const data = await res.json();
        if (data.success) {
          setReviews(data.reviews);
          setReviewCount(data.count);
          setAvgRating(data.avgRating);
        }
      } catch {
        // ignore
      }
    })();
  }, [activeTab, productId]);

  // submit a new review
  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("Please log in to submit a review");
      return;
    }
    if (newRating < 1 || !newText) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/shop/review/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, rating: newRating, reviewText: newText }),
      });
      const data = await res.json();
      if (data.success) {
        setReviews([data.review, ...reviews]);
        setReviewCount(c => c + 1);
        setAvgRating(avg => +((avg * reviewCount + newRating) / (reviewCount + 1)).toFixed(1));
        setNewRating(0);
        setNewText("");
      }
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 mt-10">
        {/* Left - Tabs Section */}
        <div className="col-span-9 bg-white p-6 rounded-md shadow">
          {/* Tabs */}
          <div className="border-b flex gap-6 text-gray-600">
            {(["description", "reviews", "shipping", "about"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  "pb-2 " +
                  (activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                    : "")
                }
              >
                {tab === "about" ? "About seller" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          <div className="mt-4 text-gray-700">
            {activeTab === "description" && (
              <>
                {loadingDesc ? (
                  <p>Loading description...</p>
                ) : errorDesc ? (
                  <p className="text-red-500">{errorDesc}</p>
                ) : (
                  <p>{description}</p>
                )}
                <table className="w-full mt-4 border-collapse border border-gray-300">
                  <tbody>
                    <tr className="border border-gray-300 bg-gray-100">
                      <td className="p-2 font-semibold text-gray-700">Model</td>
                      <td className="p-2 text-gray-800">#87868687</td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="p-2 font-semibold text-gray-700">Style</td>
                      <td className="p-2 text-gray-800">Classic style</td>
                    </tr>
                    <tr className="border border-gray-300 bg-gray-100">
                      <td className="p-2 font-semibold text-gray-700">Certificate</td>
                      <td className="p-2 text-gray-800">ISO-898921212</td>
                    </tr>
                    <tr className="border border-gray-300">
                      <td className="p-2 font-semibold text-gray-700">Size</td>
                      <td className="p-2 text-gray-800">34mm x 450mm x 19mm</td>
                    </tr>
                    <tr className="border border-gray-300 bg-gray-100">
                      <td className="p-2 font-semibold text-gray-700">Memory</td>
                      <td className="p-2 text-gray-800">36GB RAM</td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}

            {activeTab === "reviews" && (
              <>
                <form onSubmit={handleSubmitReview} className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium">Your Rating</label>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map(n => {
                        const filled = n <= (hoverRating || newRating);
                        return (
                          <Image
                            key={n}
                            src={filled ? "/images/icons/3.png" : "/images/icons/5.png"}
                            alt={filled ? "filled star" : "empty star"}
                            width={24}
                            height={24}
                            className="cursor-pointer"
                            onMouseEnter={() => setHoverRating(n)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setNewRating(n)}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Your Review</label>
                    <textarea
                      value={newText}
                      onChange={e => setNewText(e.target.value)}
                      rows={4}
                      className="mt-1 w-full p-2 border rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                  >
                    {submitting ? "Submitting…" : "Submit Review"}
                  </button>
                </form>
                <div className="space-y-6">
                  {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
                  {reviews.map(r => (
                    <div key={r._id} className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        {[1, 2, 3, 4, 5].map(n => (
                          <Image
                            key={n}
                            src={n <= r.rating ? "/images/icons/3.png" : "/images/icons/5.png"}
                            alt=""
                            width={14}
                            height={14}
                          />
                        ))}
                        <span className="text-sm text-gray-600">
                          by {r.user.name} on {new Date(r.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-800">{r.reviewText}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "shipping" && (
              <p className="text-gray-700">
                Latest shipping terms… Delivery in 5–10 business days worldwide.
              </p>
            )}

            {activeTab === "about" && (
              <p className="text-gray-700">
                This seller is verified, based in Germany, committed to quality & service.
              </p>
            )}
          </div>
        </div>

        {/* Right Sidebar - You May Like */}
        <div className="col-span-3 bg-white p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">You may like</h3>
          <div className="flex flex-col space-y-3">
            {["blazer.png","blueshirt.png","brownjacket.png","image-25.png","bag.png"].map((img,i)=>(
              <div key={i} className="flex items-center gap-3">
                <Image
                  src={`/images/recommended/${img}`}
                  alt="Recommended"
                  width={50} height={50}
                  className="rounded-md"
                />
                <div>
                  <p className="text-gray-800 text-sm font-medium">Xiaomi Redmi 8 Original</p>
                  <p className="text-gray-500 text-xs">$32.00-$40.00</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto mt-12 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Related products</h3>
        <div className="grid grid-cols-6 gap-4 overflow-x-auto">
          {[
            { img: "/images/recommended/wallet.png", name: "Leather Wallet", price: "$15.00-$20.00" },
            { img: "/images/image 35.png",         name: "Smart Watch",     price: "$50.00-$70.00" },
            { img: "/images/recommended/headphoneswhite.png", name: "Wireless Headphones", price: "$80.00-$120.00" },
            { img: "/images/recommended/shorts.png", name: "Summer Shorts", price: "$25.00-$35.00" },
            { img: "/images/recommended/flask.png",  name: "Electric Kettle", price: "$40.00-$60.00" },
            { img: "/images/recommended/filerack.png", name: "Wooden Bookstand", price: "$30.00-$45.00" },
          ].map((p,i)=>(
            <div key={i} className="bg-gray-100 p-3 rounded-md">
              <Image src={p.img} alt={p.name} width={150} height={150} className="rounded-md"/>
              <p className="text-gray-800 text-sm font-medium mt-2">{p.name}</p>
              <p className="text-gray-500 text-xs">{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Discount Banner */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white flex justify-between items-center px-6 py-4 rounded-lg shadow-md">
          <div>
            <h3 className="text-lg font-semibold">Super discount on more than 100 USD</h3>
            <p className="text-sm">Have you ever finally just write dummy info</p>
          </div>
          <button className="bg-orange-500 px-4 py-2 text-white font-semibold rounded-md hover:bg-orange-600">
            Shop now
          </button>
        </div>
      </div>
    </>
  );
}
