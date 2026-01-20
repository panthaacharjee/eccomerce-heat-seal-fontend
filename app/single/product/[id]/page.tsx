"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/Product/ProductCard";

// Define extended Product interface locally to include features and size prices
interface Product {
  id: number;
  title: string;
  productType: string;
  basePrice: number;
  price: number;
  size?: string;
  availableSizes?: Array<{
    size: string;
    price: number;
    stock: number;
  }>;
  image?: string;
  images?: string[];
  description?: string;
  rating?: number;
  features?: string[];
}

// Mock product data - replace with your actual data source
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Classic Cotton T-Shirt",
    productType: "Clothing",
    basePrice: 24.99,
    price: 24.99, // Default price for medium
    size: "M",
    availableSizes: [
      { size: "S", price: 22.99, stock: 15 },
      { size: "M", price: 24.99, stock: 20 },
      { size: "L", price: 26.99, stock: 18 },
      { size: "XL", price: 28.99, stock: 12 },
      { size: "XXL", price: 30.99, stock: 8 },
    ],
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_1000x.jpg?v=1735204394",
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_1000x.jpg?v=1758188180",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1000&auto=format&fit=crop",
    ],
    description:
      "Comfortable 100% cotton t-shirt for everyday wear. Made from premium quality fabric that ensures breathability and softness against the skin. Perfect for casual outings, workouts, or just lounging at home. Available in multiple colors and sizes to fit your style.",
    features: [
      "100% Premium Cotton",
      "Breathable & Soft Fabric",
      "Machine Wash Safe",
      "Available in Multiple Colors",
      "Regular Fit Design",
    ],
    rating: 4.5,
  },
  {
    id: 2,
    title: "Wireless Bluetooth Headphones",
    productType: "Electronics",
    basePrice: 89.99,
    price: 89.99,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1000&auto=format&fit=crop",
    ],
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life. Experience crystal-clear audio with deep bass and crisp highs. Ergonomic design with memory foam ear cushions for all-day comfort. Perfect for travel, work, or immersive music listening.",
    features: [
      "Active Noise Cancellation",
      "30-Hour Battery Life",
      "Bluetooth 5.2",
      "Memory Foam Ear Cushions",
      "Built-in Microphone",
    ],
    rating: 4.8,
  },
  {
    id: 3,
    title: "Stainless Steel Water Bottle",
    productType: "Accessories",
    basePrice: 29.99,
    price: 29.99, // Default price for 750ml
    size: "750ml",
    availableSizes: [
      { size: "500ml", price: 24.99, stock: 25 },
      { size: "750ml", price: 29.99, stock: 30 },
      { size: "1L", price: 34.99, stock: 22 },
      { size: "1.5L", price: 39.99, stock: 15 },
    ],
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&auto=format&fit=crop",
    ],
    description:
      "Insulated stainless steel bottle keeps drinks hot/cold for 24 hours. Double-wall vacuum insulation technology. Leak-proof design with easy carry handle.",
    features: [
      "24-Hour Temperature Control",
      "Double-Wall Vacuum Insulation",
      "Leak-Proof Design",
      "BPA-Free Material",
      "Easy Carry Handle",
    ],
    rating: 4.7,
  },
  {
    id: 4,
    title: "Organic Coffee Beans",
    productType: "Food",
    basePrice: 15.99,
    price: 15.99, // Default price for 1lb
    size: "1lb",
    availableSizes: [
      { size: "0.5lb", price: 9.99, stock: 40 },
      { size: "1lb", price: 15.99, stock: 35 },
      { size: "2lb", price: 28.99, stock: 20 },
      { size: "5lb", price: 64.99, stock: 10 },
    ],
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=1000&auto=format&fit=crop",
    ],
    description:
      "Premium organic coffee beans, medium roast. Sourced from sustainable farms with rich flavor notes of chocolate and citrus.",
    features: [
      "100% Organic",
      "Medium Roast",
      "Sustainable Sourcing",
      "Rich Chocolate Notes",
      "Freshly Roasted",
    ],
    rating: 4.6,
  },
  {
    id: 5,
    title: "Yoga Mat Premium",
    productType: "Fitness",
    basePrice: 34.99,
    price: 34.99, // Default price for Large
    size: "L",
    availableSizes: [
      { size: "S", price: 29.99, stock: 20 },
      { size: "M", price: 32.99, stock: 25 },
      { size: "L", price: 34.99, stock: 30 },
      { size: "XL", price: 39.99, stock: 15 },
    ],
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1000&auto=format&fit=crop",
    ],
    description:
      "Non-slip yoga mat with carrying strap. Eco-friendly material with perfect thickness for joint support during workouts.",
    features: [
      "Non-Slip Surface",
      "Eco-Friendly Material",
      "6mm Thickness",
      "Includes Carrying Strap",
      "Joint Support Design",
    ],
    rating: 4.4,
  },
  {
    id: 6,
    title: "Leather Wallet",
    productType: "Accessories",
    basePrice: 45.5,
    price: 45.5,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=1000&auto=format&fit=crop",
    ],
    description:
      "Genuine leather wallet with multiple card slots and RFID blocking technology to protect your cards from unauthorized scans.",
    features: [
      "Genuine Leather",
      "8 Card Slots",
      "RFID Blocking",
      "Coin Pocket",
      "Money Clip",
    ],
    rating: 4.3,
  },
  {
    id: 7,
    title: "Gaming Mouse",
    productType: "Electronics",
    basePrice: 59.99,
    price: 59.99,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=1000&auto=format&fit=crop",
    ],
    description:
      "RGB gaming mouse with programmable buttons and high-precision sensor for competitive gaming performance.",
    features: [
      "Programmable Buttons",
      "RGB Lighting",
      "High-Precision Sensor",
      "Ergonomic Design",
      "Braided Cable",
    ],
    rating: 4.9,
  },
  {
    id: 8,
    title: "Running Shoes",
    productType: "Footwear",
    basePrice: 79.99,
    price: 79.99, // Default price for size 10
    size: "10",
    availableSizes: [
      { size: "8", price: 79.99, stock: 18 },
      { size: "9", price: 79.99, stock: 22 },
      { size: "10", price: 79.99, stock: 25 },
      { size: "11", price: 82.99, stock: 15 },
      { size: "12", price: 84.99, stock: 12 },
    ],
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop",
    ],
    description:
      "Lightweight running shoes with breathable mesh upper and responsive cushioning for maximum comfort during runs.",
    features: [
      "Breathable Mesh Upper",
      "Responsive Cushioning",
      "Non-Slip Outsole",
      "Lightweight Design",
      "Arch Support",
    ],
    rating: 4.7,
  },
];

export default function ProductDetailPage() {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState<Product | null>(mockProducts[0]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  const [selectedSize, setSelectedSize] = useState<string>("");
  const productImageRef = useRef<HTMLDivElement>(null);
  const cartIconRef = useRef<HTMLDivElement>(null);

  const productId = searchParams.get("productid");
  const productTitle = searchParams.get("q");

  // Calculate total price based on selected size and quantity
  const getCurrentPrice = () => {
    if (!product) return 0;

    // If product has available sizes and a size is selected
    if (product.availableSizes && selectedSize) {
      const selectedSizeObj = product.availableSizes.find(
        (s) => s.size === selectedSize,
      );
      return selectedSizeObj ? selectedSizeObj.price : product.price;
    }

    return product.price;
  };

  const totalPrice = getCurrentPrice() * quantity;

  // Handle size selection
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  // Get stock for selected size
  const getSelectedSizeStock = () => {
    if (!product || !selectedSize || !product.availableSizes) return 0;
    const sizeObj = product.availableSizes.find((s) => s.size === selectedSize);
    return sizeObj ? sizeObj.stock : 0;
  };

  // Save viewed product to localStorage
  const saveViewedProduct = (product: Product) => {
    if (typeof window !== "undefined") {
      try {
        const viewed = localStorage.getItem("viewedProducts");
        let viewedProducts = viewed ? JSON.parse(viewed) : [];

        // Remove if already exists (to avoid duplicates)
        viewedProducts = viewedProducts.filter(
          (p: Product) => p.id !== product.id,
        );

        // Add to beginning of array
        viewedProducts.unshift(product);

        // Keep only last 10 viewed products
        viewedProducts = viewedProducts.slice(0, 10);

        localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
        setViewedProducts(viewedProducts);
      } catch (error) {
        console.error("Error saving viewed product:", error);
      }
    }
  };

  // Get viewed products from localStorage
  const getViewedProducts = () => {
    if (typeof window !== "undefined") {
      try {
        const viewed = localStorage.getItem("viewedProducts");
        return viewed ? JSON.parse(viewed) : [];
      } catch (error) {
        console.error("Error getting viewed products:", error);
        return [];
      }
    }
    return [];
  };

  // Get cart from localStorage
  const getCartFromStorage = () => {
    if (typeof window !== "undefined") {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  };

  // Save cart to localStorage
  const saveCartToStorage = (cart: any[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const id = productId ? parseInt(productId) : 1;
        const foundProduct = mockProducts.find((p) => p.id === id);

        if (foundProduct) {
          setProduct(foundProduct);

          // Set default selected size
          if (
            foundProduct.availableSizes &&
            foundProduct.availableSizes.length > 0
          ) {
            // Set to product size if available, otherwise first available size
            const defaultSize =
              foundProduct.size || foundProduct.availableSizes[0].size;
            setSelectedSize(defaultSize);
          } else if (foundProduct.size) {
            setSelectedSize(foundProduct.size);
          }

          // Save to viewed products
          saveViewedProduct(foundProduct);

          // Get viewed products for display
          const viewed = getViewedProducts();
          setViewedProducts(viewed);

          // Find related products (same type, excluding current)
          const related = mockProducts.filter(
            (p) => p.productType === foundProduct.productType && p.id !== id,
          );
          setRelatedProducts(related.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = (product: Product, qty: number = quantity) => {
    if (!product) return;

    // Start animation
    if (productImageRef.current && cartIconRef.current) {
      const productRect = productImageRef.current.getBoundingClientRect();
      const cartRect = cartIconRef.current.getBoundingClientRect();

      setAnimationPosition({
        x: productRect.left + productRect.width / 2,
        y: productRect.top + productRect.height / 2,
      });
      setIsAnimating(true);

      // Get existing cart
      const cart = getCartFromStorage();

      // Check if product already exists in cart with same size
      const existingItemIndex = cart.findIndex(
        (item: any) =>
          item.id === product.id && item.selectedSize === selectedSize,
      );

      if (existingItemIndex > -1) {
        // Update quantity if product exists with same size
        cart[existingItemIndex].quantity += qty;
      } else {
        // Add new product to cart with selected size
        cart.push({
          ...product,
          quantity: qty,
          selectedSize: selectedSize,
          price: getCurrentPrice(),
          addedAt: new Date().toISOString(),
        });
      }

      // Save to localStorage
      saveCartToStorage(cart);

      // Show notification
      showNotification(
        `${product.title} ${selectedSize ? `(${selectedSize})` : ""} added to cart!`,
      );

      // Reset animation after completion
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };

  const route = useRouter();

  const handleBuyNow = () => {
    return route.push("/order");
  };

  const showNotification = (message: string) => {
    // Create notification element
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.add("animate-fade-out");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const increaseQuantity = () => {
    const stock = getSelectedSizeStock();
    if (quantity < stock || stock === 0) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Filter viewed products to exclude current product and related products
  const filteredViewedProducts = viewedProducts
    .filter(
      (viewedProduct) =>
        viewedProduct.id !== product?.id &&
        !relatedProducts.some((related) => related.id === viewedProduct.id),
    )
    .slice(0, 3); // Show only 3 recently viewed

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  const productImages = product.images || [product.image || "/placeholder.jpg"];
  const hasSizeOptions =
    product.availableSizes && product.availableSizes.length > 0;
  const selectedSizeStock = getSelectedSizeStock();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Animation element */}
      {isAnimating && (
        <div className="fixed z-50 pointer-events-none">
          <div
            className="absolute w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-fly-to-cart"
            style={{
              left: animationPosition.x,
              top: animationPosition.y,
            }}
          />
        </div>
      )}

      {/* Cart Icon Reference */}
      <div ref={cartIconRef} className="fixed top-4 right-20 z-40"></div>

      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <a href="/" className="hover:text-gray-900">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href="/collections" className="hover:text-gray-900">
          Products
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.title}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image Gallery */}
        <div className="space-y-4" ref={productImageRef}>
          {/* Main Image with Zoom */}
          <div
            className={`relative bg-gray-100 rounded-xl overflow-hidden cursor-${isZoomed ? "zoom-out" : "zoom-in"}`}
            onClick={toggleZoom}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {productImages[selectedImageIndex] ? (
              <div className="relative aspect-square">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={`${product.title} - Image ${selectedImageIndex + 1}`}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isZoomed ? "scale-150" : "scale-100"
                  }`}
                  style={{
                    transformOrigin: isZoomed
                      ? `${zoomPosition.x}% ${zoomPosition.y}%`
                      : "center",
                  }}
                />
                {isZoomed && (
                  <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                    <span className="text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                      Click to zoom out
                    </span>
                  </div>
                )}
                {!isZoomed && (
                  <div className="absolute bottom-4 right-4">
                    <button
                      className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleZoom();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                <i className="fas fa-image text-6xl text-gray-400"></i>
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-gray-900 ring-2 ring-gray-900 ring-opacity-20"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {productTitle || product.title}
          </h1>

          <div className="mb-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-gray-900">
                ${getCurrentPrice().toFixed(2)}
              </span>
              {product.basePrice !== getCurrentPrice() && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.basePrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium bg-red-100 text-red-800 px-2 py-1 rounded">
                    Save ${(product.basePrice - getCurrentPrice()).toFixed(2)}
                  </span>
                </>
              )}
            </div>
            <span className="text-lg text-gray-500 ml-2">USD</span>
            {product.rating && (
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating!)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{product.rating}/5</span>
                <span className="ml-4 text-gray-500 text-sm">
                  (128 reviews)
                </span>
              </div>
            )}
          </div>

          {/* Size Selection */}
          {hasSizeOptions && (
            <div className="mb-6">
              <label className="block text-gray-600 mb-3 font-medium">
                Select Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes!.map((sizeOption) => {
                  const isSelected = selectedSize === sizeOption.size;
                  const isOutOfStock = sizeOption.stock === 0;
                  return (
                    <button
                      key={sizeOption.size}
                      onClick={() =>
                        !isOutOfStock && handleSizeSelect(sizeOption.size)
                      }
                      disabled={isOutOfStock}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        isSelected
                          ? "bg-gray-900 text-white border-gray-900"
                          : isOutOfStock
                            ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-medium">{sizeOption.size}</span>
                        <span
                          className={`text-sm ${isSelected ? "text-gray-300" : "text-gray-500"}`}
                        >
                          ${sizeOption.price.toFixed(2)}
                        </span>
                        {isOutOfStock && (
                          <span className="text-xs text-red-500 mt-1">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              {selectedSize && (
                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Selected: </span>
                  {selectedSize} - ${getCurrentPrice().toFixed(2)}
                  {selectedSizeStock > 0 && (
                    <span className="ml-4 text-green-600">
                      {selectedSizeStock} in stock
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Description Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {product.description || "No description available."}
            </p>

            {product.features && product.features.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Key Features:
                </h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="pl-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-center">
              <span className="w-32 text-gray-600">Product Type:</span>
              <span className="font-medium">{product.productType}</span>
            </div>
            {product.size && !hasSizeOptions && (
              <div className="flex items-center">
                <span className="w-32 text-gray-600">Size:</span>
                <span className="font-medium">{product.size}</span>
              </div>
            )}
            <div className="flex items-center">
              <span className="w-32 text-gray-600">Product ID:</span>
              <span className="font-medium">{product.id}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 text-gray-600">Availability:</span>
              <span
                className={`font-medium ${selectedSizeStock > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {selectedSizeStock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Quantity Selector with Improved UI */}
          <div className="mb-8">
            <label className="block text-gray-600 mb-3 font-medium">
              Quantity
            </label>
            <div className="flex items-center">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div className="w-16 text-center py-3 bg-white text-gray-900 font-medium">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    selectedSizeStock > 0 && quantity >= selectedSizeStock
                  }
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <div className="ml-4">
                <span className="text-lg font-semibold text-gray-900">
                  Total: ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
            {selectedSizeStock > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                {selectedSizeStock} items available
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => product && handleAddToCart(product)}
                disabled={selectedSizeStock === 0 && hasSizeOptions}
                className={`w-full py-4 px-6 rounded-lg transition-colors font-medium flex items-center justify-center gap-3 group ${
                  selectedSizeStock === 0 && hasSizeOptions
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {selectedSizeStock === 0 && hasSizeOptions
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className={`w-full py-4 px-6 rounded-lg transition-colors font-medium flex items-center justify-center gap-3 group ${
                  selectedSizeStock === 0 && hasSizeOptions
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Buy Now
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Add to Wishlist
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Share
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-gray-900 font-medium mb-1">
                  Free Shipping
                </div>
                <div className="text-gray-600 text-sm">On orders over $50</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-medium mb-1">
                  30-Day Returns
                </div>
                <div className="text-gray-600 text-sm">
                  Money back guarantee
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 font-medium mb-1">
                  Secure Payment
                </div>
                <div className="text-gray-600 text-sm">SSL encrypted</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add these styles to your global CSS or use a CSS-in-JS solution */}
      <style jsx global>{`
        @keyframes flyToCart {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(calc(50vw - 50px), -100px) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translate(calc(100vw - 100px), calc(-100vh + 100px))
              scale(0.1);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        .animate-fly-to-cart {
          animation: flyToCart 1s ease-in-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-fade-out {
          animation: fadeOut 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
