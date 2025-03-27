import Image from "next/image";

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl py-6 flex flex-col space-y-6">
      {/* Category 1: Home and Outdoor */}
      <div className="flex flex-col sm:flex-row bg-white w-full max-w-7xl mx-auto rounded-md overflow-hidden">
        
        {/* Left Section: Category Title & Image */}
        <div className="w-full sm:w-1/4 flex flex-col justify-start items-start p-5 text-left text-black relative bg-[#FFE0B0]">
            {/* Semi-transparent Image on Top */}
            <div className="absolute inset-0 bg-[url('/images/image-92.png')] bg-cover bg-center opacity-60"></div>

            {/* Content */}
            <div className="relative z-10">
                <h2 className="text-lg font-semibold">Home and <p>outdoor</p></h2>
                <button className="mt-2 bg-white text-black px-3 py-1 rounded-md">
                Source now
                </button>
            </div>
        </div>

        {/* Right Section: Product Grid (Responsive) */}
        <div className="w-full sm:w-3/4 overflow-x-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 border border-gray-300">
            {[
                { name: "Soft chairs", image: "/images/recommended/sofachair.png", price: "USD 19" },
                { name: "Sofa & chair", image: "/images/recommended/lamp.png", price: "USD 19" },
                { name: "Kitchen dishes", image: "/images/recommended/image 93.png", price: "USD 19" },
                { name: "Smart watches", image: "/images/recommended/pot.png", price: "USD 19" },
                { name: "Kitchen mixer", image: "/images/recommended/juicer.png", price: "USD 100" },
                { name: "Blenders", image: "/images/recommended/coffee.png", price: "USD 39" },
                { name: "Home appliance", image: "/images/recommended/filerack.png", price: "USD 19" },
                { name: "Coffee maker", image: "/images/recommended/plant.png", price: "USD 10" },
            ].map((product, index) => (
                <div key={index} className="relative p-4 border border-gray-200 flex flex-col h-32">
                    {/* Text - Positioned at Top Left */}
                    <p className="absolute top-2 left-2 text-sm font-semibold">{product.name}</p>
                    <span className="absolute top-7 left-2 text-xs text-[#8B96A5]">From {product.price}</span>

                    {/* Image - Positioned at Bottom Right */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="absolute bottom-2 right-2 object-contain"
                    />
                </div>
            ))}
          </div>
        </div>

      </div>

      {/* Category 2: Consumer Electronics & Gadgets */}
      <div className="flex flex-col sm:flex-row bg-white w-full max-w-7xl mx-auto rounded-md overflow-hidden">
        
        {/* Left Section: Category Title & Image */}
        <div className="w-full sm:w-1/4 flex flex-col justify-start items-start p-5 text-left text-black relative bg-[url('/images/image-98.png')] bg-cover bg-center">
            {/* Content */}
            <div className="relative z-10">
                <h2 className="text-lg font-semibold">Consumer Electronics & Gadgets</h2>
                <button className="mt-2 bg-white text-black px-3 py-1 rounded-md">
                Source now
                </button>
            </div>
        </div>

        {/* Right Section: Product Grid (Responsive) */}
        <div className="w-full sm:w-3/4 overflow-x-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 border border-gray-300">
            {[
                { name: "Smart watches", image: "/images/image 35.png", price: "USD 19" },
                { name: "Cameras", image: "/images/image 28.png", price: "USD 89" },
                { name: "Headphones", image: "/images/recommended/headphoneswhite.png", price: "USD 19" },
                { name: "Smart watches", image: "/images/recommended/flask.png", price: "USD 19" },
                { name: "Gaming set", image: "/images/image 29.png", price: "USD 19" },
                { name: "Laptops & PC", image: "/images/image 34.png", price: "USD 340" },
                { name: "Smartphones", image: "/images/recommended/tablet.png", price: "USD 19" },
                { name: "Electric kettle", image: "/images/recommended/iphone.png", price: "USD 240" },
            ].map((product, index) => (
                <div key={index} className="relative p-4 border border-gray-200 flex flex-col h-32">
                    {/* Text - Positioned at Top Left */}
                    <p className="absolute top-2 left-2 text-sm font-semibold">{product.name}</p>
                    <span className="absolute top-7 left-2 text-xs text-[#8B96A5]">From {product.price}</span>

                    {/* Image - Positioned at Bottom Right */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="absolute bottom-2 right-2 object-contain"
                    />
                </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}