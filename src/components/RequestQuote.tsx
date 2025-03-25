import React from "react";

const RequestQuote: React.FC = () => {
  return (
    <div className="relative w-full max-w-7xl min-h-[420px] sm:h-[420px] rounded-lg overflow-hidden mt-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/image-102.png')",
        }}
      ></div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#2C7CF1] to-[#00D1FF] opacity-80"
      ></div>

      {/* Content */}
      <div className="relative flex flex-col sm:flex-row justify-between items-center h-full p-5 sm:px-10 text-white">
        
        {/* Left Text Section */}
        <div className="max-w-md text-center sm:text-left">
          <h2 className="text-2xl sm:text-4xl font-semibold">
            An easy way to send requests to all suppliers
          </h2>
          <p className="text-sm sm:text-md mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
        </div>

        {/* Right Form Section */}
        <div className="bg-white p-5 rounded-lg shadow-md w-full sm:w-2/5 mt-4 sm:mt-0 text-black">
          <h3 className="text-lg font-semibold mb-3">Send quote to suppliers</h3>
          <input
            type="text"
            placeholder="What item you need?"
            className="w-full p-2 border rounded-md text-sm mb-2"
          />
          <textarea
            placeholder="Type more details"
            className="w-full p-2 border rounded-md text-sm mb-2 h-16"
          ></textarea>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              placeholder="Quantity"
              className="w-1/2 p-2 border rounded-md text-sm"
            />
            <select className="w-1/2 p-2 border rounded-md text-sm">
              <option>Pcs</option>
              <option>Kgs</option>
              <option>Liters</option>
            </select>
          </div>
          <button className="w-full bg-blue-600 text-white p-2 rounded-md text-sm hover:bg-blue-700">
            Send inquiry
          </button>
        </div>

      </div>
    </div>
  );
};

export default RequestQuote;
