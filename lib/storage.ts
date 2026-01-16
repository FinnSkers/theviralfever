// Simple in-memory storage for demo purposes
// In production, this would use a real database

import { Product, Shop } from './types';

// Storage maps
const shops = new Map<string, Shop>();
const products = new Map<string, Product[]>();

// Demo data
const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 299.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking and notifications',
    price: 399.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Leather Messenger Bag',
    description: 'Handcrafted genuine leather bag',
    price: 199.99,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Designer Sunglasses',
    description: 'UV protection with polarized lenses',
    price: 159.99,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    stock: 40,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const storage = {
  // Shop operations
  createShop: (shop: Shop): Shop => {
    shops.set(shop.id, shop);
    products.set(shop.id, [...demoProducts]);
    return shop;
  },
  
  getShop: (id: string): Shop | undefined => {
    return shops.get(id);
  },
  
  // Product operations
  getProducts: (shopId: string): Product[] => {
    return products.get(shopId) || [];
  },
  
  getProduct: (shopId: string, productId: string): Product | undefined => {
    const shopProducts = products.get(shopId) || [];
    return shopProducts.find(p => p.id === productId);
  },
  
  createProduct: (shopId: string, product: Product): Product => {
    const shopProducts = products.get(shopId) || [];
    shopProducts.push(product);
    products.set(shopId, shopProducts);
    return product;
  },
  
  updateProduct: (shopId: string, productId: string, updates: Partial<Product>): Product | undefined => {
    const shopProducts = products.get(shopId) || [];
    const index = shopProducts.findIndex(p => p.id === productId);
    if (index === -1) return undefined;
    
    shopProducts[index] = {
      ...shopProducts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    products.set(shopId, shopProducts);
    return shopProducts[index];
  },
  
  deleteProduct: (shopId: string, productId: string): boolean => {
    const shopProducts = products.get(shopId) || [];
    const filtered = shopProducts.filter(p => p.id !== productId);
    if (filtered.length === shopProducts.length) return false;
    products.set(shopId, filtered);
    return true;
  },
};
