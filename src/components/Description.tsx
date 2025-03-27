
import Image from "next/image";


export default function ProductDetailsStatic() {
  return (
    <>
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 mt-10">
     
        {/* Left - Tabs Section */}
        <div className="col-span-9 bg-white p-6 rounded-md shadow">
           
            {/* Tabs */}
            <div className="border-b flex gap-6 text-gray-600">
            <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-semibold">Description</button>
            <button className="pb-2">Reviews</button>
            <button className="pb-2">Shipping</button>
            <button className="pb-2">About seller</button>
            </div>


            {/* Static Content (Always Show Description) */}
            <div className="mt-4 text-gray-700">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>


            {/* Product Details Table */}
            <table className="w-full mt-4 border-collapse border border-gray-300">
                <tbody>
                <tr className="border border-gray-300 bg-gray-100">
                    <td className="p-2 font-semibold text-gray-700">Model</td>
                    <td className="p-2 text-gray-800">#87868687</td>
                </tr>
                <tr className="border border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Style</td>
                    <td className="p-2 text-gray-800">Classic style</td>
                </tr>
                <tr className="border border-gray-300 bg-gray-100">
                    <td className="p-2 font-semibold text-gray-700">Certificate</td>
                    <td className="p-2 text-gray-800">ISO-898921212</td>
                </tr>
                <tr className="border border-gray-300">
                    <td className="p-2 font-semibold text-gray-700">Size</td>
                    <td className="p-2 text-gray-800">34mm x 450mm x 19mm</td>
                </tr>
                <tr className="border border-gray-300 bg-gray-100">
                    <td className="p-2 font-semibold text-gray-700">Memory</td>
                    <td className="p-2 text-gray-800">36GB RAM</td>
                </tr>
                </tbody>
            </table>


            {/* Feature List */}
            <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                <span className="text-gray-400">✔</span> Some great feature name here
                </li>
                <li className="flex items-center gap-2">
                <span className="text-gray-400">✔</span> Lorem ipsum dolor sit amet, consectetur
                </li>
                <li className="flex items-center gap-2">
                <span className="text-gray-400">✔</span> Duis aute irure dolor in reprehenderit
                </li>
                <li className="flex items-center gap-2">
                <span className="text-gray-400">✔</span> Some great feature name here
                </li>
            </ul>
            </div>
        </div>


        {/* Right - "You May Like" Sidebar */}
        <div className="col-span-3 bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">You may like</h3>
            <div className="flex flex-col space-y-3">
            {["blazer.png", "blueshirt.png", "brownjacket.png", "image25.png", "bag.png"].map((img, index) => (
                <div key={index} className="flex items-center gap-3">
                <Image src={`/images/recommended/${img}`} alt="Recommended Product" width={50} height={50} className="rounded-md" />
                <div>
                    <p className="text-gray-800 text-sm font-medium">Xiaomi Redmi 8 Original</p>
                    <p className="text-gray-500 text-xs">$32.00-$40.00</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>


        {/* Related Products Section */}
        <div className="max-w-7xl mx-auto mt-12 bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Related products</h3>
        <div className="grid grid-cols-6 gap-4 overflow-x-auto">
            {["wallet.png", "watch.png", "headphones.png", "shorts.png", "kettle.png", "bookstand.png"].map((img, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-md">
                <Image src={`/images/recommended/${img}`} alt="Related Product" width={150} height={150} className="rounded-md" />
                <p className="text-gray-800 text-sm font-medium mt-2">Xiaomi Redmi 8 Original</p>
                <p className="text-gray-500 text-xs">$32.00-$40.00</p>
            </div>
            ))}
        </div>
        </div>


        {/* Discount Banner */}
        <div className="max-w-7xl mx-auto mt-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white flex justify-between items-center px-6 py-4 rounded-lg shadow-md">
            <div>
            <h3 className="text-lg font-semibold">Super discount on more than 100 USD</h3>
            <p className="text-sm">Have you ever finally just write dummy info</p>
            </div>
            <button className="bg-orange-500 px-4 py-2 text-white font-semibold rounded-md hover:bg-orange-600">
            Shop now
            </button>
        </div>
        </div>
    </>
   
  );
}
