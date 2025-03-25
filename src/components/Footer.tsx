'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Footer = () => {
  const router = useRouter();

  const goToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/product-listing');
  };

  return (
    <footer className="w-full bg-white font-inter">
      {/* Subscription Section */}
      <div className="w-full bg-[#EFF2F4] flex flex-col justify-center items-center p-5 text-center">
        <h2 className="text-lg font-semibold">Subscribe to our newsletter</h2>
        <p className="text-sm text-gray-600 mt-1 max-w-sm">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>

        {/* Email Input & Subscribe Button */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <div className="flex items-center border border-gray-300 rounded-md bg-white w-full">
            <div className="px-3">
              <Image src="/images/icons/email.png" alt="Email" width={16} height={16} />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="px-2 py-2 outline-none w-full text-sm"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md font-medium hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start py-10 px-5">
        {/* Left Section (Brand + Socials) */}
        <div className="flex flex-col items-center lg:items-start space-y-4 w-full lg:w-auto text-center lg:text-left">
          <div className="flex items-center gap-2">
            <Image src="/images/brand-icon.png" alt="Brand" width={40} height={40} />
            <span className="text-2xl font-bold text-[#0d6efd]">Brand</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
            Best information about the company goes here but now lorem ipsum
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'].map((icon) => (
              <a key={icon} href="#" onClick={(e) => e.preventDefault()} className="w-8 h-8">
                <Image src={`/images/icons/${icon}.png`} alt={icon} width={32} height={32} />
              </a>
            ))}
          </div>
        </div>

        {/* Center Links Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-left mx-auto w-full lg:w-auto text-center lg:text-left mt-6 lg:mt-0">
          {[
            { title: 'About', links: ['About Us', 'Find Store', 'Categories', 'Blogs'] },
            { title: 'Partnership', links: ['About Us', 'Find Store', 'Categories', 'Blogs'] },
            { title: 'Information', links: ['Help Center', 'Money Refund', 'Shipping', 'Contact Us'] },
            { title: 'For Users', links: ['Login', 'Register', 'Settings', 'My Orders'] },
          ].map((section, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <h4 className="text-lg font-medium text-gray-900">{section.title}</h4>
              {section.links.map((link, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={link === 'Categories' ? goToCategories : undefined}
                  className="text-gray-500 text-sm hover:text-[#0d6efd] transition"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Right Section (Get App) */}
        <div className="flex flex-col items-center lg:items-start space-y-3 w-full lg:w-auto text-center lg:text-left mt-6 lg:mt-0">
          <h4 className="text-lg font-medium text-gray-900">Get App</h4>
          <div className="flex flex-col lg:flex-row gap-3">
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <Image src="/images/icons/appstore.png" alt="App Store" width={128} height={40} />
            </a>
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <Image src="/images/icons/playstore.png" alt="Play Store" width={128} height={40} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-100 border-t border-gray-300 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm px-5">
          <p>© 2023 Ecommerce.</p>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Image src="/images/us.png" alt="US" width={20} height={14} />
            <span>English</span>
            <span className="text-xs">⌄</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
