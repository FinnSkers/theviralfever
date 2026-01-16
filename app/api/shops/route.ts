import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { generateShopFromPrompt } from '@/lib/ai-generator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;
    
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    // Generate shop configuration from prompt
    const shopConfig = generateShopFromPrompt(prompt);
    
    // Create shop with unique ID using crypto
    const shop = storage.createShop({
      ...shopConfig,
      id: `shop-${Date.now()}-${crypto.randomUUID().substring(0, 8)}`,
      createdAt: new Date().toISOString(),
    });
    
    return NextResponse.json({ shop });
  } catch (error) {
    console.error('Error creating shop:', error);
    return NextResponse.json(
      { error: 'Failed to create shop' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'Shop ID is required' },
      { status: 400 }
    );
  }
  
  const shop = storage.getShop(id);
  
  if (!shop) {
    return NextResponse.json(
      { error: 'Shop not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({ shop });
}
