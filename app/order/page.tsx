"use client";

import Link from "next/link";

export default function OrderConfirmationPage() {
  // Static order data
  const order = {
    orderId: "ORD-1735204394-ABC123",
    items: [
      {
        productId: 1,
        title: "Classic Cotton T-Shirt",
        price: 24.99,
        quantity: 2,
        selectedSize: "M",
        image:
          "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
        total: 49.98,
      },
      {
        productId: 3,
        title: "Stainless Steel Water Bottle",
        price: 29.99,
        quantity: 1,
        selectedSize: "750ml",
        image:
          "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
        total: 29.99,
      },
    ],
    shippingAddress: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      address: "123 Main Street",
      apartment: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    paymentMethod: {
      type: "credit",
      cardNumber: "**** **** **** 4242",
    },
    subtotal: 79.97,
    shipping: 5.99,
    tax: 6.88,
    discount: 0,
    total: 92.84,
    orderDate: new Date().toISOString(),
    status: "processing",
  };

  // Calculate estimated delivery date (5 business days from now)
  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);
  const formattedDate = estimatedDeliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Thank you for your purchase. We've received your order and it's
              now being processed.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">
                Estimated Delivery: {formattedDate}
              </span>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Order Details */}
              <div className="lg:w-2/3 space-y-8">
                {/* Order Info */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Order Details
                    </h2>
                    <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      #{order.orderId}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Order Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Order Date:</span>
                            <span className="font-medium">
                              {new Date(order.orderDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Order Status:</span>
                            <span className="font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Payment Method:
                            </span>
                            <span className="font-medium flex items-center gap-2">
                              <svg
                                className="w-5 h-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                              </svg>
                              {order.paymentMethod.type
                                .charAt(0)
                                .toUpperCase() +
                                order.paymentMethod.type.slice(1)}{" "}
                              Card
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          Shipping Information
                        </h3>
                        <div className="space-y-2">
                          <p className="text-gray-700 font-medium">
                            {order.shippingAddress.fullName}
                          </p>
                          <p className="text-gray-700">
                            {order.shippingAddress.address}
                          </p>
                          <p className="text-gray-700">
                            {order.shippingAddress.apartment}
                          </p>
                          <p className="text-gray-700">
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}{" "}
                            {order.shippingAddress.zipCode}
                          </p>
                          <p className="text-gray-700">
                            {order.shippingAddress.country}
                          </p>
                          <div className="pt-2">
                            <p className="text-gray-700">
                              {order.shippingAddress.phone}
                            </p>
                            <p className="text-gray-700">
                              {order.shippingAddress.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-6 text-xl">
                    Order Items
                  </h3>
                  <div className="space-y-6">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-6 flex-1">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-lg">
                                {item.title}
                              </h4>
                              {item.selectedSize && (
                                <p className="text-gray-600 mt-1">
                                  Size:{" "}
                                  <span className="font-medium">
                                    {item.selectedSize}
                                  </span>
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-8">
                              <div className="text-center">
                                <p className="text-gray-600 text-sm mb-1">
                                  Quantity
                                </p>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                  <span className="px-4 py-2 bg-gray-50 text-gray-900 font-medium">
                                    {item.quantity}
                                  </span>
                                </div>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-600 text-sm mb-1">
                                  Price
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                  ${item.total.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-8">
                  <h3 className="font-bold text-gray-900 text-xl mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Subtotal ({order.items.length} items)
                      </span>
                      <span className="font-medium">
                        ${order.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        ${order.shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">
                        ${order.tax.toFixed(2)}
                      </span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">
                          -${order.discount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-gray-300 pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-2xl">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mt-2">USD</p>
                    </div>
                  </div>

                  {/* Order Progress */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Order Progress
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">
                            Order Confirmed
                          </p>
                          <p className="text-sm text-gray-600">Just now</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">
                            Processing
                          </p>
                          <p className="text-sm text-gray-600">Next step</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">Shipped</p>
                          <p className="text-sm text-gray-600">In 1-2 days</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">Delivered</p>
                          <p className="text-sm text-gray-600">
                            By {formattedDate}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download Invoice */}
                  <button
                    onClick={() => window.print()}
                    className="w-full py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Check Your Email
              </h3>
              <p className="text-gray-600">
                We've sent a confirmation email to{" "}
                <span className="font-medium text-blue-600">
                  {order.shippingAddress.email}
                </span>
                with all your order details.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Track Your Order
              </h3>
              <p className="text-gray-600">
                You'll receive tracking information via email once your order
                ships. Expected delivery:{" "}
                <span className="font-medium">{formattedDate}</span>
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-6 border border-purple-200">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">
                Need Help?
              </h3>
              <p className="text-gray-600">
                Questions about your order? Contact our support team at
                <span className="font-medium text-purple-600">
                  {" "}
                  support@example.com
                </span>
                or call <span className="font-medium">(123) 456-7890</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 py-4 px-8 bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Continue Shopping
            </Link>

            <Link
              href="/orders"
              className="flex-1 py-4 px-8 border-2 border-gray-300 text-gray-800 font-semibold rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all duration-300 text-center flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              View My Orders
            </Link>

            <button
              onClick={() => window.print()}
              className="flex-1 py-4 px-8 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Receipt
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Thank you for shopping with us! We appreciate your business.
            </p>
            <div className="mt-6 flex items-center justify-center gap-6">
              <span className="text-gray-400">Secure Payment</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">30-Day Returns</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">Free Shipping Over $50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
