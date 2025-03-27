
import Image from "next/image";
import Link from "next/link";
import Description from "@/components/Description";


// Static product details
const product = {
  name: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
  stock: "In stock",
  rating: 9.3,
  reviews: 32,
  sold: 154,
  prices: [
    { price: 98, range: "50-100 pcs" },
    { price: 90, range: "100-700 pcs" },
    { price: 78, range: "700+ pcs" },
  ],
  details: {
    price: "Negotiable",
    type: "Classic shoes",
    material: "Plastic material",
    design: "Modern nice",
    customization: "Customized logo and design custom packages",
    protection: "Refund Policy",
    warranty: "2 years full warranty",
  },
  images: [
    "/images/detail/image 34.png",
    "/images/detail/image 35.png",
    "/images/detail/image 34.png",
    "/images/detail/image 36.png",
    "/images/detail/image 37.png",
    "/images/detail/image 34.png",
  ],
};


// Static supplier details
const supplier = {
  name: "Guanji Trading LLC",
  location: "Germany, Berlin",
  verified: true,
  shipping: "Worldwide shipping",
};


export default function ProductDetail() {
  return (
    <div className="w-full bg-[#f7fafc] min-h-screen justify-between items-center ml-3 p-6 font-['Inter']">
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
     
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:underline">Home</Link> &gt;
            <Link href="/" className="hover:underline mx-1">Clothing</Link> &gt;
            <Link href="/" className="hover:underline mx-1">Men's wear</Link> &gt;
            <span className="text-gray-700">Summer clothing</span>
        </nav>


        {/* Main Container */}
        <div className="grid grid-cols-12 gap-6">
           
            {/* Left - Product Images */}
            <div className="col-span-4">
            <div className="border border-gray-200 rounded-lg p-2">
                <Image
                src={product.images[0]}
                alt="Product Image"
                width={400}
                height={400}
                className="rounded-lg w-full h-auto"
                />
            </div>


            {/* Thumbnail Images */}
            <div className="grid grid-cols-6 gap-2 mt-2">
                {product.images.map((img, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-1">
                    <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={60}
                    height={60}
                    className="cursor-pointer rounded-lg"
                    />
                </div>
                ))}
            </div>
            </div>


            {/* Middle - Product Details */}
            <div className="col-span-5">
            {/* Stock Status */}
            <div className="flex items-center gap-2 text-green-600 font-medium">
                <Image src="/images/icons/tick.png" alt="In Stock" width={16} height={16} />
                {product.stock}
            </div>


            <h1 className="text-xl font-semibold text-gray-800 mt-2">{product.name}</h1>


            {/* Rating */}
            <div className="flex items-center gap-2 mt-1">
                {[...Array(4)].map((_, index) => (
                <Image key={index} src="/images/icons/3.png" alt="Star" width={16} height={16} />
                ))}
                <Image src="/images/icons/5.png" alt="Gray Star" width={16} height={16} />
                <span className="text-orange-500 font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
                <span className="text-gray-500">• {product.sold} sold</span>
            </div>


            <hr className="my-4 border-gray-300" />


            {/* Pricing Table */}
            <div className="flex bg-[#FFF0DF] p-3 ">
                {product.prices.map((tier, index) => (
                <div key={index} className={`flex-1 text-center ${index !== 0 ? "border-l border-gray-300" : ""}`}>
                    <p className={`text-lg font-semibold ${index === 0 ? "text-red-600" : "text-gray-900"}`}>
                    ${tier.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600 text-sm">{tier.range}</p>
                </div>
                ))}
            </div>


            <hr className="my-4 border-gray-300" />


            {/* Product Specifications */}
            <div className="space-y-2 text-gray-700">
                <p><strong>Price:</strong> {product.details.price}</p>
                <p><strong>Type:</strong> {product.details.type}</p>
                <p><strong>Material:</strong> {product.details.material}</p>
                <p><strong>Design:</strong> {product.details.design}</p>
                <p><strong>Customization:</strong> {product.details.customization}</p>
                <p><strong>Protection:</strong> {product.details.protection}</p>
                <p><strong>Warranty:</strong> {product.details.warranty}</p>
            </div>
            </div>


            {/* Right Section - Supplier Details + Save for Later */}
            <div className="col-span-3 flex flex-col">
            {/* Supplier Details */}
            <div className="border border-gray-200 p-4 rounded-lg bg-white">
                <div className="flex items-center gap-3">
                <Image
                    src="/images/img.jpg"
                    alt="Supplier"
                    width={40}
                    height={40}
                    
                />
                <div>
                    <p className="text-gray-800 font-semibold">{supplier.name}</p>
                    <p className="text-gray-600 text-sm flex items-center gap-1">
                    <Image src="/images/germany.png" alt="Flag" width={16} height={16} />
                    {supplier.location}
                    </p>
                </div>
                </div>


                <hr className="my-3 border-gray-300" />


                {/* Verified & Shipping */}
                <div className="text-sm text-gray-500">
                {supplier.verified && (
                    <p className="flex items-center gap-1">
                    <Image src="/images/icons/verified.png" alt="Verified" width={16} height={16} />
                    Verified Seller
                    </p>
                )}
                <p className="flex items-center gap-1">
                    <Image src="/images/icons/global.png" alt="Global" width={16} height={16} />
                    {supplier.shipping}
                </p>
                </div>


                <hr className="my-3 border-gray-300" />


                {/* Buttons */}
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Send Inquiry
                </button>
                <button className="w-full mt-2 text-blue-600 border border-blue-600 py-2 rounded-md hover:bg-blue-100 transition">
                Seller's Profile
                </button>
            </div>


            {/* Save for Later Button - Placed Outside Supplier Details */}
            <button className="mt-4 text-gray-600 flex items-center gap-1 justify-center">
                <Image src="/images/icons/heart.png" alt="Save" width={16} height={16} />
                Save for later
            </button>
            </div>
        </div>


       
        </div>
        <Description/>
    </div>


   
  );
}
