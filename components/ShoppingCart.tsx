'use client';

import { Product, CartItem } from '@/lib/types';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function ShoppingCart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 border-b pb-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6">
            <div className="flex justify-between mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
