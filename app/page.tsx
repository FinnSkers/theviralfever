'use client';

import { useState } from 'react';
import { Sparkles, Store, ShoppingBag, Package, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/shops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.shop) {
        router.push(`/shop/${data.shop.id}`);
      }
    } catch (error) {
      console.error('Error generating shop:', error);
      alert('Failed to generate shop. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Store className="w-12 h-12 text-blue-600" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopBuilder AI
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create your perfect online store in seconds with AI. Just describe your shop, and we'll build a beautiful, modern e-commerce website with full inventory management.
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-sm font-semibold text-gray-700 mb-3">
                  Describe your shop
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., 'Create a modern electronics store with a vibrant theme' or 'I want an elegant jewelry shop with a minimal design'"
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold py-5 rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating your shop...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate My Shop
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">AI-Powered Design</h3>
              <p className="text-gray-600">
                Advanced AI generates a custom design based on your description
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Inventory Management</h3>
              <p className="text-gray-600">
                Full-featured backend to manage your products and stock levels
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Modern Features</h3>
              <p className="text-gray-600">
                Shopping cart, responsive design, and beautiful animations included
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
