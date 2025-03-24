"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  "Automobiles",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools, equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
  "More category",
];

export default function HeroSection() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/product-listing?cat=${encodeURIComponent(category)}`);
  };

  const handleAuthRedirect = (mode: "login" | "signup") => {
    router.push(`/auth?mode=${mode}`);
  };

  const handleLearnMore = () => {
    console.log("Learn more clicked");
  };

  return (
    <section className="w-full flex justify-center bg-gray-100 py-6">
      <div className="w-[1180px] h-[400px] bg-white border border-[#DEE2E7] rounded-md flex px-4 py-4 gap-4">
        {/* Left Sidebar (Categories) */}
        <div className="w-[250px] flex flex-col gap-2">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`text-sm text-gray-700 py-2 px-3 rounded-md text-left transition ${
                idx === 0
                  ? "bg-blue-100 font-semibold text-gray-900"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Center Banner */}
        <div className="w-[665px] h-[360px] relative rounded-md overflow-hidden">
          <Image
            src="/images/"
            alt="Hero Banner"
            fill
            className="object-cover rounded-md"
          />
          <div className="absolute top-[56px] left-[45px] text-black">
            <p className="text-[28px] font-normal leading-[34px]">Latest trending</p>
            <h2 className="text-[32px] font-bold leading-[39px] mt-1">Electronic items</h2>
            <button
              onClick={handleLearnMore}
              className="mt-6 px-4 py-2 w-[119px] h-[40px] bg-white border border-white shadow-sm rounded-md text-[16px] font-medium text-gray-900"
            >
              Learn more
            </button>
          </div>
        </div>

        {/* Right Section (User + Cards) */}
        <div className="w-[200px] flex flex-col gap-2">
          {/* User Card */}
          <div className="bg-blue-100 p-3 rounded-md text-center flex flex-col items-center h-[150px]">
            <div className="w-11 h-11 mb-2 relative">
              <Image
                src="/images/avatar.png"
                alt="Avatar"
                width={44}
                height={44}
                className="rounded-full"
              />
            </div>
            <p className="text-gray-800 text-sm">
              Hi, user<br />let’s get stated
            </p>
            <button
              onClick={() => handleAuthRedirect("signup")}
              className="w-full mt-3 text-white bg-blue-500 py-1.5 rounded-md text-sm"
            >
              Join now
            </button>
            <button
              onClick={() => handleAuthRedirect("login")}
              className="w-full mt-1 border border-gray-300 py-1.5 rounded-md text-sm text-blue-600"
            >
              Log in
            </button>
          </div>

          {/* Promo 1 */}
          <div className="bg-orange-400 text-white p-3 rounded-md text-sm leading-tight h-[95px] flex items-center">
            Get US $10 off with a new supplier
          </div>

          {/* Promo 2 */}
          <div className="bg-teal-400 text-white p-3 rounded-md text-sm leading-tight h-[95px] flex items-center">
            Send quotes with supplier preferences
          </div>
        </div>
      </div>
    </section>
  );
}
