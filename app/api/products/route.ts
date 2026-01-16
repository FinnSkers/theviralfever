import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { Product } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shopId = searchParams.get('shopId');
  const productId = searchParams.get('id');
  
  if (!shopId) {
    return NextResponse.json(
      { error: 'Shop ID is required' },
      { status: 400 }
    );
  }
  
  if (productId) {
    const product = storage.getProduct(shopId, productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ product });
  }
  
  const products = storage.getProducts(shopId);
  return NextResponse.json({ products });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { shopId, name, description, price, category, imageUrl, stock } = body;
    
    if (!shopId || !name || !price) {
      return NextResponse.json(
        { error: 'Shop ID, name, and price are required' },
        { status: 400 }
      );
    }
    
    const product: Product = {
      id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description: description || '',
      price: parseFloat(price),
      category: category || 'Uncategorized',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500',
      stock: parseInt(stock) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const created = storage.createProduct(shopId, product);
    return NextResponse.json({ product: created });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { shopId, id, ...updates } = body;
    
    if (!shopId || !id) {
      return NextResponse.json(
        { error: 'Shop ID and product ID are required' },
        { status: 400 }
      );
    }
    
    const product = storage.updateProduct(shopId, id, updates);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shopId = searchParams.get('shopId');
  const id = searchParams.get('id');
  
  if (!shopId || !id) {
    return NextResponse.json(
      { error: 'Shop ID and product ID are required' },
      { status: 400 }
    );
  }
  
  const success = storage.deleteProduct(shopId, id);
  
  if (!success) {
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ success: true });
}
