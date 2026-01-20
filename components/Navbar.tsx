"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

/* ============= React Icons ============= */
import {
  FaBagShopping,
  FaChevronRight,
  FaHeart,
  FaXmark,
} from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";

/* ============ Component ================= */
import ShoppingCart from "./ShoppingCart";
import SignIn from "./SignIn";
import Navmenu from "./Navmenu";

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
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const [activeDropdown, setActiveDropdown] = useState<DropdownType | null>(
    null,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      const encodedQuery = encodeURIComponent(trimmedQuery);
      router.push(`/search?q=${encodedQuery}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

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

  const handleDropdownClick = (id: DropdownType) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleCloseDropdown = () => {
    setActiveDropdown(null);
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile search toggle
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Close all mobile menus
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  // Function to close drawer by ID
  const closeDrawer = (drawerId: string) => {
    const checkbox = document.getElementById(drawerId) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
    closeAllMenus();
  };

  return (
    <div className="relative">
      {isTabletOrMobile && (
        <div className="bg-white border-b border-gray-200">
          {/* Search Bar (when open on mobile) */}
          {isSearchOpen && (
            <div className="px-4 py-3 bg-white border-b border-gray-200">
              <form onSubmit={handleSearch} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="mr-3 text-gray-600"
                >
                  <IoClose size={24} />
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Search products..."
                  autoFocus
                />
                <button
                  type="submit"
                  className="ml-2 p-2 bg-black text-white rounded-lg"
                >
                  <FaXmark size={18} />
                </button>
              </form>
            </div>
          )}

          {/* Mobile Header Row */}
          {!isSearchOpen && (
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label htmlFor="my-drawer-7" className="text-2xl text-gray-800">
                  <VscThreeBars />
                </label>
                <button
                  onClick={toggleSearch}
                  className="text-xl text-gray-800"
                >
                  <FaXmark />
                </button>
              </div>

              <Link
                href={"/"}
                className="text-2xl font-bold tracking-widest text-black"
                onClick={closeAllMenus}
              >
                HEATTY
              </Link>

              <div className="flex items-center space-x-4">
                {/* Sign In Button - Opens drawer and shows cross */}
                <label
                  htmlFor="my-drawer-6"
                  className="cursor-pointer text-gray-800"
                  onClick={closeAllMenus}
                >
                  <MdAccountCircle size={28} />
                </label>

                {/* Shopping Cart Button - Opens drawer and shows cross */}
                <label
                  htmlFor="my-drawer-5"
                  className="cursor-pointer text-gray-800 relative"
                  onClick={closeAllMenus}
                >
                  <FaBagShopping size={22} />
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DESKTOP VERSION - Keep your old navbar system */}
      {!isTabletOrMobile && (
        <div className="relative">
          {/* Top navbar - Always show with WHITE background */}
          <div className="bg-white transition-colors duration-300">
            <div className="container mx-auto lg:flex justify-between items-center py-3 px-4 lg:px-0">
              <div className="lg:ml-0 ml-auto lg:mx-auto">
                <Link
                  href={"/"}
                  className="text-3xl tracking-[10px] font-medium text-center lg:text-left text-black"
                >
                  HEATTY
                </Link>
              </div>

              {/* Desktop Search and Icons - Always show on desktop, hide on mobile */}
              <div>
                <form onSubmit={handleSearch} className="flex justify-end">
                  <label className="input bg-white border border-gray-300 text-black outline-none text-md">
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="grow placeholder:text-black bg-transparent"
                      placeholder="Search"
                    />
                  </label>
                </form>
                <div className="mt-4 flex items-center">
                  <label
                    htmlFor="my-drawer-5"
                    className="cursor-pointer flex items-center mr-4 text-black hover:text-gray-700 transition-colors"
                  >
                    <FaBagShopping className="w-5 h-5" />
                    <p className="mx-2 text-xs">Shopping Cart</p>
                  </label>
                  <Link
                    href={"/wishlist"}
                    className="flex items-center mr-4 text-black hover:text-gray-700 transition-colors"
                  >
                    <CiHeart className="w-6 h-6" />
                    <p className="mx-2 text-xs">My Wish list</p>
                  </Link>
                  <label
                    htmlFor="my-drawer-6"
                    className="cursor-pointer flex items-center mr-4 text-black hover:text-gray-700 transition-colors"
                  >
                    <p className="mx-2 text-xs">Sign In</p>
                  </label>
                  <p className="text-xs mx-1 text-black">Or</p>
                  <Link
                    href={"/create/account"}
                    className="flex items-center text-black hover:text-gray-700 transition-colors"
                  >
                    <p className="ml-2 text-xs">Create an Account</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar - WHITE background with BLACK text */}
          <div
            ref={navRef}
            className="relative z-50 bg-black transition-colors duration-300"
          >
            <div className="container mx-auto">
              {/* Desktop Navigation - Always show on desktop */}
              <div className="flex items-center justify-center text-sm font-medium py-3 text-white">
                {navItems.map((item) => (
                  <div
                    key={item.id}
                    className="mr-10 uppercase cursor-pointer transition-colors py-2 relative group "
                    onClick={() => handleDropdownClick(item.id)}
                  >
                    {item.label}
                    {/* Underline indicator */}
                    <div
                      className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-200 ${
                        activeDropdown === item.id
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      } bg-white`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Full-screen Dropdown - Only show on desktop */}
      {activeDropdown &&
        dropdownContent[activeDropdown] &&
        !isTabletOrMobile && (
          <div
            ref={dropdownRef}
            className="fixed inset-0 bg-white z-40 pt-20 overflow-y-auto hidden lg:block"
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-2xl text-gray-600 hover:text-black z-50 transition-colors"
              onClick={handleCloseDropdown}
              aria-label="Close dropdown"
            >
              <FaXmark />
            </button>

            <div className="container mx-auto px-4 py-8">
              {/* Dropdown Header */}
              <div className="mt-20 mb-8 lg:mb-12">
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
                        <ul className="space-y-3 lg:space-y-4">
                          {column.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                href={`/collections/${item
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="text-gray-700 hover:text-black hover:underline text-base lg:text-lg transition-colors"
                                onClick={handleCloseDropdown}
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && isTabletOrMobile && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-50 bg-white lg:hidden"
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Link
              href={"/"}
              className="text-2xl font-bold tracking-widest text-black"
              onClick={closeAllMenus}
            >
              HEATTY
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-2xl text-gray-600"
            >
              <IoClose />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="p-4 overflow-y-auto h-[calc(100vh-64px)]">
            {/* Navigation Links */}
            <div className="space-y-2 mb-8">
              {navItems.map((item) => (
                <div key={item.id} className="border-b border-gray-100 py-3">
                  <button
                    onClick={() => handleDropdownClick(item.id)}
                    className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-800"
                  >
                    {item.label}
                    <FaChevronRight
                      className={`transform transition-transform ${
                        activeDropdown === item.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Dropdown Content */}
                  {activeDropdown === item.id && (
                    <div className="mt-3 pl-4 space-y-2">
                      {dropdownContent[item.id].columns.map((column, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="font-semibold text-gray-700 mb-2">
                            {column.title}
                          </h4>
                          <ul className="space-y-2">
                            {column.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={`/collections/${subItem
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                  className="text-gray-600 hover:text-black block py-1"
                                  onClick={closeAllMenus}
                                >
                                  {subItem}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* User Menu Links */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Sign In Button with Cross Icon */}
                <label
                  htmlFor="my-drawer-6"
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={closeAllMenus}
                >
                  <MdAccountCircle size={32} className="text-gray-700 mb-2" />
                  <span className="text-sm font-medium text-gray-800">
                    Account
                  </span>
                </label>

                {/* Shopping Cart Button with Cross Icon */}
                <label
                  htmlFor="my-drawer-5"
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition-colors relative"
                  onClick={closeAllMenus}
                >
                  <FaBagShopping size={28} className="text-gray-700 mb-2" />
                  <span className="text-sm font-medium text-gray-800">
                    Cart
                  </span>
                  <span className="absolute top-2 right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </label>

                <Link
                  href={"/wishlist"}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
                  onClick={closeAllMenus}
                >
                  <FaHeart size={28} className="text-gray-700 mb-2" />
                  <span className="text-sm font-medium text-gray-800">
                    Wishlist
                  </span>
                </Link>

                <button
                  onClick={toggleSearch}
                  className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
                >
                  <FaXmark size={28} className="text-gray-700 mb-2" />
                  <span className="text-sm font-medium text-gray-800">
                    Search
                  </span>
                </button>
              </div>

              {/* Additional Links */}
              <div className="space-y-3">
                <Link
                  href="/orders"
                  className="block py-2 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={closeAllMenus}
                >
                  My Orders
                </Link>
                <Link
                  href="/track-order"
                  className="block py-2 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={closeAllMenus}
                >
                  Track Order
                </Link>
                <Link
                  href="/help"
                  className="block py-2 px-4 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={closeAllMenus}
                >
                  Help & Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =============================================================== */}
      {/*============================= DRAWER CONTENT ===================*/}
      {/* =============================================================== */}

      {/* Shopping Cart Drawer */}
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-5"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-white min-h-full w-full md:w-[400px] p-4">
            {/* Add close button at top of drawer */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900"></h2>
              <label
                htmlFor="my-drawer-5"
                className="cursor-pointer text-gray-600 hover:text-black"
              >
                <IoClose size={24} />
              </label>
            </div>
            <ShoppingCart />
          </div>
        </div>
      </div>

      {/* Sign In Drawer */}
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-6" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-6"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-white min-h-full w-full md:w-[400px] p-4">
            {/* Add close button at top of drawer */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900"></h2>
              <label
                htmlFor="my-drawer-6"
                className="cursor-pointer text-gray-600 hover:text-black"
              >
                <IoClose size={24} />
              </label>
            </div>
            <SignIn />
          </div>
        </div>
      </div>

      {/* Nav Menu Drawer */}
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-7" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-7"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-white min-h-full w-full md:w-[400px] p-4">
            {/* Add close button at top of drawer */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900"></h2>
              <label
                htmlFor="my-drawer-7"
                className="cursor-pointer text-gray-600 hover:text-black"
              >
                <IoClose size={24} />
              </label>
            </div>
            <Navmenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
