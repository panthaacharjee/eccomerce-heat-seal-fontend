"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

/* ============= React Icons ============= */
import { FaBagShopping, FaChevronRight, FaXmark } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";

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
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const [activeDropdown, setActiveDropdown] = useState<DropdownType | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

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

  // Mobile dropdown handler
  const handleMobileDropdownToggle = (id: DropdownType) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div>
      {isTabletOrMobile && (
        <div className="">
          <div className="bg-white text-black py-1 px-2 flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-4xl cursor-pointer">
                <VscThreeBars />
              </p>
              <p className="text-2xl ml-4 cursor-pointer">
                <FaSearch />
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-center text-2xl font-bold mb-4 tracking-widest mt-3">
                HETTY
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-2xl ml-4">
                <FaBagShopping />
              </p>
              <p className="text-3xl ml-4">
                <MdAccountCircle />
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="relative">
        {/* Top navbar - Always show with WHITE background */}
        <div className="bg-white transition-colors duration-300">
          <div className=" hidden  container mx-auto lg:flex justify-between items-center py-3 px-4 lg:px-0">
            <div className="lg:ml-0 ml-auto lg:mx-auto">
              <p className="text-3xl tracking-[10px] font-medium text-center lg:text-left text-black">
                HEATTY
              </p>
            </div>

            {/* Desktop Search and Icons - Always show on desktop, hide on mobile */}
            <div className="hidden lg:block">
              <div className="flex justify-end">
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
                    className="grow placeholder:text-black bg-transparent"
                    placeholder="Search"
                  />
                </label>
              </div>
              <div className="mt-4 flex items-center">
                <Link
                  href={"/cart"}
                  className="flex items-center mr-4 text-black hover:text-gray-700 transition-colors"
                >
                  <FaBagShopping className="w-5 h-5" />
                  <p className="mx-2 text-xs">Shopping Cart</p>
                </Link>
                <Link
                  href={"/wishlist"}
                  className="flex items-center mr-4 text-black hover:text-gray-700 transition-colors"
                >
                  <CiHeart className="w-6 h-6" />
                  <p className="mx-2 text-xs">My Wish list</p>
                </Link>
                <Link
                  href={"/signin"}
                  className="flex items-center text-black hover:text-gray-700 transition-colors"
                >
                  <p className="mx-2 text-xs">Sign In</p>
                </Link>
                <p className="text-xs mx-1 text-black">Or</p>
                <Link
                  href={"/register"}
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
          className="relative z-50 bg-black  transition-colors duration-300"
        >
          <div className="container mx-auto">
            {/* Desktop Navigation - Always show on desktop */}
            <div className="hidden lg:flex items-center justify-center text-sm font-medium py-3 text-white">
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

        {/* Desktop Full-screen Dropdown - Only show on desktop */}
        {activeDropdown && dropdownContent[activeDropdown] && (
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
              <div className=" mt-20 mb-8 lg:mb-12">
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
                                href={`/category/${item
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
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
