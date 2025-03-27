import React from "react";
import Image from "next/image";

const recommendedProducts = [
  { name: "T-shirts with multiple colors, for men", image: "/images/recommended/blueshirt.png", price: "$10.30" },
  { name: "Jeans shorts for men blue color", image: "/images/recommended/brownjacket.png", price: "$10.30" },
  { name: "Brown winter coat medium size", image: "/images/recommended/blazer.png", price: "$12.50" },
  { name: "Jeans bag for travel for men", image: "/images/recommended/wallet.png", price: "$34.00" },
  { name: "Leather wallet", image: "/images/recommended/bag.png", price: "$99.00" },
  { name: "Canon camera black, 100x zoom", image: "/images/recommended/shorts.png", price: "$9.99" },
  { name: "Headset for gaming with mic", image: "/images/recommended/headphoneswhite.png", price: "$8.99" },
  { name: "Smartwatch silver color modern", image: "/images/recommended/bag.png", price: "$10.30" },
  { name: "Blue wallet for men leather material", image: "/images/recommended/pot.png", price: "$10.30" },
  { name: "Jeans bag for travel for men", image: "/images/recommended/flask.png", price: "$80.95" },
];

const RecommendedItems = () => {
  return (
    <div className="w-full max-w-7xl mt-10">
      <h2 className="text-xl font-semibold mb-4">Recommended items</h2>
      
      {/* Grid Layout: 2 columns on mobile, 3 on tablets, 5 on large screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {recommendedProducts.map((product, index) => (
          <div key={index} className="border rounded-md border-gray-200 p-3 bg-white">
            <Image 
              src={product.image} 
              alt={product.name} 
              width={150} 
              height={150} 
              className="object-contain mt-3 w-full h-36"
            />
            <p className="text-md font-medium mt-2">{product.price}</p>
            <p className="text-sm text-[#8B96A5] max-w-sm">{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedItems;