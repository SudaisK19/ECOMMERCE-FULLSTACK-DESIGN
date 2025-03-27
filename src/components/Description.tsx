"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Correctly get `id` from the URL
import Image from "next/image";

export default function ProductDetailsStatic() {
  const params = useParams(); // Extract `id`
  const productId = params?.id as string;

  const [description, setDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return; // Prevent unnecessary fetch calls

    async function fetchProductDetails() {
      try {
        const res = await fetch(`/api/shop/product/${productId}`);
        const data = await res.json();

        if (data.success) {
          setDescription(data.product.description);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetails();
  }, [productId]);

  return (
    <>
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 mt-10">
        {/* Left - Tabs Section */}
        <div className="col-span-9 bg-white p-6 rounded-md shadow">
          {/* Tabs */}
          <div className="border-b flex gap-6 text-gray-600">
            <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-semibold">Description</button>
            <button className="pb-2">Reviews</button>
            <button className="pb-2">Shipping</button>
            <button className="pb-2">About seller</button>
          </div>

          {/* Dynamic Content (Product Description) */}
          <div className="mt-4 text-gray-700">
            {loading ? (
              <p>Loading description...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p>{description}</p>
            )}

            {/* Product Details Table (Static) */}
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
          </div>
        </div>

        {/* Right Sidebar - You May Like */}
        <div className="col-span-3 bg-white p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">You may like</h3>
          <div className="flex flex-col space-y-3">
            {["blazer.png", "blueshirt.png", "brownjacket.png", "image-25.png", "bag.png"].map((img, index) => (
              <div key={index} className="flex items-center gap-3">
                <Image src={`/images/recommended/${img}`} alt="Recommended Product" width={50} height={50} className="rounded-md" />
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
            { img: "/images/image 35.png", name: "Smart Watch", price: "$50.00-$70.00" },
            { img: "/images/recommended/headphoneswhite.png", name: "Wireless Headphones", price: "$80.00-$120.00" },
            { img: "/images/recommended/shorts.png", name: "Summer Shorts", price: "$25.00-$35.00" },
            { img: "/images/recommended/flask.png", name: "Electric Kettle", price: "$40.00-$60.00" },
            { img: "/images/recommended/filerack.png", name: "Wooden Bookstand", price: "$30.00-$45.00" }
            ].map((product, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-md">
                <Image src={product.img} alt={product.name} width={150} height={150} className="rounded-md" />
                <p className="text-gray-800 text-sm font-medium mt-2">{product.name}</p>
                <p className="text-gray-500 text-xs">{product.price}</p>
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
