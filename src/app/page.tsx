"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import DealsSection from "@/components/DealsSection"; 
import Recommended from "@/components/Recommended";
import RequestQuote from "@/components/RequestQuote"; 
import RItems from "@/components/RItems"; 
import Extra from "@/components/Extra"; 
import Suppliers from "@/components/Suppliers"; 


export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full bg-[#f7fafc] min-h-screen justify-between items-center ml-3 p-6 font-['Inter']">
      {/*  Main Section Wrapper */}
      <div className="w-full max-w-7xl bg-white p-4 rounded-md h-full">
        
        {/*  Main Container */}
        <main className="flex gap-4 items-stretch md:flex-row flex-col">
          
          {/* Left Sidebar - Categories (Hidden on Mobile) */}
          <div className="w-1/4 hidden md:flex flex-col justify-start h-full">
            <ul className="text-gray-700 text-sm font-regular">
              {[
                "Automobiles",
                "Clothes and wear",
                "Home interiors",
                "Computer and tech",
                "Tools, equipments",
                "Sports and outdoor",
                "Animal and pets",
                "Machinery tools",
                "More category",
              ].map((category, index) => (
                <li
                  key={index}
                  className={`p-2 rounded-md cursor-pointer ${
                    index === 0 ? "text-black bg-[#007AFF]/15" : "hover:bg-gray-100"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/*  Center - Main Banner (Visible on all screens) */}
          <div className="w-full md:w-1/2 relative overflow-hidden flex flex-col justify-center h-full">
            <Image
              src="/images/banner-board.png"
              alt="Banner"
              width={665}
              height={360}
              layout="responsive"
            />
            <div className="absolute top-6 left-6">
              <p className="text-[#1c1c1c] text-lg">Latest trending</p>
              <h2 className="text-xl font-bold">Electronic items</h2>
              <button className="mt-3 px-4 py-2 bg-white rounded-md text-sm font-regular hover:bg-gray-100">
                Learn more
              </button>
            </div>
          </div>

          {/* Right Panel - User Info & CTA Sections (Hidden on Mobile) */}
          <div className="w-1/4 hidden md:flex flex-col space-y-3 h-full self-stretch flex-shrink-0">
            
            {/* User Info Box */}
            <div className="bg-[#e3f0ff] p-4 rounded-md shadow-sm flex flex-col items-center text-center h-full">
              <div className="flex items-center gap-x-3">
                <Image src="/images/avatar.png" alt="User" width={40} height={40} />
                
                {/* User Text */}
                <div className="flex flex-col text-left">
                  <p className="text-sm font-regular">Hi, user</p>
                  <p className="text-xs text-gray-500">Let's get started</p>
                </div>
              </div>

              {/* Buttons */}
              <button
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md text-sm font-regular"
                onClick={() => router.push('/auth')}
              >
                Join now
              </button>
              <button
                className="mt-2 w-full bg-white text-[#0D6EFD] py-2 rounded-md text-sm font-regular hover:bg-gray-100"
                onClick={() => router.push('/auth')}
              >
                Log in
              </button> 
            </div>

            {/* Orange Promo Box */}
            <div className="bg-[#F38332] text-white p-4 rounded-md text-md font-regular text-left h-full">
              Get US $10 off with a new supplier
            </div>

            {/* Teal Promo Box */}
            <div className="bg-[#55BDC3] text-white p-4 rounded-md text-md font-regular text-left h-full">
              Send quotes with supplier preferences
            </div>
          </div>

        </main>

      </div>

      <DealsSection/>
      <Recommended/>
      <RequestQuote/>
      <RItems/>
      <Extra/>
      <Suppliers/>
    </div>
  );
}