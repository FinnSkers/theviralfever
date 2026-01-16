import { Shop } from './types';

export function generateShopFromPrompt(prompt: string): Omit<Shop, 'id' | 'createdAt'> {
  // Simple AI simulation - analyzes prompt keywords to generate theme
  const lowerPrompt = prompt.toLowerCase();
  
  let theme: Shop['theme'] = 'modern';
  let primaryColor = '#3b82f6'; // Default blue
  let name = 'Your Shop';
  let description = 'Welcome to our online store';
  
  // Theme detection
  if (lowerPrompt.includes('minimal') || lowerPrompt.includes('simple') || lowerPrompt.includes('clean')) {
    theme = 'minimal';
    primaryColor = '#000000';
  } else if (lowerPrompt.includes('vibrant') || lowerPrompt.includes('colorful') || lowerPrompt.includes('bright')) {
    theme = 'vibrant';
    primaryColor = '#ec4899';
  } else if (lowerPrompt.includes('elegant') || lowerPrompt.includes('luxury') || lowerPrompt.includes('premium')) {
    theme = 'elegant';
    primaryColor = '#8b5cf6';
  }
  
  // Extract shop type/name hints
  if (lowerPrompt.includes('fashion') || lowerPrompt.includes('clothing')) {
    name = 'Fashion Boutique';
    description = 'Discover the latest trends in fashion';
  } else if (lowerPrompt.includes('electronic') || lowerPrompt.includes('tech')) {
    name = 'Tech Store';
    description = 'Your source for cutting-edge technology';
  } else if (lowerPrompt.includes('book')) {
    name = 'Book Haven';
    description = 'Explore our collection of books';
  } else if (lowerPrompt.includes('food') || lowerPrompt.includes('restaurant')) {
    name = 'Gourmet Market';
    description = 'Fresh and delicious products';
  } else if (lowerPrompt.includes('jewelry') || lowerPrompt.includes('accessory')) {
    name = 'Jewelry Collection';
    description = 'Exquisite jewelry and accessories';
  }
  
  return {
    name,
    description,
    prompt,
    theme,
    primaryColor,
  };
}
