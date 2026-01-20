"use client";
import React, { useState } from "react";

// Mock data for demonstration
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  joinDate: "January 2023",
  phone: "+1 (555) 123-4567",
};

const orderHistory = [
  { id: 1, date: "2023-12-15", total: "$89.99", status: "Delivered", items: 2 },
  {
    id: 2,
    date: "2023-11-28",
    total: "$145.50",
    status: "Delivered",
    items: 3,
  },
  { id: 3, date: "2023-10-10", total: "$67.25", status: "Delivered", items: 1 },
  {
    id: 4,
    date: "2023-09-05",
    total: "$234.00",
    status: "Delivered",
    items: 4,
  },
];

const addresses = [
  {
    id: 1,
    name: "Home",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
    isDefault: true,
  },
  {
    id: 2,
    name: "Work",
    street: "456 Business Ave",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    country: "USA",
    isDefault: false,
  },
];

const paymentMethods = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    expiry: "08/24",
    isDefault: false,
  },
  { id: 3, type: "Bkash", number: "017XX-XXXXXX", isDefault: false },
];

const banks = [
  { id: 1, name: "BRAC Bank", code: "BRAC" },
  { id: 2, name: "City Bank", code: "CITY" },
  { id: 3, name: "Dutch-Bangla Bank", code: "DBBL" },
  { id: 4, name: "Eastern Bank Ltd", code: "EBL" },
  { id: 5, name: "Islami Bank Bangladesh", code: "IBBL" },
  { id: 6, name: "Standard Chartered", code: "SCB" },
];

const mobileWallets = [
  { id: 1, name: "bKash", code: "BKASH" },
  { id: 2, name: "Nagad", code: "NAGAD" },
  { id: 3, name: "Rocket", code: "ROCKET" },
  { id: 4, name: "Upay", code: "UPAY" },
];

const AccountComponent = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "Bangladesh",
    isDefault: false,
  });
  const [newPayment, setNewPayment] = useState({
    type: "bank", // 'bank', 'card', 'mobile'
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
    mobileWallet: "",
    mobileNumber: "",
    pin: "",
    isDefault: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setNewPayment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log("Saved profile data:", formData);
  };

  const handleSaveAddress = () => {
    console.log("New address:", newAddress);
    // Add to addresses array in real app
    setShowAddressModal(false);
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "Bangladesh",
      isDefault: false,
    });
  };

  const handleSavePayment = () => {
    console.log("New payment method:", newPayment);
    // Add to paymentMethods array in real app
    setShowPaymentModal(false);
    setNewPayment({
      type: "bank",
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      cardNumber: "",
      cardHolder: "",
      expiry: "",
      cvv: "",
      mobileWallet: "",
      mobileNumber: "",
      pin: "",
      isDefault: false,
    });
  };

  const renderPasswordUpdateSection = () => (
    <div className="border-t border-gray-300 pt-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">Update Password</h3>
        <button
          onClick={() => setShowPasswordUpdate(!showPasswordUpdate)}
          className="text-xs px-4 py-2 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition duration-200"
        >
          {showPasswordUpdate ? "Cancel" : "Change Password"}
        </button>
      </div>

      {showPasswordUpdate && (
        <div className="space-y-4 bg-gray-50 p-6 border border-gray-300">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 bg-white text-gray-900"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 bg-white text-gray-900"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 bg-white text-gray-900"
              placeholder="Confirm new password"
            />
          </div>
          <div className="flex justify-end">
            <button className="text-xs px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition duration-200">
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs px-4 py-2 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition duration-200"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 bg-white text-gray-900"
            />
          ) : (
            <div className="p-3 border border-gray-300 bg-gray-50">
              {userData.name}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 bg-white text-gray-900"
            />
          ) : (
            <div className="p-3 border border-gray-300 bg-gray-50">
              {userData.email}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 bg-white text-gray-900"
            />
          ) : (
            <div className="p-3 border border-gray-300 bg-gray-50">
              {userData.phone}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Member Since
          </label>
          <div className="p-3 border border-gray-300 bg-gray-50">
            {userData.joinDate}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end">
          <button
            onClick={handleSaveProfile}
            className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      )}

      {renderPasswordUpdateSection()}
    </div>
  );

  const renderOrderHistory = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">Order History</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="text-sm p-4 text-left">Order ID</th>
              <th className="text-sm p-4 text-left">Date</th>
              <th className="text-sm p-4 text-left">Items</th>
              <th className="text-sm p-4 text-left">Total</th>
              <th className="text-sm p-4 text-left">Status</th>
              <th className="text-sm p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="text-sm p-4 font-medium">
                  #{order.id.toString().padStart(6, "0")}
                </td>
                <td className="text-sm p-4">{order.date}</td>
                <td className="text-sm p-4">
                  {order.items} item{order.items !== 1 ? "s" : ""}
                </td>
                <td className="text-sm p-4 font-medium">{order.total}</td>
                <td className="text-sm p-4">
                  <span className="text-sm px-3 py-1 bg-gray-100 text-gray-800 text-sm">
                    {order.status}
                  </span>
                </td>
                <td className="text-sm p-4">
                  <button className="text-gray-700 hover:text-gray-900 underline">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orderHistory.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No orders found.</p>
        </div>
      )}
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Saved Addresses</h2>
        <button
          onClick={() => setShowAddressModal(true)}
          className="text-xs px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition duration-200"
        >
          + Add New Address
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border p-6 ${address.isDefault ? "border-gray-900" : "border-gray-300"}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {address.name}
                </h3>
                {address.isDefault && (
                  <span className="inline-block px-2 py-1 bg-gray-900 text-white text-xs mt-1">
                    Default
                  </span>
                )}
              </div>
              <div className="space-x-2">
                <button className="text-gray-700 hover:text-gray-900 text-sm">
                  Edit
                </button>
                <button className="text-gray-700 hover:text-gray-900 text-sm">
                  Delete
                </button>
              </div>
            </div>
            <div className="space-y-1 text-gray-700">
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <p>{address.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
        <button
          onClick={() => setShowPaymentModal(true)}
          className="text-xs px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition duration-200"
        >
          + Add Payment Method
        </button>
      </div>
      <div className="space-y-4">
        {paymentMethods.map((payment) => (
          <div
            key={payment.id}
            className="border border-gray-300 p-6 flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-8 flex items-center justify-center border ${payment.type === "Bkash" || payment.type === "Nagad" || payment.type === "Rocket" ? "bg-green-50 border-green-200" : "bg-gray-100"}`}
              >
                {payment.type === "Bkash" ? (
                  <span className="font-bold text-orange-600">Bk</span>
                ) : payment.type === "Nagad" ? (
                  <span className="font-bold text-purple-600">Ng</span>
                ) : payment.type === "Rocket" ? (
                  <span className="font-bold text-blue-600">R</span>
                ) : (
                  <span className="font-bold text-gray-900">
                    {payment.type}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {payment.type === "Bkash" ||
                  payment.type === "Nagad" ||
                  payment.type === "Rocket"
                    ? `${payment.type} - ${payment.number}`
                    : `•••• ${payment.last4}`}
                </h3>
                {payment.expiry && (
                  <p className="text-gray-600 text-sm">
                    Expires {payment.expiry}
                  </p>
                )}
                {payment.isDefault && (
                  <span className="inline-block px-2 py-1 bg-gray-900 text-white text-xs mt-1">
                    Default
                  </span>
                )}
              </div>
            </div>
            <div className="space-x-4">
              {!payment.isDefault && (
                <button className="text-gray-700 hover:text-gray-900">
                  Set as Default
                </button>
              )}
              <button className="text-gray-700 hover:text-gray-900">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Modal Components
  const AddressModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Address</h2>
          <button
            onClick={() => setShowAddressModal(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address Name (e.g., Home, Work)
            </label>
            <input
              type="text"
              name="name"
              value={newAddress.name}
              onChange={handleAddressChange}
              className="w-full p-3 border border-gray-300 bg-white text-gray-900"
              placeholder="Home, Office, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address
            </label>
            <input
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleAddressChange}
              className="w-full p-3 border border-gray-300 bg-white text-gray-900"
              placeholder="House no, Road no, Area"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleAddressChange}
                className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Division
              </label>
              <input
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleAddressChange}
                className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                placeholder="State or Division"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP/Postal Code
              </label>
              <input
                type="text"
                name="zip"
                value={newAddress.zip}
                onChange={handleAddressChange}
                className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                placeholder="Postal Code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={newAddress.country}
                onChange={handleAddressChange}
                className="w-full p-3 border border-gray-300 bg-white text-gray-900"
              />
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="defaultAddress"
              name="isDefault"
              checked={newAddress.isDefault}
              onChange={handleAddressChange}
              className="w-4 h-4 text-gray-900 border-gray-300 rounded"
            />
            <label htmlFor="defaultAddress" className="ml-2 text-gray-700">
              Set as default address
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              onClick={() => setShowAddressModal(false)}
              className="px-6 py-3 border border-gray-800 text-gray-800 hover:bg-gray-100 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAddress}
              className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition duration-200"
            >
              Save Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Add Payment Method
          </h2>
          <button
            onClick={() => setShowPaymentModal(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-6">
          {/* Payment Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Payment Method Type
            </label>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: "bank", label: "Bank Account" },
                { value: "card", label: "Credit/Debit Card" },
                { value: "mobile", label: "Mobile Wallet" },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() =>
                    setNewPayment((prev) => ({
                      ...prev,
                      type: type.value as any,
                    }))
                  }
                  className={`p-4 border text-center ${newPayment.type === type.value ? "border-gray-900 bg-gray-50" : "border-gray-300"}`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bank Account Form */}
          {newPayment.type === "bank" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bank
                </label>
                <select
                  name="bankName"
                  value={newPayment.bankName}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                >
                  <option value="">Select a bank</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.code}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={newPayment.accountNumber}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                  placeholder="Enter account number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  name="accountHolder"
                  value={newPayment.accountHolder}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                  placeholder="Account holder name"
                />
              </div>
            </div>
          )}

          {/* Credit/Debit Card Form */}
          {newPayment.type === "card" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={newPayment.cardNumber}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    name="cardHolder"
                    value={newPayment.cardHolder}
                    onChange={handlePaymentChange}
                    className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                    placeholder="Name on card"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    value={newPayment.expiry}
                    onChange={handlePaymentChange}
                    className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
              </div>

              <div className="max-w-xs">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="password"
                  name="cvv"
                  value={newPayment.cvv}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>
          )}

          {/* Mobile Wallet Form */}
          {newPayment.type === "mobile" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Mobile Wallet
                </label>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {mobileWallets.map((wallet) => (
                    <button
                      key={wallet.id}
                      type="button"
                      onClick={() =>
                        setNewPayment((prev) => ({
                          ...prev,
                          mobileWallet: wallet.code,
                        }))
                      }
                      className={`p-4 border text-center ${newPayment.mobileWallet === wallet.code ? "border-gray-900 bg-gray-50" : "border-gray-300"}`}
                    >
                      {wallet.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={newPayment.mobileNumber}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                  placeholder="01XXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN (Last 4 digits)
                </label>
                <input
                  type="password"
                  name="pin"
                  value={newPayment.pin}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border border-gray-300 bg-white text-gray-900"
                  placeholder="XXXX"
                  maxLength={4}
                />
              </div>
            </div>
          )}

          <div className="flex items-center pt-4">
            <input
              type="checkbox"
              id="defaultPayment"
              name="isDefault"
              checked={newPayment.isDefault}
              onChange={handlePaymentChange}
              className="w-4 h-4 text-gray-900 border-gray-300 rounded"
            />
            <label htmlFor="defaultPayment" className="ml-2 text-gray-700">
              Set as default payment method
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="px-6 py-3 border border-gray-800 text-gray-800 hover:bg-gray-100 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePayment}
              className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition duration-200"
            >
              Save Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600 text-xs">
            Manage your profile, orders, addresses, and payment methods
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <nav className="sticky top-8">
              <ul className="space-y-2">
                {[
                  { id: "profile", label: "Profile Information", icon: "👤" },
                  { id: "orders", label: "Order History", icon: "📦" },
                  { id: "addresses", label: "Address Book", icon: "📍" },
                  { id: "payments", label: "Payment Methods", icon: "💳" },
                ].map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left p-4 transition duration-200 flex items-center space-x-3 ${
                        activeTab === tab.id
                          ? "bg-gray-900 text-white"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span className="font-medium text-sm">{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            <div className="border border-gray-300 p-6 md:p-8">
              {activeTab === "profile" && renderProfileSection()}
              {activeTab === "orders" && renderOrderHistory()}
              {activeTab === "addresses" && renderAddresses()}
              {activeTab === "payments" && renderPaymentMethods()}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddressModal && <AddressModal />}
      {showPaymentModal && <PaymentModal />}
    </div>
  );
};

export default AccountComponent;
