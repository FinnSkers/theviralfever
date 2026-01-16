// Type definitions for the application

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  prompt: string;
  theme: 'modern' | 'minimal' | 'vibrant' | 'elegant';
  primaryColor: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
