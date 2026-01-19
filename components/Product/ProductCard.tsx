// components/ProductCard.tsx
import { Product } from "./Product";
import { useRouter } from "next/navigation"; // Import useRouter

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const router = useRouter(); // Initialize useRouter

  // Handle card click to navigate to product detail page
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on Add to Cart button
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }

    // Encode product title for URL
    const encodedTitle = encodeURIComponent(product.title);
    // Navigate to product detail page
    router.push(`/single/product?q=${encodedTitle}&&productid=${product.id}`);
  };

  // Handle image click specifically (in case image click needs special handling)
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    const encodedTitle = encodeURIComponent(product.title);
    router.push(`/single/product?q=${encodedTitle}&&productid=${product.id}`);
  };

  // Handle Add to Cart button click
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    onAddToCart?.(product);
  };

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-72 overflow-hidden bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-[90%] mx-auto h-full object-cover scale-205 group-hover:scale-100 transition-transform duration-500"
            onClick={handleImageClick}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center bg-gray-100"
            onClick={handleImageClick}
          >
            <i className="fas fa-image text-4xl text-gray-300"></i>
          </div>
        )}

        {/* Simple Add to Cart Button on Image */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            className="cursor-pointer w-full bg-[#b3b3b3] text-white font-semibold py-2 hover:bg-[#b3b3b3] transition-colors duration-200 flex items-center justify-center"
          >
            <i className="fas fa-shopping-cart"></i>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info - Compact */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-1 mb-2">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-md font-medium text-gray-900">
            Tk {product.price.toFixed(2)}
            <span className="text-sm font-normal text-gray-500 ml-1">BDT</span>
          </span>
          {/* Mobile-friendly always-visible button */}
          <button
            onClick={handleAddToCart}
            className="md:hidden bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
          >
            <i className="fas fa-plus"></i>
            Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
