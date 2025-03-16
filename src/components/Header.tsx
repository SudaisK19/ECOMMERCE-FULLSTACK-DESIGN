"use client";

import { FaUser, FaCommentDots, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-2 rounded-md">
            <FaShoppingCart className="text-white text-lg" />
          </div>
          <span className="text-lg font-bold text-gray-700">Brand</span>
        </div>

        {/* Center - Search Bar */}
        <div className="flex flex-1 max-w-2xl mx-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select className="border border-gray-300 px-3 focus:outline-none">
            <option>All category</option>
          </select>
          <button className="bg-blue-500 text-white px-4 rounded-r-md flex items-center gap-1">
            <FaSearch />
            Search
          </button>
        </div>

        {/* Right - Icons */}
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex flex-col items-center cursor-pointer">
            <FaUser className="text-xl" />
            <span className="text-xs">Profile</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <FaCommentDots className="text-xl" />
            <span className="text-xs">Message</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <FaHeart className="text-xl" />
            <span className="text-xs">Orders</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <FaShoppingCart className="text-xl" />
            <span className="text-xs">My cart</span>
          </div>
        </div>
      </div>
    </header>
  );
}
