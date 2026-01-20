import React, { useState } from "react";
import Link from "next/link";
import {
  FaChevronRight,
  FaChevronDown,
  FaHome,
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";

const Navmenu = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Mock user state
  const isLoggedIn = false;
  const userName = "John Doe";
  const userEmail = "john@example.com";

  // Category data
  const categories = {
    men: {
      title: "Men's Collection",
      items: [
        { name: "T-Shirts", href: "/collections/men/t-shirts" },
        { name: "Jeans", href: "/collections/men/jeans" },
        { name: "Jackets", href: "/collections/men/jackets" },
        { name: "Sweatshirts", href: "/collections/men/sweatshirts" },
        { name: "Shorts", href: "/collections/men/shorts" },
        { name: "Suits", href: "/collections/men/suits" },
        { name: "Sneakers", href: "/collections/men/sneakers" },
        { name: "Boots", href: "/collections/men/boots" },
        { name: "Formal Shoes", href: "/collections/men/formal-shoes" },
        { name: "Accessories", href: "/collections/men/accessories" },
      ],
    },
    women: {
      title: "Women's Collection",
      items: [
        { name: "Dresses", href: "/collections/women/dresses" },
        { name: "Tops", href: "/collections/women/tops" },
        { name: "Jeans", href: "/collections/women/jeans" },
        { name: "Skirts", href: "/collections/women/skirts" },
        { name: "Activewear", href: "/collections/women/activewear" },
        { name: "Swimwear", href: "/collections/women/swimwear" },
        { name: "Heels", href: "/collections/women/heels" },
        { name: "Flats", href: "/collections/women/flats" },
        { name: "Boots", href: "/collections/women/boots" },
        { name: "Jewelry", href: "/collections/women/jewelry" },
        { name: "Handbags", href: "/collections/women/handbags" },
      ],
    },
    kids: {
      title: "Kids Collection",
      items: [
        { name: "Boys Clothing", href: "/collections/kids/boys" },
        { name: "Girls Clothing", href: "/collections/kids/girls" },
        { name: "Baby Clothes", href: "/collections/kids/baby" },
        { name: "School Wear", href: "/collections/kids/school-wear" },
        { name: "Party Wear", href: "/collections/kids/party-wear" },
        { name: "Shoes", href: "/collections/kids/shoes" },
        { name: "Toys", href: "/collections/kids/toys" },
      ],
    },
    home: {
      title: "Home Collection",
      items: [
        { name: "Living Room", href: "/collections/home/living-room" },
        { name: "Bedroom", href: "/collections/home/bedroom" },
        { name: "Kitchen", href: "/collections/home/kitchen" },
        { name: "Dining", href: "/collections/home/dining" },
        { name: "Decor", href: "/collections/home/decor" },
        { name: "Lighting", href: "/collections/home/lighting" },
      ],
    },
  };

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleCloseDrawer = () => {
    const drawerCheckbox = document.getElementById(
      "my-drawer-7",
    ) as HTMLInputElement;
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  return (
    <div className="h-full">
      {/* User Info Section */}
      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
          <FaUser className="text-gray-600 text-2xl" />
        </div>
        <div className="flex-1">
          {isLoggedIn ? (
            <>
              <h3 className="font-bold text-gray-900 text-lg">{userName}</h3>
              <p className="text-sm text-gray-600">{userEmail}</p>
              <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Premium Member
              </span>
            </>
          ) : (
            <>
              <h3 className="font-bold text-gray-900 text-lg">Welcome!</h3>
              <p className="text-sm text-gray-600">
                Sign in to access your account
              </p>
              <div className="flex space-x-2 mt-2">
                <label
                  htmlFor="my-drawer-6"
                  className="px-3 py-1 bg-black text-white text-sm rounded-lg cursor-pointer"
                  onClick={handleCloseDrawer}
                >
                  Sign In
                </label>
                <Link
                  href="/create/account"
                  className="px-3 py-1 border border-black text-black text-sm rounded-lg"
                  onClick={handleCloseDrawer}
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 text-lg mb-4 px-2">
          Shop Categories
        </h3>
        <div className="space-y-2">
          {Object.entries(categories).map(([key, category]) => (
            <div key={key} className="border-b border-gray-100">
              <button
                onClick={() => toggleCategory(key)}
                className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="font-medium text-gray-800">
                      {key.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium text-gray-800">
                    {category.title}
                  </span>
                </div>
                {activeCategory === key ? (
                  <FaChevronDown className="text-gray-400" />
                ) : (
                  <FaChevronRight className="text-gray-400" />
                )}
              </button>

              {/* Category Dropdown */}
              {activeCategory === key && (
                <div className="pl-4 pr-2 pb-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {category.items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="p-2 text-sm text-gray-700 hover:text-black hover:bg-white rounded-md transition-colors"
                          onClick={handleCloseDrawer}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 text-lg mb-4 px-2">
          Quick Links
        </h3>
        <div className="grid grid-cols-2 gap-3 px-2">
          <Link
            href="/new-arrivals"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-2">
              <span className="text-blue-600 font-bold">NEW</span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              New Arrivals
            </span>
          </Link>

          <Link
            href="/sale"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mb-2">
              <span className="text-red-600 font-bold">SALE</span>
            </div>
            <span className="text-sm font-medium text-gray-800">Sale</span>
          </Link>

          <Link
            href="/best-sellers"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-2">
              <span className="text-green-600 font-bold">TOP</span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              Best Sellers
            </span>
          </Link>

          <Link
            href="/trending"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mb-2">
              <span className="text-purple-600 font-bold">🔥</span>
            </div>
            <span className="text-sm font-medium text-gray-800">Trending</span>
          </Link>
        </div>
      </div>

      {/* Account Links */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 text-lg mb-4 px-2">
          My Account
        </h3>
        <div className="space-y-1 px-2">
          <Link
            href="/account"
            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaUser className="text-gray-600" size={16} />
            </div>
            <span className="text-gray-800">My Profile</span>
          </Link>

          <Link
            href="/account/orders"
            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaShoppingBag className="text-gray-600" size={16} />
            </div>
            <span className="text-gray-800">My Orders</span>
          </Link>

          <Link
            href="/wishlist"
            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaHeart className="text-gray-600" size={16} />
            </div>
            <span className="text-gray-800">My Wishlist</span>
          </Link>

          <Link
            href="/account/addresses"
            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaMapMarkerAlt className="text-gray-600" size={16} />
            </div>
            <span className="text-gray-800">Saved Addresses</span>
          </Link>

          <Link
            href="/account/payments"
            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaCreditCard className="text-gray-600" size={16} />
            </div>
            <span className="text-gray-800">Payment Methods</span>
          </Link>
        </div>
      </div>

      {/* Support & Help */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 text-lg mb-4 px-2">
          Help & Support
        </h3>
        <div className="space-y-1 px-2">
          <Link
            href="/help"
            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg">?</span>
            </div>
            <span className="text-gray-800">Help Center</span>
          </Link>

          <Link
            href="/contact"
            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-medium">✉️</span>
            </div>
            <span className="text-gray-800">Contact Us</span>
          </Link>

          <Link
            href="/about"
            className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleCloseDrawer}
          >
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-medium">i</span>
            </div>
            <span className="text-gray-800">About Us</span>
          </Link>
        </div>
      </div>

      {/* Logout Button (only show if logged in) */}
      {isLoggedIn && (
        <div className="px-2">
          <button
            onClick={() => {
              // Handle logout logic here
              handleCloseDrawer();
            }}
            className="flex items-center justify-center space-x-2 w-full p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          >
            <FaSignOutAlt />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}

      {/* Footer Links */}
      <div className="mt-8 pt-6 border-t border-gray-200 px-2">
        <div className="grid grid-cols-3 gap-4">
          <Link
            href="/terms"
            className="text-xs text-gray-500 hover:text-black"
            onClick={handleCloseDrawer}
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-xs text-gray-500 hover:text-black"
            onClick={handleCloseDrawer}
          >
            Privacy
          </Link>
          <Link
            href="/return-policy"
            className="text-xs text-gray-500 hover:text-black"
            onClick={handleCloseDrawer}
          >
            Returns
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center">
          © 2024 HEATTY. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Navmenu;
