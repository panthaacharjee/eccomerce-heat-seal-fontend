// components/ProductGrid.tsx
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Product, SortOption } from "@/components/Product/Product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [sortOption, setSortOption] = useState<SortOption>("title-asc");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [sizeSearch, setSizeSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const sizeDropdownRef = useRef<HTMLDivElement>(null);
  const priceDropdownRef = useRef<HTMLDivElement>(null);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Get unique product types
  const productTypes = useMemo(() => {
    return [...new Set(products.map((product) => product.productType))];
  }, [products]);

  // Get unique sizes
  const allSizes = useMemo(() => {
    return [
      ...new Set(products.map((p) => p.size).filter(Boolean)),
    ] as string[];
  }, [products]);

  // Filter sizes based on search
  const filteredSizes = useMemo(() => {
    if (!sizeSearch.trim()) return allSizes;
    return allSizes.filter((size) =>
      size.toLowerCase().includes(sizeSearch.toLowerCase()),
    );
  }, [allSizes, sizeSearch]);

  // Filter types based on search
  const filteredTypes = useMemo(() => {
    if (!typeSearch.trim()) return productTypes;
    return productTypes.filter((type) =>
      type.toLowerCase().includes(typeSearch.toLowerCase()),
    );
  }, [productTypes, typeSearch]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by product types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.productType && selectedTypes.includes(product.productType),
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max,
    );

    // Filter by sizes (if any selected)
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(
        (product) => product.size && selectedSizes.includes(product.size),
      );
    }

    // Sort products
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "size-asc":
          return (a.size || "").localeCompare(b.size || "");
        case "size-desc":
          return (b.size || "").localeCompare(a.size || "");
        default:
          return 0;
      }
    });
  }, [products, sortOption, selectedTypes, priceRange, selectedSizes]);

  // Calculate min and max price from products
  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  // Initialize price range with bounds
  useEffect(() => {
    if (priceBounds.min !== undefined && priceBounds.max !== undefined) {
      setPriceRange({ min: priceBounds.min, max: priceBounds.max });
    }
  }, [priceBounds]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / productsPerPage,
  );

  // Handle size selection
  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  // Handle type selection
  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedTypes([]);
    setSortOption("title-asc");
    setPriceRange({ min: priceBounds.min, max: priceBounds.max });
    setSelectedSizes([]);
    setIsSizeDropdownOpen(false);
    setIsPriceDropdownOpen(false);
    setIsTypeDropdownOpen(false);
    setIsSortDropdownOpen(false);
    setSizeSearch("");
    setTypeSearch("");
    setCurrentPage(1);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sizeDropdownRef.current &&
        !sizeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSizeDropdownOpen(false);
      }

      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPriceDropdownOpen(false);
      }

      if (
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTypeDropdownOpen(false);
      }

      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get sort option display text
  const getSortDisplayText = () => {
    switch (sortOption) {
      case "title-asc":
        return "Title (A-Z)";
      case "title-desc":
        return "Title (Z-A)";
      case "price-asc":
        return "Price (Low to High)";
      case "price-desc":
        return "Price (High to Low)";
      case "size-asc":
        return "Size (Small to Large)";
      case "size-desc":
        return "Size (Large to Small)";
      default:
        return "Sort by";
    }
  };

  // Pagination controls
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // In the middle
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        {/* First Row: Filters and Sort Options */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Left side: 3 Filters (w-8/12) */}
          <div className="w-full md:w-8/12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type Filter - Dropdown Version */}
              <div ref={typeDropdownRef} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <button
                  type="button"
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-left bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 flex justify-between items-center"
                >
                  <span className="text-gray-800">
                    {selectedTypes.length === 0
                      ? "All Types"
                      : `${selectedTypes.length} type${selectedTypes.length > 1 ? "s" : ""} selected`}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isTypeDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Type dropdown */}
                {isTypeDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-hidden flex flex-col">
                    {/* Search input */}
                    <div className="p-3 border-b border-gray-200">
                      <div className="relative">
                        <input
                          type="text"
                          value={typeSearch}
                          onChange={(e) => setTypeSearch(e.target.value)}
                          placeholder="Search types..."
                          className="w-full border border-gray-300 rounded px-3 py-2 pl-9 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                        />
                        <svg
                          className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Type list with checkboxes */}
                    <div className="overflow-y-auto max-h-46">
                      {filteredTypes.length > 0 ? (
                        <div className="p-2">
                          {filteredTypes.map((type) => (
                            <label
                              key={type}
                              className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
                            >
                              <input
                                type="checkbox"
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleTypeToggle(type)}
                                className="h-4 w-4 text-gray-700 rounded border-gray-300 focus:ring-gray-400 mr-3"
                              />
                              <span className="text-sm text-gray-700">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No types found matching "{typeSearch}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Size Filter */}
              {allSizes.length > 0 && (
                <div ref={sizeDropdownRef} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-left bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 flex justify-between items-center"
                  >
                    <span className="text-gray-800">
                      {selectedSizes.length === 0
                        ? "All Sizes"
                        : `${selectedSizes.length} size${selectedSizes.length > 1 ? "s" : ""} selected`}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        isSizeDropdownOpen ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Size dropdown */}
                  {isSizeDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-hidden flex flex-col">
                      {/* Search input */}
                      <div className="p-3 border-b border-gray-200">
                        <div className="relative">
                          <input
                            type="text"
                            value={sizeSearch}
                            onChange={(e) => setSizeSearch(e.target.value)}
                            placeholder="Search sizes..."
                            className="w-full border border-gray-300 rounded px-3 py-2 pl-9 focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
                          />
                          <svg
                            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Size list with checkboxes */}
                      <div className="overflow-y-auto max-h-46">
                        {filteredSizes.length > 0 ? (
                          <div className="p-2">
                            {filteredSizes.map((size) => (
                              <label
                                key={size}
                                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedSizes.includes(size)}
                                  onChange={() => handleSizeToggle(size)}
                                  className="h-4 w-4 text-gray-700 rounded border-gray-300 focus:ring-gray-400 mr-3"
                                />
                                <span className="text-sm text-gray-700">
                                  {size}
                                </span>
                              </label>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-gray-500 text-sm">
                            No sizes found matching "{sizeSearch}"
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Sort Options */}
              <div ref={sortDropdownRef} className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <button
                  type="button"
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-left bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 flex justify-between items-center"
                >
                  <span className="text-gray-800">{getSortDisplayText()}</span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      isSortDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Sort dropdown */}
                {isSortDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg py-2">
                    {[
                      { value: "title-asc", label: "Title (A-Z)" },
                      { value: "title-desc", label: "Title (Z-A)" },
                      { value: "price-asc", label: "Price (Low to High)" },
                      { value: "price-desc", label: "Price (High to Low)" },
                      { value: "size-asc", label: "Size (Small to Large)" },
                      { value: "size-desc", label: "Size (Large to Small)" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSortOption(option.value as SortOption);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                          sortOption === option.value
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side: Price Range Filter (w-4/12) */}
          <div ref={priceDropdownRef} className="w-full md:w-4/12">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <button
              type="button"
              onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
              className="w-full border border-gray-300 rounded px-4 py-2.5 text-left bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 flex justify-between items-center"
            >
              <span className="text-gray-800">
                {priceRange.min === priceBounds.min &&
                priceRange.max === priceBounds.max
                  ? "All Prices"
                  : `$${priceRange.min} - $${priceRange.max}`}
              </span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  isPriceDropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Price dropdown */}
            {isPriceDropdownOpen && (
              <div className="absolute z-10 right-0 md:right-4 mt-1 w-full md:w-96 bg-white border border-gray-300 rounded shadow-lg p-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: ${priceRange.min} - ${priceRange.max}
                    </label>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Min: ${priceRange.min}</span>
                          <span>Max: ${priceRange.max}</span>
                        </div>
                        <input
                          type="range"
                          min={priceBounds.min}
                          max={priceBounds.max}
                          step="1"
                          value={priceRange.min}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              min: Number(e.target.value),
                            }))
                          }
                          className="w-full h-1.5 bg-gray-200 rounded appearance-none cursor-pointer"
                        />
                        <input
                          type="range"
                          min={priceBounds.min}
                          max={priceBounds.max}
                          step="1"
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              max: Number(e.target.value),
                            }))
                          }
                          className="w-full h-1.5 bg-gray-200 rounded appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>${priceBounds.min}</span>
                          <span>${priceBounds.max}</span>
                        </div>
                      </div>

                      {/* Preset price ranges */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Quick select:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setPriceRange({
                                min: priceBounds.min,
                                max: 50,
                              });
                              setIsPriceDropdownOpen(false);
                            }}
                            className="text-sm px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            Under $50
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPriceRange({ min: 50, max: 100 });
                              setIsPriceDropdownOpen(false);
                            }}
                            className="text-sm px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            $50 - $100
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPriceRange({ min: 100, max: 200 });
                              setIsPriceDropdownOpen(false);
                            }}
                            className="text-sm px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            $100 - $200
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setPriceRange({
                                min: 200,
                                max: priceBounds.max,
                              });
                              setIsPriceDropdownOpen(false);
                            }}
                            className="text-sm px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            Over $200
                          </button>
                        </div>
                      </div>

                      {/* Reset price filter */}
                      <button
                        type="button"
                        onClick={() => {
                          setPriceRange({
                            min: priceBounds.min,
                            max: priceBounds.max,
                          });
                          setIsPriceDropdownOpen(false);
                        }}
                        className="w-full text-sm text-gray-700 hover:text-gray-900 py-2 font-medium"
                      >
                        Reset to all prices
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Filters Display with transparent background */}
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedTypes.map((type) => (
            <span
              key={type}
              className="inline-flex items-center gap-1 border border-gray-300 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full"
            >
              Type: {type}
              <button
                onClick={() => handleTypeToggle(type)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          ))}
          {(priceRange.min > priceBounds.min ||
            priceRange.max < priceBounds.max) && (
            <span className="inline-flex items-center gap-1 border border-gray-300 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full">
              Price: ${priceRange.min} - ${priceRange.max}
              <button
                onClick={() =>
                  setPriceRange({ min: priceBounds.min, max: priceBounds.max })
                }
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          )}
          {selectedSizes.map((size) => (
            <span
              key={size}
              className="inline-flex items-center gap-1 border border-gray-300 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full"
            >
              Size: {size}
              <button
                onClick={() => handleSizeToggle(size)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          ))}
          <span className="inline-flex items-center border border-gray-300 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full">
            Sorted by: {getSortDisplayText()}
          </span>
        </div>
      </div>

      {/* Product Grid Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {selectedTypes.length === 0
            ? "All Products"
            : selectedTypes.length === 1
              ? selectedTypes[0]
              : `${selectedTypes.length} Types`}
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({filteredAndSortedProducts.length} products)
          </span>
        </h1>
        <div className="mt-2 md:mt-0 text-sm text-gray-600">
          Showing {indexOfFirstProduct + 1}-
          {Math.min(indexOfLastProduct, filteredAndSortedProducts.length)} of{" "}
          {filteredAndSortedProducts.length} products
        </div>
      </div>

      {/* Product Grid - 4 per row */}
      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
            {currentProducts.map((product, ind) => (
              <ProductCard key={ind} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>

              <div className="flex items-center space-x-2">
                {/* Previous button */}
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded border font-medium ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === "number" && paginate(page)}
                      disabled={page === "..."}
                      className={`w-10 h-10 flex items-center justify-center rounded border font-medium ${
                        page === "..."
                          ? "text-gray-400 border-transparent cursor-default"
                          : currentPage === page
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next button */}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded border font-medium ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  }`}
                >
                  Next
                </button>
              </div>

              {/* Items per page selector */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Show:</span>
                <select
                  value={productsPerPage}
                  onChange={(e) => {
                    // Note: This would require additional state management
                    // For now, it's static at 12
                  }}
                  className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="48">48</option>
                </select>
                <span>per page</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-300 text-6xl mb-4">
            <i className="fas fa-box-open"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-6">
            Try changing your filter criteria
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
