"use client";
import Image from "next/image";
import { useParams } from "next/navigation";

// Function to fetch product details from API
const getProductDetails = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store", // Ensures fresh data is always fetched
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product details: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return { description: "No description available." }; // Fallback description
  }
};

export default async function ProductDetails() {
  const params = useParams(); // Get product ID from URL
  const productId = params?.id as string; // Extract ID (assuming it's a string)

  const productDetails = await getProductDetails(productId); // Fetch product details dynamically

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 mt-10">
      {/* Left - Tabs Section */}
      <div className="col-span-9 bg-white p-6 rounded-md shadow">
        {/* Tabs */}
        <div className="border-b flex gap-6 text-gray-600">
          <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-semibold">
            Description
          </button>
        </div>

        {/* Dynamic Description */}
        <div className="mt-4 text-gray-700">
          <p>{productDetails.description || "No description available."}</p>
        </div>
      </div>

      {/* Right - "You May Like" Sidebar */}
      <div className="col-span-3 bg-white p-4 rounded-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          You may like
        </h3>
        <div className="flex flex-col space-y-3">
          {["blazer.png", "blueshirt.png", "brownjacket.png", "image25.png", "bag.png"].map(
            (img, index) => (
              <div key={index} className="flex items-center gap-3">
                <Image
                  src={`/images/recommended/${img}`}
                  alt="Recommended Product"
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div>
                  <p className="text-gray-800 text-sm font-medium">
                    Xiaomi Redmi 8 Original
                  </p>
                  <p className="text-gray-500 text-xs">$32.00-$40.00</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
