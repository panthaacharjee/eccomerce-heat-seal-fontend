import React, { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

// Type definitions
interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

const ShoppingCart: React.FC = () => {
  // Initial cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones Headphones Headphones",
      price: 89.99,
      originalPrice: 119.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      inStock: true,
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 299.99,
      originalPrice: 349.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      inStock: true,
    },
    {
      id: 3,
      name: "Premium Laptop Backpack",
      price: 49.99,
      originalPrice: 49.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      inStock: true,
    },
    {
      id: 4,
      name: "Premium Laptop Backpack",
      price: 49.99,
      originalPrice: 49.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      inStock: true,
    },
  ]);

  // Calculate subtotal
  const subtotal: number = cartItems.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0,
  );

  // Calculate total (you can add tax, shipping, etc. here if needed)
  const total: number = subtotal; // For now, total is same as subtotal

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number): void => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Remove item
  const removeItem = (id: number): void => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Format to Tk currency
  const formatTkCurrency = (amount: number): string => {
    return `Tk ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  };

  // Handle checkout
  const handleCheckout = (): void => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Checkout successful! Total: ${formatTkCurrency(total)}`);
  };

  // Handle continue shopping
  const handleContinueShopping = (): void => {
    alert("Redirecting to shopping page...");
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-white ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <ShoppingBag className="w-24 h-24 text-gray-300" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Shopping Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <button
              onClick={() => alert("Redirect to shopping page")}
              className="bg-black hover:bg-black text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 ">
      <div className="">
        <h1 className="text-xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div>
          <div className="p-2 border-b">
            <h2 className="text-sm font-medium text-gray-800">
              Your Items ({cartItems.length})
            </h2>
          </div>
          <div className="h-80 no-scrollbar overflow-x-hidden mt-4">
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="mt-8 flex items-center">
                <div className="w-3/12">
                  <div className="w-18 h-18 rounded-lg overflow-hidden bg-gray-100 mr-4 ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-9/12">
                  <div className="flex justify-between text-xs font-medium text-gray-900">
                    <p>{item.name}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center ">
                    <div className="flex items-center w-11/12 pr-2">
                      <div className="flex items-center border rounded-lg mr-4">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 cursor-pointer transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-2 h-2" />
                        </button>
                        <span className="px-1 py-1 text-gray-900 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 cursor-pointer transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-sm font-semibold text-gray-900">
                        <p className="text-sm">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <div className="mt-2 sm:mt-0">
                          {item.originalPrice > item.price && (
                            <div className="">
                              <p className="text-gray-500 line-through text-sm">
                                {formatCurrency(
                                  item.originalPrice * item.quantity,
                                )}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p>{formatTkCurrency(subtotal)}</p>
            </div>
            <div className="mt-2 flex justify-between">
              <p>Total:</p>
              <p>{formatTkCurrency(total)}</p>
            </div>
            <div className="uppercase mt-4">
              <button
                onClick={handleCheckout}
                className="w-full py-2 bg-black text-white cursor-pointer hover:bg-gray-800 transition-colors"
              >
                Checkout
              </button>
              <button
                onClick={handleContinueShopping}
                className="w-full py-2 bg-[#e6e6e6] text-black mt-2 cursor-pointer hover:bg-gray-300 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
