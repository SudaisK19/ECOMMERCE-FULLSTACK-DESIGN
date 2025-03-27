import React from "react";
import Image from "next/image";

const extraServices = [
  {
    title: "Source from Industry Hubs",
    image: "/images/image 108.png",
    icon: "/images/icons/search.png",
  },
  {
    title: "Customize Your Products",
    image: "/images/image 104.png",
    icon: "/images/icons/Vector.png",
  },
  {
    title: "Fast, reliable shipping by ocean or air",
    image: "/images/image 106.png",
    icon: "/images/icons/send.png",
  },
  {
    title: "Product monitoring and inspection",
    image: "/images/image 107.png",
    icon: "/images/icons/Vector2.png",
  },
];

const ExtraServices= () => {
  return (
    <div className="w-full max-w-7xl mt-10">
      <h2 className="text-xl font-semibold mb-4">Our extra services</h2>
      
      {/* Responsive Grid Layout: 2 columns on mobile, 4 on larger screens */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {extraServices.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden relative">
            {/* Image Section */}
            <div className="relative w-full h-[175px] bg-[#1c1c1c]">
              <Image
                src={service.image}
                alt={service.title}
                layout="fill"
                objectFit="cover"
                className="opacity-70"
              />
            </div>

            {/* Text & Icon Section */}
            <div className="p-3 relative">
              {/* Service Title */}
              <span className="text-md mt-5 font-medium break-words block max-w-[58%] leading-5">
                {service.title}
              </span>

              {/* Icon (Positioned Half on Image, Half on White Space) */}
              <div className="absolute top-[-25px] right-3 w-15 h-15 flex items-center justify-center border border-white bg-blue-100 rounded-full shadow-md">
                <Image src={service.icon} alt="icon" width={25} height={25} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraServices;