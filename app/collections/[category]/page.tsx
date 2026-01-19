// app/page.tsx (or your main page)
import ProductGrid from "@/components/Product/ProductGrid";
import { Product } from "@/components/Product/Product";

// Mock data - replace with your actual data source
const mockProducts: Product[] = [
  {
    id: 1,
    title: "Classic Cotton T-Shirt",
    productType: "Clothing",
    price: 24.99,
    size: "M",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Comfortable 100% cotton t-shirt for everyday wear",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Wireless Bluetooth Headphones Headphones Headphones Headphones",
    productType: "Electronics",
    price: 89.99,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Noise-cancelling wireless headphones with 30-hour battery",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Stainless Steel Water Bottle",
    productType: "Accessories",
    price: 29.99,
    size: "750ml",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description:
      "Insulated stainless steel bottle keeps drinks hot/cold for 24 hours",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Organic Coffee Beans",
    productType: "Food",
    price: 15.99,
    size: "1lb",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Premium organic coffee beans, medium roast",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Yoga Mat Premium",
    productType: "Fitness",
    price: 34.99,
    size: "L",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Non-slip yoga mat with carrying strap",
    rating: 4.4,
  },
  {
    id: 6,
    title: "Leather Wallet",
    productType: "Accessories",
    price: 45.5,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Genuine leather wallet with multiple card slots",
    rating: 4.3,
  },
  {
    id: 7,
    title: "Gaming Mouse",
    productType: "Electronics",
    price: 59.99,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "RGB gaming mouse with programmable buttons",
    rating: 4.9,
  },
  {
    id: 8,
    title: "Running Shoes",
    productType: "Footwear",
    price: 79.99,
    size: "10",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Lightweight running shoes with breathable mesh",
    rating: 4.7,
  },
  {
    id: 9,
    title: "Desk Lamp",
    productType: "Home",
    price: 39.99,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "LED desk lamp with adjustable brightness",
    rating: 4.2,
  },
  {
    id: 10,
    title: "Backpack",
    productType: "Accessories",
    price: 49.99,
    size: "20L",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Water-resistant backpack with laptop compartment",
    rating: 4.5,
  },
  {
    id: 11,
    title: "Smart Watch",
    productType: "Electronics",
    price: 199.99,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Fitness tracker with heart rate monitor",
    rating: 4.6,
  },
  {
    id: 12,
    title: "Jeans",
    productType: "Clothing",
    price: 64.99,
    size: "32",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Slim fit jeans with stretch fabric",
    rating: 4.4,
  },
  {
    id: 1,
    title: "Classic Cotton T-Shirt",
    productType: "Clothing",
    price: 24.99,
    size: "M",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Comfortable 100% cotton t-shirt for everyday wear",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Wireless Bluetooth Headphones Headphones Headphones Headphones",
    productType: "Electronics",
    price: 89.99,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Noise-cancelling wireless headphones with 30-hour battery",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Stainless Steel Water Bottle",
    productType: "Accessories",
    price: 29.99,
    size: "750ml",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description:
      "Insulated stainless steel bottle keeps drinks hot/cold for 24 hours",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Organic Coffee Beans",
    productType: "Food",
    price: 15.99,
    size: "1lb",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Premium organic coffee beans, medium roast",
    rating: 4.6,
  },
  {
    id: 5,
    title: "Yoga Mat Premium",
    productType: "Fitness",
    price: 34.99,
    size: "L",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Non-slip yoga mat with carrying strap",
    rating: 4.4,
  },
  {
    id: 6,
    title: "Leather Wallet",
    productType: "Accessories",
    price: 45.5,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Genuine leather wallet with multiple card slots",
    rating: 4.3,
  },
  {
    id: 7,
    title: "Gaming Mouse",
    productType: "Electronics",
    price: 59.99,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "RGB gaming mouse with programmable buttons",
    rating: 4.9,
  },
  {
    id: 8,
    title: "Running Shoes",
    productType: "Footwear",
    price: 79.99,
    size: "10",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Lightweight running shoes with breathable mesh",
    rating: 4.7,
  },
  {
    id: 9,
    title: "Desk Lamp",
    productType: "Home",
    price: 39.99,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "LED desk lamp with adjustable brightness",
    rating: 4.2,
  },
  {
    id: 10,
    title: "Backpack",
    productType: "Accessories",
    price: 49.99,
    size: "20L",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Water-resistant backpack with laptop compartment",
    rating: 4.5,
  },
  {
    id: 11,
    title: "Smart Watch",
    productType: "Electronics",
    price: 199.99,
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Fitness tracker with heart rate monitor",
    rating: 4.6,
  },
  {
    id: 12,
    title: "Jeans",
    productType: "Clothing",
    price: 64.99,
    size: "32",
    image:
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394",
    images: [
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC9267_b3f4c115-34e5-4785-8683-c6f128131405_360x.jpg?v=1735204394", // index 0 (shown normally)
      "https://cdn.shopify.com/s/files/1/0305/5789/6843/files/DSC07652_7835b629-35a5-4af2-beae-29d5f9d4ed0d_360x.jpg?v=1758188180", // index 1 (shown on hover)
    ],
    description: "Slim fit jeans with stretch fabric",
    rating: 4.4,
  },
];

export default function HomePage() {
  return (
    <main>
      <ProductGrid products={mockProducts} />
    </main>
  );
}
