"use client";
import React, { useState } from "react";
import Link from "next/link";

/* ============= React Icons ============= */
import { FaBagShopping, FaChevronRight } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

// Type definitions
interface DropdownColumn {
  title: string;
  items: string[];
}

interface DropdownContent {
  title: string;
  columns: DropdownColumn[];
  image: string;
  featured?: {
    title: string;
    description: string;
    link: string;
  };
}

type DropdownType = "winter-25-26" | "men" | "women" | "kids" | "home";

interface NavItem {
  id: DropdownType;
  label: string;
}

const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<DropdownType | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dropdown content data
  const dropdownContent: Record<DropdownType, DropdownContent> = {
    "winter-25-26": {
      title: "Winter 25-26 Collection",
      columns: [
        {
          title: "New Arrivals",
          items: ["Coats & Jackets", "Sweaters", "Winter Boots", "Accessories"],
        },
        {
          title: "Featured",
          items: [
            "Sustainable Collection",
            "Limited Edition",
            "Celebrity Picks",
            "Best Sellers",
          ],
        },
        {
          title: "Shop By",
          items: [
            "Trending Now",
            "Under $100",
            "Winter Essentials",
            "Gift Guide",
          ],
        },
      ],
      image: "/images/winter-collection.jpg",
      featured: {
        title: "Winter Sale",
        description: "Up to 50% off on winter essentials",
        link: "/sale/winter",
      },
    },
    men: {
      title: "Men's Collection",
      columns: [
        {
          title: "Clothing",
          items: [
            "T-Shirts",
            "Jeans",
            "Jackets",
            "Sweatshirts",
            "Shorts",
            "Suits",
          ],
        },
        {
          title: "Footwear",
          items: ["Sneakers", "Boots", "Sandals", "Formal Shoes", "Slides"],
        },
        {
          title: "Accessories",
          items: ["Watches", "Bags", "Sunglasses", "Belts", "Hats"],
        },
      ],
      image: "/images/mens-collection.jpg",
      featured: {
        title: "New Arrivals",
        description: "Latest styles for men",
        link: "/new/men",
      },
    },
    women: {
      title: "Women's Collection",
      columns: [
        {
          title: "Clothing",
          items: [
            "Dresses",
            "Tops",
            "Jeans",
            "Skirts",
            "Activewear",
            "Swimwear",
          ],
        },
        {
          title: "Footwear",
          items: ["Heels", "Flats", "Boots", "Sandals", "Sneakers"],
        },
        {
          title: "Accessories",
          items: ["Jewelry", "Handbags", "Scarves", "Hats", "Sunglasses"],
        },
      ],
      image: "/images/womens-collection.jpg",
      featured: {
        title: "Summer Collection",
        description: "Light and breezy styles",
        link: "/summer/women",
      },
    },
    kids: {
      title: "Kids Collection",
      columns: [
        {
          title: "Boys",
          items: ["T-Shirts", "Jeans", "Jackets", "School Wear", "Sports"],
        },
        {
          title: "Girls",
          items: ["Dresses", "Tops", "Leggings", "Party Wear", "Skirts"],
        },
        {
          title: "Baby",
          items: ["Onesies", "Rompers", "Sleepwear", "Accessories", "Toys"],
        },
      ],
      image: "/images/kids-collection.jpg",
      featured: {
        title: "Back to School",
        description: "Everything for the new school year",
        link: "/school/kids",
      },
    },
    home: {
      title: "Home Collection",
      columns: [
        {
          title: "Living Room",
          items: ["Sofas", "Coffee Tables", "Rugs", "Lighting", "Decor"],
        },
        {
          title: "Bedroom",
          items: ["Bedding", "Furniture", "Storage", "Lighting", "Decor"],
        },
        {
          title: "Kitchen",
          items: [
            "Cookware",
            "Dinnerware",
            "Appliances",
            "Utensils",
            "Storage",
          ],
        },
      ],
      image: "/images/home-collection.jpg",
      featured: {
        title: "Home Refresh",
        description: "Transform your space",
        link: "/home/sale",
      },
    },
  };

  const navItems: NavItem[] = [
    { id: "winter-25-26", label: "Winter 25-26" },
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "home", label: "Home" },
  ];

  const handleDropdownMouseEnter = (id: DropdownType) => {
    setActiveDropdown(id);
  };

  const handleDropdownMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Mobile dropdown handler
  const handleMobileDropdownToggle = (id: DropdownType) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="relative">
      {/* Conditionally render top navbar only when dropdown is NOT active */}
      {!activeDropdown && (
        <>
          {/* Top Navigation */}
          <div className="container mx-auto flex justify-between items-center py-3 px-4 lg:px-0">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>

            <div className="lg:ml-0 ml-auto lg:mx-auto">
              <p className="text-3xl tracking-[10px] font-medium text-center lg:text-left">
                HEATTY
              </p>
            </div>

            {/* Desktop Search and Icons */}
            <div className="hidden lg:block">
              <div className="flex justify-end">
                <label className="input bg-black text-white outline-none text-md">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    type="search"
                    className="grow placeholder:text-white bg-transparent"
                    placeholder="Search"
                  />
                </label>
              </div>
              <div className="mt-4 flex">
                <Link
                  href={"/cart"}
                  className="flex items-center mr-4 hover:text-gray-300 transition-colors"
                >
                  <FaBagShopping className="w-5 h-5" />
                  <p className="mx-2 text-xs">Cart</p>
                </Link>
                <Link
                  href={"/wishlist"}
                  className="flex items-center mr-4 hover:text-gray-300 transition-colors"
                >
                  <CiHeart className="w-6 h-6" />
                  <p className="mx-2 text-xs">Wishlist</p>
                </Link>
                <Link
                  href={"/signin"}
                  className="flex items-center hover:text-gray-300 transition-colors"
                >
                  <p className="mx-2 text-xs">Sign In</p>
                </Link>
                <span className="text-xs mx-1">Or</span>
                <Link
                  href={"/register"}
                  className="flex items-center hover:text-gray-300 transition-colors"
                >
                  <p className="ml-2 text-xs">Register</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Search and Icons */}
          <div className="lg:hidden container mx-auto px-4 mt-2">
            <div className="flex justify-between items-center">
              <div className="flex-1 mr-4">
                <label className="input bg-black text-white outline-none text-sm w-full">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    type="search"
                    className="grow placeholder:text-white bg-transparent w-full"
                    placeholder="Search products..."
                  />
                </label>
              </div>
              <div className="flex space-x-4">
                <Link href={"/cart"} aria-label="Shopping cart">
                  <FaBagShopping className="w-5 h-5" />
                </Link>
                <Link href={"/wishlist"} aria-label="Wishlist">
                  <CiHeart className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Navigation Bar - Always visible but changes color when dropdown is active */}
      <div
        className={`mt-3 relative z-50 ${
          activeDropdown ? "bg-white" : "bg-black"
        }`}
      >
        <div className="container mx-auto">
          {/* Desktop Navigation */}
          <div
            className={`hidden lg:flex items-center justify-center text-sm font-medium py-3 ${
              activeDropdown ? "text-black" : "text-white"
            }`}
          >
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`mr-10 uppercase cursor-pointer transition-colors py-2 relative group ${
                  activeDropdown ? "hover:text-gray-700" : "hover:text-gray-300"
                }`}
                onMouseEnter={() => handleDropdownMouseEnter(item.id)}
                onMouseLeave={() => handleDropdownMouseLeave()}
              >
                {item.label}
                {/* Underline indicator */}
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-200 ${
                    activeDropdown === item.id
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  } ${activeDropdown ? "bg-black" : "bg-white"}`}
                ></div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-black text-white py-4 px-4">
              {navItems.map((item) => (
                <div key={item.id} className="mb-2">
                  <button
                    className="flex items-center justify-between w-full uppercase py-3 text-left border-b border-gray-800"
                    onClick={() => handleMobileDropdownToggle(item.id)}
                  >
                    <span>{item.label}</span>
                    <FaChevronRight
                      className={`transition-transform ${
                        activeDropdown === item.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Dropdown Content */}
                  {activeDropdown === item.id && (
                    <div className="bg-gray-900 p-4 mt-2 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3">
                        {dropdownContent[item.id].title}
                      </h3>
                      <div className="space-y-4">
                        {dropdownContent[item.id].columns.map(
                          (column, index) => (
                            <div key={index}>
                              <h4 className="font-medium mb-2 text-gray-300">
                                {column.title}
                              </h4>
                              <ul className="space-y-1 pl-2">
                                {column.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link
                                      href={`/category/${subItem
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                      className="text-gray-400 hover:text-white text-sm py-1 block"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {subItem}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                      {dropdownContent[item.id].featured && (
                        <div className="mt-4 pt-4 border-t border-gray-800">
                          <Link
                            href={dropdownContent[item.id].featured!.link}
                            className="block bg-white text-black px-4 py-2 rounded text-center font-medium hover:bg-gray-200 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {dropdownContent[item.id].featured!.title}
                          </Link>
                          <p className="text-gray-400 text-sm mt-2 text-center">
                            {dropdownContent[item.id].featured!.description}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-6 space-y-3">
                <Link
                  href="/signin"
                  className="block text-center border border-white py-2 rounded hover:bg-white hover:text-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block text-center bg-white text-black py-2 rounded hover:bg-gray-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Full-screen Dropdown */}
      {activeDropdown && dropdownContent[activeDropdown] && (
        <div
          className="fixed inset-0 bg-white z-40 pt-20 overflow-y-auto hidden lg:block"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-2xl text-gray-600 hover:text-black z-50 transition-colors"
            onClick={() => setActiveDropdown(null)}
            aria-label="Close dropdown"
          >
            {/* <FaTimes /> */}
          </button>

          <div className="container mx-auto px-4 py-8">
            {/* Dropdown Header */}
            <div className="mb-8 lg:mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
                {dropdownContent[activeDropdown].title}
              </h2>
              <div className="h-1 w-20 lg:w-24 bg-black"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Content Columns */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {dropdownContent[activeDropdown].columns.map(
                  (column, index) => (
                    <div key={index}>
                      <h3 className="text-lg lg:text-xl font-semibold text-black mb-4 lg:mb-6 pb-2 border-b border-gray-200">
                        {column.title}
                      </h3>
                      <ul className="space-y-3 lg:space-y-4">
                        {column.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={`/category/${item
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="text-gray-700 hover:text-black hover:underline text-base lg:text-lg transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>

              {/* Featured Section */}
              <div className="lg:w-1/3 mt-8 lg:mt-0">
                <div className="bg-gray-100 rounded-lg overflow-hidden h-64 lg:h-96 relative">
                  {/* Fallback image */}
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${dropdownContent[activeDropdown].image})`,
                      backgroundColor: "#f3f4f6",
                    }}
                  />
                </div>

                {dropdownContent[activeDropdown].featured && (
                  <div className="mt-6">
                    <h4 className="text-xl font-bold text-black mb-2">
                      {dropdownContent[activeDropdown].featured!.title}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {dropdownContent[activeDropdown].featured!.description}
                    </p>
                    <Link
                      href={dropdownContent[activeDropdown].featured!.link}
                      className="inline-block bg-black text-white px-6 lg:px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
                      onClick={() => setActiveDropdown(null)}
                    >
                      Shop Now
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Promotional Section */}
            <div className="mt-12 lg:mt-16 pt-8 lg:pt-12 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-black mb-2">
                    Free Shipping
                  </div>
                  <p className="text-gray-600 text-sm lg:text-base">
                    On all orders over $50
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-black mb-2">
                    30-Day Returns
                  </div>
                  <p className="text-gray-600 text-sm lg:text-base">
                    Easy return policy
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-black mb-2">
                    Secure Payment
                  </div>
                  <p className="text-gray-600 text-sm lg:text-base">
                    100% secure transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
