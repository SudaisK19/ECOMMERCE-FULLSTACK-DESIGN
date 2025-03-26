import Image from "next/image";
import Link from "next/link";
import Description from "@/components/Description";

// Function to fetch product data from API
async function getProduct(productId: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`, {
      cache: "no-store", // Ensures fresh data is always fetched
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id); // Fetch product dynamically

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Product not found.</p>;
  }

  return (
    <div className="w-full bg-[#f7fafc] min-h-screen justify-between items-center ml-3 p-6 font-['Inter']">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">Home</Link> &gt;
        <span className="text-gray-700">{product.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto p-6 bg-white rounded-md">
        {/* Main Container */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left - Product Image */}
          <div className="col-span-4">
            <div className="border border-gray-200 rounded-lg p-2">
              <Image
                src={product.images?.[0] || "/images/default-product.png"} // Fallback image
                alt={product.name}
                width={400}
                height={400}
                className="rounded-lg w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Middle - Product Details */}
          <div className="col-span-5">
            {/* Stock Status */}
            <div className={`flex items-center gap-2 font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              <Image
                src={product.stock > 0 ? "/images/icons/tick.png" : "/images/icons/cross.png"}
                alt={product.stock > 0 ? "In Stock" : "Out of Stock"}
                width={16}
                height={16}
              />
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </div>

            <h1 className="text-xl font-semibold text-gray-800 mt-2">{product.name}</h1>

            <hr className="my-4 border-gray-300" />

            {/* Product Price */}
            <p className="text-lg font-semibold text-red-600">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Description is handled in this component */}
      <Description />
    </div>
  );
}
