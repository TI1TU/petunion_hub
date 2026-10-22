'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Sparkles,
  Tag,
  LogOut,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Truck,
  RotateCcw,
  Save,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'cms' | 'coupons'
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState(null);

  // Data states
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cms, setCms] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // New product form state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Oversized T-Shirts',
    categorySlug: 'oversized-t-shirts',
    price: 999,
    mrp: 1999,
    stockCount: 15,
    inStock: true,
    published: true,
    fit: 'Oversized',
    fabric: '100% Combed Heavy Cotton',
    description: '',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80',
  });

  const getHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('sz_admin_token') : '';
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  const showNotification = (msg, isError = false) => {
    setFeedback({ msg, isError });
    setTimeout(() => setFeedback(null), 3500);
  };

  // Verify Admin Session on mount
  useEffect(() => {
    async function checkAuthAndLoadData() {
      try {
        const res = await fetch('/api/admin/auth', { headers: getHeaders() });
        const data = await res.json();
        if (!res.ok || !data.authenticated) {
          router.push('/admin/login');
          return;
        }
        setAdminUser(data.user);

        // Load dashboard datasets
        await Promise.all([loadAnalytics(), loadProducts(), loadOrders(), loadCms()]);
      } catch (err) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    checkAuthAndLoadData();
  }, [router]);

  const loadAnalytics = async () => {
    try {
      const res = await fetch('/api/admin/analytics', { headers: getHeaders() });
      if (res.ok) setAnalytics(await res.json());
    } catch (_) {}
  };

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/admin/products', { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (_) {}
  };

  const loadOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders', { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (_) {}
  };

  const loadCms = async () => {
    try {
      const res = await fetch('/api/admin/cms', { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        setCms(data.cms);
      }
    } catch (_) {}
  };

  const handleLogout = () => {
    localStorage.removeItem('sz_admin_token');
    router.push('/admin/login');
  };

  // Product CRUD
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editingProduct,
        ...productForm,
        images: [productForm.image],
      };

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save product');
      showNotification('Product saved successfully!');
      setShowProductModal(false);
      setEditingProduct(null);
      loadProducts();
      loadAnalytics();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to remove this product?')) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error('Failed to delete product');
      showNotification('Product deleted');
      loadProducts();
      loadAnalytics();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  const handleTogglePublish = async (product) => {
    try {
      const updated = { ...product, published: !product.published };
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(updated),
      });
      loadProducts();
      showNotification(`Product ${updated.published ? 'Published' : 'Moved to Drafts'}`);
    } catch (_) {}
  };

  // Order Status update
  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update order status');
      showNotification(`Order ${orderId} updated to ${newStatus}`);
      loadOrders();
      loadAnalytics();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  // CMS Save & Rollback
  const handleSaveCms = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/cms', {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(cms),
      });
      if (!res.ok) throw new Error('Failed to publish CMS');
      showNotification('Storefront CMS published to live website!');
      loadCms();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  const handleRollbackCms = async () => {
    if (!confirm('Revert storefront content to previous published version?')) return;
    try {
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ action: 'rollback' }),
      });
      if (!res.ok) throw new Error('Failed to rollback');
      showNotification('Storefront rolled back to previous version.');
      loadCms();
    } catch (err) {
      showNotification(err.message, true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-xs">
        LOADING SHARMAZONE ADMIN CONSOLE...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200">
      {/* Top Header */}
      <header className="bg-neutral-950 border-b border-neutral-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-lg tracking-widest text-white uppercase">
              SHARMAZONE
            </span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 font-mono text-neutral-300 uppercase tracking-widest border border-white/20">
              DELHI NCR ADMIN
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              <span>View Storefront</span>
              <ExternalLink size={13} />
            </a>

            <div className="text-right hidden md:block">
              <p className="text-xs font-mono text-white">{adminUser?.email}</p>
              <p className="text-[10px] text-emerald-400 font-mono">Allowlisted Superadmin</p>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 border border-neutral-800 hover:border-neutral-600 bg-neutral-900 text-neutral-300 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Floating feedback toast */}
      {feedback && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded shadow-xl border text-xs font-mono flex items-center gap-2 ${
            feedback.isError
              ? 'bg-red-950 border-red-500 text-red-200'
              : 'bg-emerald-950 border-emerald-500 text-emerald-200'
          }`}
        >
          {feedback.isError ? <AlertCircle size={15} /> : <CheckCircle size={15} />}
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Nav Tabs */}
      <div className="bg-neutral-900/60 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto py-2">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: 'Products Catalog', icon: Package },
            { id: 'orders', label: 'Orders & Fulfillment', icon: ShoppingBag },
            { id: 'cms', label: 'Storefront CMS', icon: Sparkles },
            { id: 'coupons', label: 'Coupons & Promos', icon: Tag },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-display font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-white text-black shadow'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top metric cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 p-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  Gross Revenue
                </span>
                <p className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                  ₹{(analytics?.metrics?.totalRevenue || 0).toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-neutral-500 mt-1">Delhi NCR Region</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  Total Orders
                </span>
                <p className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                  {analytics?.metrics?.totalOrders || 0}
                </p>
                <p className="text-[11px] text-emerald-400 mt-1">
                  {analytics?.metrics?.pendingOrders || 0} Pending Dispatch
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  Avg. Order Value
                </span>
                <p className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                  ₹{(analytics?.metrics?.averageOrderValue || 0).toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-neutral-500 mt-1">Cart Performance</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  Catalog Size
                </span>
                <p className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                  {analytics?.metrics?.totalProducts || 0} Pieces
                </p>
                <p className="text-[11px] text-neutral-400 mt-1">
                  {analytics?.metrics?.activeCoupons || 0} Active Promos
                </p>
              </div>
            </div>

            {/* Regional Delhi NCR distribution */}
            <div className="bg-neutral-900 border border-neutral-800 p-6">
              <h2 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-4">
                Delhi NCR Service Area Distribution
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(analytics?.regionalBreakdown || {}).map(([city, count]) => (
                  <div key={city} className="bg-black/40 border border-neutral-800 p-4">
                    <p className="text-xs font-mono text-neutral-400 uppercase">{city}</p>
                    <p className="font-display font-black text-xl text-white mt-1">{count} Orders</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">Priority SLA 24-48h</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders table */}
            <div className="bg-neutral-900 border border-neutral-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-sm uppercase tracking-wider text-white">
                  Recent Customer Orders
                </h2>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-mono text-neutral-400 hover:text-white"
                >
                  View All ({orders.length}) →
                </button>
              </div>

              {orders.length === 0 ? (
                <p className="text-xs font-mono text-neutral-500 py-6 text-center">
                  No orders placed yet. Orders placed during checkout will appear here.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="border-b border-neutral-800 text-neutral-400 uppercase">
                      <tr>
                        <th className="py-2.5">Order ID</th>
                        <th>Customer</th>
                        <th>City</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 text-white font-bold">{o.id}</td>
                          <td>{o.customer?.name}</td>
                          <td>{o.shippingAddress?.city || 'Delhi NCR'}</td>
                          <td>₹{o.pricing?.finalTotal}</td>
                          <td>
                            <span
                              className={`px-2 py-0.5 text-[10px] ${
                                o.paymentStatus === 'Paid'
                                  ? 'bg-emerald-950 text-emerald-300'
                                  : 'bg-amber-950 text-amber-300'
                              }`}
                            >
                              {o.paymentStatus}
                            </span>
                          </td>
                          <td>
                            <span className="px-2 py-0.5 text-[10px] bg-neutral-800 text-neutral-200">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG CRUD */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-black text-xl uppercase tracking-wider text-white">
                  Product Catalog
                </h2>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Manage inventory, pricing, stock levels, and publication status.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    category: 'Oversized T-Shirts',
                    categorySlug: 'oversized-t-shirts',
                    price: 999,
                    mrp: 1999,
                    stockCount: 15,
                    inStock: true,
                    published: true,
                    fit: 'Oversized',
                    fabric: '100% Combed Heavy Cotton',
                    description: '',
                    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80',
                  });
                  setShowProductModal(true);
                }}
                className="bg-white hover:bg-neutral-200 text-black font-display font-bold text-xs uppercase px-4 py-2.5 flex items-center gap-1.5 transition-colors"
              >
                <Plus size={14} />
                <span>Add New Piece</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-neutral-900 border border-neutral-800 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-neutral-800 text-neutral-400 uppercase bg-neutral-950/40">
                  <tr>
                    <th className="p-3.5">Piece</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th className="text-right p-3.5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={p.images?.[0]}
                          alt={p.name}
                          className="w-10 h-12 object-cover bg-neutral-800"
                        />
                        <div>
                          <p className="text-white font-bold">{p.name}</p>
                          <p className="text-[10px] text-neutral-500">{p.sku || p.id}</p>
                        </div>
                      </td>
                      <td>{p.category}</td>
                      <td>
                        <span className="text-white font-bold">₹{p.price}</span>
                        {p.mrp && <span className="text-neutral-500 line-through ml-1.5">₹{p.mrp}</span>}
                      </td>
                      <td>
                        <span
                          className={`px-2 py-0.5 text-[10px] ${
                            (p.stockCount || 0) > 0
                              ? 'bg-neutral-800 text-neutral-200'
                              : 'bg-red-950 text-red-300'
                          }`}
                        >
                          {p.stockCount !== undefined ? `${p.stockCount} in stock` : 'Available'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleTogglePublish(p)}
                          className={`flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase font-bold transition-colors ${
                            p.published !== false
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {p.published !== false ? <Eye size={11} /> : <EyeOff size={11} />}
                          <span>{p.published !== false ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProductForm({
                              name: p.name,
                              category: p.category,
                              categorySlug: p.categorySlug,
                              price: p.price,
                              mrp: p.mrp || p.price * 2,
                              stockCount: p.stockCount !== undefined ? p.stockCount : 15,
                              inStock: p.inStock !== false,
                              published: p.published !== false,
                              fit: p.fit || 'Oversized',
                              fabric: p.fabric || '100% Combed Heavy Cotton',
                              description: p.description || '',
                              image: p.images?.[0] || '',
                            });
                            setShowProductModal(true);
                          }}
                          className="p-1.5 hover:bg-neutral-800 text-neutral-300 hover:text-white"
                          title="Edit"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 hover:bg-red-950 text-neutral-400 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Product Modal */}
            {showProductModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-neutral-900 border border-neutral-700 max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                    <h3 className="font-display font-bold uppercase text-white">
                      {editingProduct ? 'Edit Product' : 'Add New Fashion Piece'}
                    </h3>
                    <button
                      onClick={() => setShowProductModal(false)}
                      className="text-neutral-400 hover:text-white font-mono"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="block text-neutral-400 mb-1">Product Title</label>
                      <input
                        type="text"
                        required
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full bg-black border border-neutral-700 p-2 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-neutral-400 mb-1">Category</label>
                        <input
                          type="text"
                          required
                          value={productForm.category}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              category: e.target.value,
                              categorySlug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                            })
                          }
                          className="w-full bg-black border border-neutral-700 p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Fit Type</label>
                        <select
                          value={productForm.fit}
                          onChange={(e) => setProductForm({ ...productForm, fit: e.target.value })}
                          className="w-full bg-black border border-neutral-700 p-2 text-white"
                        >
                          <option value="Oversized">Oversized</option>
                          <option value="Relaxed">Relaxed</option>
                          <option value="Baggy">Baggy</option>
                          <option value="Regular">Regular</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-neutral-400 mb-1">Selling Price (₹)</label>
                        <input
                          type="number"
                          required
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                          className="w-full bg-black border border-neutral-700 p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">MRP (₹)</label>
                        <input
                          type="number"
                          value={productForm.mrp}
                          onChange={(e) => setProductForm({ ...productForm, mrp: Number(e.target.value) })}
                          className="w-full bg-black border border-neutral-700 p-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-400 mb-1">Inventory Stock</label>
                        <input
                          type="number"
                          value={productForm.stockCount}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              stockCount: Number(e.target.value),
                              inStock: Number(e.target.value) > 0,
                            })
                          }
                          className="w-full bg-black border border-neutral-700 p-2 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1">Fabric & Craft Specification</label>
                      <input
                        type="text"
                        value={productForm.fabric}
                        onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                        placeholder="100% Combed Heavy Cotton (no obsolete GSM)"
                        className="w-full bg-black border border-neutral-700 p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1">Image URL</label>
                      <input
                        type="url"
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full bg-black border border-neutral-700 p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full bg-black border border-neutral-700 p-2 text-white"
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={productForm.published}
                          onChange={(e) => setProductForm({ ...productForm, published: e.target.checked })}
                        />
                        <span className="text-white">Publish to live customer storefront</span>
                      </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                      <button
                        type="button"
                        onClick={() => setShowProductModal(false)}
                        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-white hover:bg-neutral-200 text-black font-bold"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORDERS & FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display font-black text-xl uppercase tracking-wider text-white">
                Orders & Fulfillment
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Manage order fulfillment, delivery tracking, and status transitions for Delhi NCR.
              </p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-neutral-800 text-neutral-400 uppercase bg-neutral-950/40">
                  <tr>
                    <th className="p-3.5">Order</th>
                    <th>Customer</th>
                    <th>Delivery Area</th>
                    <th>Items</th>
                    <th>Pay Status</th>
                    <th>Order Status</th>
                    <th className="p-3.5">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-white/[0.02]">
                      <td className="p-3.5">
                        <p className="text-white font-bold">{o.id}</p>
                        <p className="text-[10px] text-neutral-500">
                          {new Date(o.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </td>
                      <td>
                        <p className="text-white">{o.customer?.name}</p>
                        <p className="text-[10px] text-neutral-500">{o.customer?.phone}</p>
                      </td>
                      <td>
                        <p className="text-emerald-400 font-bold">{o.shippingAddress?.city}</p>
                        <p className="text-[10px] text-neutral-500">PIN: {o.shippingAddress?.pincode}</p>
                      </td>
                      <td>
                        <span className="font-bold text-white">₹{o.pricing?.finalTotal}</span>
                        <p className="text-[10px] text-neutral-500">{o.items?.length} items</p>
                      </td>
                      <td>
                        <span
                          className={`px-2 py-0.5 text-[10px] ${
                            o.paymentStatus === 'Paid'
                              ? 'bg-emerald-950 text-emerald-300'
                              : 'bg-amber-950 text-amber-300'
                          }`}
                        >
                          {o.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <span className="px-2 py-0.5 text-[10px] bg-neutral-800 text-white font-bold">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <select
                          value={o.status}
                          onChange={(e) => handleOrderStatusUpdate(o.id, e.target.value)}
                          className="bg-black border border-neutral-700 text-white text-[11px] p-1.5 outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: STOREFRONT CMS */}
        {activeTab === 'cms' && cms && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-black text-xl uppercase tracking-wider text-white">
                  Storefront CMS & Campaign Manager
                </h2>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Update live hero banners, announcement bar, and promotional campaigns without editing code.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleRollbackCms}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-display text-xs uppercase px-4 py-2.5 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw size={13} />
                  <span>Rollback</span>
                </button>
                <button
                  onClick={handleSaveCms}
                  className="bg-white hover:bg-neutral-200 text-black font-display font-bold text-xs uppercase px-5 py-2.5 flex items-center gap-1.5 transition-colors shadow-lg"
                >
                  <Save size={14} />
                  <span>Publish to Live Storefront</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveCms} className="space-y-6 text-xs font-mono">
              {/* 1. HERO SECTION CMS */}
              <div className="bg-neutral-900 border border-neutral-800 p-6 space-y-4">
                <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider border-b border-neutral-800 pb-2">
                  1. Homepage Hero Banner
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 mb-1">Headline</label>
                    <input
                      type="text"
                      value={cms.hero?.headline || ''}
                      onChange={(e) =>
                        setCms({ ...cms, hero: { ...cms.hero, headline: e.target.value } })
                      }
                      className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Subheadline / Badge</label>
                    <input
                      type="text"
                      value={cms.hero?.subheadline || ''}
                      onChange={(e) =>
                        setCms({ ...cms, hero: { ...cms.hero, subheadline: e.target.value } })
                      }
                      className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Hero Description</label>
                  <textarea
                    rows={2}
                    value={cms.hero?.description || ''}
                    onChange={(e) =>
                      setCms({ ...cms, hero: { ...cms.hero, description: e.target.value } })
                    }
                    className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-neutral-400 mb-1">Primary CTA Button</label>
                    <input
                      type="text"
                      value={cms.hero?.buttonPrimaryText || ''}
                      onChange={(e) =>
                        setCms({ ...cms, hero: { ...cms.hero, buttonPrimaryText: e.target.value } })
                      }
                      className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Destination URL</label>
                    <input
                      type="text"
                      value={cms.hero?.buttonPrimaryUrl || ''}
                      onChange={(e) =>
                        setCms({ ...cms, hero: { ...cms.hero, buttonPrimaryUrl: e.target.value } })
                      }
                      className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Hero Background Image</label>
                    <input
                      type="url"
                      value={cms.hero?.backgroundImage || ''}
                      onChange={(e) =>
                        setCms({ ...cms, hero: { ...cms.hero, backgroundImage: e.target.value } })
                      }
                      className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 2. ANNOUNCEMENT BAR */}
              <div className="bg-neutral-900 border border-neutral-800 p-6 space-y-4">
                <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider border-b border-neutral-800 pb-2">
                  2. Promotional Announcement Bar
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-neutral-400 mb-1">Announcement Text</label>
                    <input
                      type="text"
                      value={cms.announcementBar?.text || ''}
                      onChange={(e) =>
                        setCms({
                          ...cms,
                          announcementBar: { ...cms.announcementBar, text: e.target.value },
                        })
                      }
                      className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Link URL</label>
                    <input
                      type="text"
                      value={cms.announcementBar?.link || ''}
                      onChange={(e) =>
                        setCms({
                          ...cms,
                          announcementBar: { ...cms.announcementBar, link: e.target.value },
                        })
                      }
                      className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 3. CAMPAIGN BANNER */}
              <div className="bg-neutral-900 border border-neutral-800 p-6 space-y-4">
                <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider border-b border-neutral-800 pb-2">
                  3. Promotional Campaign Banner
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 mb-1">Campaign Title</label>
                    <input
                      type="text"
                      value={cms.campaignBanner?.title || ''}
                      onChange={(e) =>
                        setCms({
                          ...cms,
                          campaignBanner: { ...cms.campaignBanner, title: e.target.value },
                        })
                      }
                      className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Campaign Badge</label>
                    <input
                      type="text"
                      value={cms.campaignBanner?.badge || ''}
                      onChange={(e) =>
                        setCms({
                          ...cms,
                          campaignBanner: { ...cms.campaignBanner, badge: e.target.value },
                        })
                      }
                      className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* 4. SEO CONFIGURATION */}
              <div className="bg-neutral-900 border border-neutral-800 p-6 space-y-4">
                <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider border-b border-neutral-800 pb-2">
                  4. Global SEO Metadata (SHARMAZONE Delhi NCR)
                </h3>

                <div>
                  <label className="block text-neutral-400 mb-1">Default Page Title Tag</label>
                  <input
                    type="text"
                    value={cms.seo?.defaultTitle || ''}
                    onChange={(e) =>
                      setCms({ ...cms, seo: { ...cms.seo, defaultTitle: e.target.value } })
                    }
                    className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Default Meta Description</label>
                  <textarea
                    rows={2}
                    value={cms.seo?.defaultDescription || ''}
                    onChange={(e) =>
                      setCms({ ...cms, seo: { ...cms.seo, defaultDescription: e.target.value } })
                    }
                    className="w-full bg-black border border-neutral-700 p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-white hover:bg-neutral-200 text-black font-display font-bold text-xs uppercase px-6 py-3.5 tracking-wider transition-colors shadow-xl"
                >
                  Publish Changes to Customer Storefront
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display font-black text-xl uppercase tracking-wider text-white">
                Promotional Coupons Engine
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Active discount codes validated on the server with usage counter and minimum spend rules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  code: 'FIRST10',
                  disc: '10% OFF',
                  rule: 'First-time customer discount',
                  used: 14,
                  min: '₹0',
                },
                {
                  code: 'SHARMA10',
                  disc: '10% OFF',
                  rule: 'Storewide seasonal fashion discount',
                  used: 28,
                  min: '₹0',
                },
                {
                  code: 'DELHINCR',
                  disc: '15% OFF',
                  rule: 'Exclusive Delhi NCR orders above ₹1,499',
                  used: 42,
                  min: '₹1,499',
                },
                {
                  code: 'WELCOME200',
                  disc: '₹200 FLAT',
                  rule: 'Flat discount on orders above ₹999',
                  used: 19,
                  min: '₹999',
                },
              ].map((c) => (
                <div key={c.code} className="bg-neutral-900 border border-neutral-800 p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm bg-white/10 px-2 py-0.5 text-white">
                      {c.code}
                    </span>
                    <span className="text-emerald-400 font-display font-bold text-xs">{c.disc}</span>
                  </div>
                  <p className="text-xs text-neutral-300 font-sans">{c.rule}</p>
                  <div className="flex justify-between text-[11px] font-mono text-neutral-500 pt-2 border-t border-neutral-800">
                    <span>Min Cart: {c.min}</span>
                    <span>Used: {c.used} times</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
