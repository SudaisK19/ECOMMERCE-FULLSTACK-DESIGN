export default function Footer() {
    return (
      <footer className="bg-gray-300 text-gray-700 mt-10 border-t mb-0">
        {/* Newsletter Section */}
        <div className="bg-gray-200 py-6">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-lg font-semibold">Subscribe on our newsletter</h3>
            <p className="text-sm text-gray-500">Get daily news on upcoming offers from many suppliers all over the world</p>
            <div className="mt-4 flex justify-center">
              <input
                type="email"
                placeholder="Email"
                className="p-2 border rounded-l-md w-64 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
  
        {/* Footer Content - Full Width */}
        <div className="w-full bg-white py-8">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-between text-sm px-6">
            {/* Brand Section */}
            <div className="w-1/4">
                <h2 className="text-lg font-bold flex items-center text-blue-600">
                    <span className="bg-blue-500 text-white p-2 rounded mr-2">🔒</span>
                    Brand
                </h2>
                <p className="text-gray-500 mt-2">
                    Best information about the company goes here but now lorem ipsum is.
                </p>
                {/* Social Icons */}
                <div className="flex space-x-3 mt-3">
                    <a href="#" className="text-gray-600 hover:text-blue-500">🔵</a>
                    <a href="#" className="text-gray-600 hover:text-blue-500">💼</a>
                    <a href="#" className="text-gray-600 hover:text-blue-500">📸</a>
                    <a href="#" className="text-gray-600 hover:text-blue-500">🎥</a>
                </div>
            </div>

            {/* Footer Links */}
            <div className="w-1/2 flex justify-between">
                <div>
                    <h3 className="font-semibold">About</h3>
                    <ul className="text-gray-500 mt-2 space-y-1">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Find Store</a></li>
                        <li><a href="#">Categories</a></li>
                        <li><a href="#">Blogs</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Partnership</h3>
                    <ul className="text-gray-500 mt-2 space-y-1">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Find Store</a></li>
                        <li><a href="#">Categories</a></li>
                        <li><a href="#">Blogs</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">Information</h3>
                    <ul className="text-gray-500 mt-2 space-y-1">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Money Refund</a></li>
                        <li><a href="#">Shipping</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold">For Users</h3>
                    <ul className="text-gray-500 mt-2 space-y-1">
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Register</a></li>
                        <li><a href="#">Settings</a></li>
                        <li><a href="#">My Orders</a></li>
                    </ul>
                </div>
            </div>

            {/* App Section */}
            <div className="w-1/4 text-center">
                <h3 className="font-semibold">Get App</h3>
                <div className="mt-3">
                    <a href="#"><img src="/appstore.png" alt="App Store" className="h-10 mx-auto mb-2" /></a>
                    <a href="#"><img src="/googleplay.png" alt="Google Play" className="h-10 mx-auto" /></a>
                </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-4 bg-gray-200 flex justify-between items-center px-6">
            <p>&copy; {new Date().getFullYear()} Ecommerce.</p>
            <div className="flex items-center">
                <span className="mr-2">🇺🇸 English</span>
                <button>^</button>
            </div>
        </div>
      </footer>
    ); 
}
