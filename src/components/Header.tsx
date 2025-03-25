"use client";

import React, { useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white font-sans shadow-sm">
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center border-b border-gray-200 py-3 max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/images/brand-icon.png" alt="Brand Icon" width={30} height={30} />
          <span className="text-xl font-bold text-[#8CB7F5]">Brand</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-blue-500 rounded-md overflow-hidden w-full max-w-lg mx-10">
          <input type="text" placeholder="Search" className="flex-1 p-2 outline-none text-sm" />
          <select className="border-l border-blue-500 px-4 text-sm outline-none">
            <option>All category</option>
          </select>
          <button className="bg-blue-600 text-white px-6 py-2 font-medium">Search</button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-6 text-gray-500">
          {[
            { icon: "profile.png", label: "Profile" },
            { icon: "message.png", label: "Message" },
            { icon: "orders.png", label: "Orders" },
            { icon: "cart.png", label: "My cart" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center text-xs">
              <Image src={`/images/icons/${item.icon}`} alt={item.label} width={20} height={20} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center border-b border-gray-300 bg-white py-3 px-4">
        {/* Menu Icon */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Image src="/images/icons/menu.png" alt="Menu" width={24} height={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/images/brand-icon.png" alt="Brand Icon" width={20} height={20} />
          <span className="text-lg font-semibold text-blue-400">Brand</span>
        </div>

        {/* Cart & Profile Icons */}
        <div className="flex space-x-4">
          <Image src="/images/icons/cart.png" alt="Cart" width={24} height={24} />
          <Image src="/images/icons/profile.png" alt="User" width={24} height={24} />
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 py-2">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input type="text" placeholder="🔍 Search" className="flex-1 p-2 outline-none text-sm" />
        </div>
      </div>

      {/* Mobile Category Buttons */}
      <div className="md:hidden px-4 pb-2 flex space-x-2 overflow-x-auto scrollbar-hide">
        {["All category", "Gadgets", "Clothes", "Accessories"].map((item) => (
          <button
            key={item}
            className="px-3 py-1 text-sm text-blue-600 border border-blue-400 rounded-full whitespace-nowrap"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile Menu (Slide In) */}
      <div
        className={`absolute top-0 left-0 h-screen w-64 bg-white shadow-md transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        {/* Close Button */}
        <div className="p-4 flex justify-end">
          <button onClick={() => setIsMenuOpen(false)}>
            <Image src="/images/icons/arrow_back.png" alt="Close" width={24} height={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col space-y-4 p-6">
          {["All category", "Hot offers", "Gift boxes", "Projects", "Help"].map((item) => (
            <a key={item} href="#" className="text-gray-700">
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/*  Desktop Bottom Navigation */}
      <div className="hidden md:flex justify-between items-center border-b border-gray-200 text-gray-800 text-sm font-medium py-3 max-w-7xl mx-auto px-4">
        <div className="flex space-x-5">
          <span className="flex items-center space-x-1 cursor-pointer">
            <Image src="/images/icons/menu.png" width={16} height={16} alt="Menu" />
            <span>All category</span>
          </span>
          <span className="cursor-pointer">Hot offers</span>
          <span className="cursor-pointer">Gift boxes</span>
          <span className="cursor-pointer">Projects</span>
          <span className="cursor-pointer">Menu item</span>
          <span className="flex items-center space-x-1 cursor-pointer">
            <span>Help</span>
            <span className="text-xs text-gray-500">⌄</span>
          </span>
        </div>

        <div className="flex space-x-5">
          <span className="flex items-center space-x-1 cursor-pointer">
            <span>English, USD</span>
            <span className="text-xs text-gray-500">⌄</span>
          </span>
          <span className="flex items-center space-x-1 cursor-pointer">
            <span>Ship to</span>
            <Image src="/images/germany.png" alt="Flag" width={20} height={12} className="rounded-sm" />
            <span className="text-xs text-gray-500">⌄</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
