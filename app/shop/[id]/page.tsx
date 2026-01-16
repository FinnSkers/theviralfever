'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Shop, Product, CartItem } from '@/lib/types';
import ProductCard from '@/components/ProductCard';
import ShoppingCart from '@/components/ShoppingCart';
import { ShoppingCart as CartIcon, Edit, Plus, Trash2, Save, X } from 'lucide-react';

export default function ShopPage() {
  const params = useParams();
  const router = useRouter();
  const shopId = params.id as string;
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: '',
  });

  useEffect(() => {
    fetchShopData();
  }, [shopId]);

  const fetchShopData = async () => {
    try {
      const [shopRes, productsRes] = await Promise.all([
        fetch(`/api/shops?id=${shopId}`),
        fetch(`/api/products?shopId=${shopId}`),
      ]);

      if (shopRes.ok) {
        const shopData = await shopRes.json();
        setShop(shopData.shop);
      }

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.products);
      }
    } catch (error) {
      console.error('Error fetching shop data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      imageUrl: product.imageUrl,
      stock: product.stock.toString(),
    });
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;

    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopId,
          id: editingProduct.id,
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      });

      if (response.ok) {
        await fetchShopData();
        setEditingProduct(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products?shopId=${shopId}&id=${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchShopData();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopId,
          ...formData,
          price: parseFloat(formData.price) || 0,
          stock: parseInt(formData.stock) || 0,
        }),
      });

      if (response.ok) {
        await fetchShopData();
        setEditingProduct(null);
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          imageUrl: '',
          stock: '',
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your shop...</p>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Shop not found</h1>
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const themeColors = {
    modern: 'from-blue-600 to-purple-600',
    minimal: 'from-gray-900 to-gray-700',
    vibrant: 'from-pink-500 to-orange-500',
    elegant: 'from-purple-600 to-indigo-600',
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`bg-gradient-to-r ${themeColors[shop.theme]} text-white shadow-lg`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{shop.name}</h1>
              <p className="text-lg opacity-90">{shop.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
                {editMode ? 'View Mode' : 'Edit Mode'}
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
              >
                <CartIcon className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {editMode && (
          <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Plus className="w-6 h-6" />
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2"
                rows={3}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={editingProduct ? handleSaveProduct : handleAddProduct}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
              {editingProduct && (
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({
                      name: '',
                      description: '',
                      price: '',
                      category: '',
                      imageUrl: '',
                      stock: '',
                    });
                  }}
                  className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard
                product={product}
                onAddToCart={editMode ? undefined : handleAddToCart}
              />
              {editMode && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products yet. Add some products to get started!</p>
          </div>
        )}
      </div>

      {/* Shopping Cart */}
      <ShoppingCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
}
