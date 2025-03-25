
export default function DealsSection() {
  return (
    <div className="bg-white w-full max-w-7xl mt-10 p-4 rounded-md">
      {/* Left Section: Title, Subtitle & Timer */}
      <div className="flex flex-col md:flex-row items-start md:items-center">
        
        {/* Title & Countdown Timer */}
        <div className="flex flex-col items-start w-full md:w-1/4 pr-6">
          <h2 className="text-lg font-bold">Deals and offers</h2>
          <p className="text-sm text-gray-500 mb-3">Hygiene equipments</p>

          {/* Countdown Timer */}
          <div className="flex space-x-2 text-white text-xs">
            {[
              { value: "04", label: "Days" },
              { value: "13", label: "Hour" },
              { value: "34", label: "Min" },
              { value: "56", label: "Sec" },
            ].map((time, index) => (
              <div key={index} className="px-3 py-2 bg-[#606060] rounded-md text-center">
                <span className="block text-lg font-bold">{time.value}</span>
                {time.label}
              </div>
            ))}
          </div>
        </div>

        {/* Grey Divider (Hidden on Mobile) */}
        <div className="hidden md:block w-[1px] bg-gray-300 mx-4"></div>

        {/* ✅ Right Section: Deals List (Scrollable on Mobile) */}
        <div className="w-full md:w-3/4 overflow-x-auto">
          <div className="flex space-x-4 md:space-x-0">
            {[
              { name: "Smart watches", image: "/images/image 35.png", discount: "-25%" },
              { name: "Laptops", image: "/images/image 34.png", discount: "-15%" },
              { name: "GoPro cameras", image: "/images/image 28.png", discount: "-40%" },
              { name: "Headphones", image: "/images/image 29.png", discount: "-25%" },
              { name: "Canon cameras", image: "/images/image 23.png", discount: "-25%" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center min-w-[120px] md:w-1/5 relative">
                
                {/* Product Image */}
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />

                {/* Product Name */}
                <p className="text-xs mt-1 text-center">{item.name}</p>

                {/* Discount Tag */}
                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full mt-2 inline-block">
                  {item.discount}
                </span>

                {/* Grey Dividers (Only on Desktop) */}
                {index < 4 && (
                  <div className="hidden md:block absolute right-0 top-0 h-full w-[1px] bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
