// components/AdminDashboard.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// --- your existing Product & AdminInfo interfaces ---
interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string | { _id: string; name: string };
}
interface AdminInfo {
  _id: string;
  name: string;
  email: string;
}

// --- new Order interfaces ---
interface OrderItem {
  productId: { name: string; price: number };
  quantity: number;
}
interface Order {
  _id: string;
  userId: { _id: string; name: string; email: string };
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: string;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();

  // --- Shared admin/user state ---
  const [user, setUser] = useState<AdminInfo | null>(null);
  const [error, setError] = useState("");

  // which tab is active?
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders">("dashboard");

  // product-management state
  const [products, setProducts] = useState<Product[]>([]);
  // order-management state
  const [orders, setOrders] = useState<Order[]>([]);

  // modal & selection state for products
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // form state for new product
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });

  // --- Fetch admin info once ---
  useEffect(() => {
    fetch("/api/admin/info")
      .then((r) => r.json())
      .then((data) => {
        if (data.admin) setUser(data.admin);
        else setError("Admin info not found.");
      })
      .catch(() => setError("Failed to fetch admin info."));
  }, []);

  // --- Fetch products when products tab opens ---
  useEffect(() => {
    if (activeTab !== "products") return;
    fetch("/api/admin/product-management")
      .then((r) => r.json())
      .then((data) => {
        if (data.products) setProducts(data.products);
        else setError("No products found.");
      })
      .catch(() => setError("Failed to fetch products."));
  }, [activeTab]);

  // --- Fetch orders when orders tab opens ---
  useEffect(() => {
    if (activeTab !== "orders") return;
    fetch("/api/admin/order-management")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
        else setError(data.error || "No orders found.");
      })
      .catch(() => setError("Failed to fetch orders."));
  }, [activeTab]);

  // --- Logout handler ---
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth?mode=login");
  };

  // ------------ PRODUCT MANAGEMENT HANDLERS ------------

  const handleAddClick = () => {
    setNewProduct({ name: "", description: "", price: 0, stock: 0, category: "" });
    setShowAddModal(true);
  };
  const handleAddSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/product-management", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (!res.ok) return setError("Failed to add product.");
    setShowAddModal(false);
    setActiveTab("dashboard");
    setTimeout(() => setActiveTab("products"), 0);
  };
  const handleEditClick = (p: Product) => {
    setSelectedProduct(p);
    setShowEditModal(true);
  };
  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProduct?._id) return;
    const res = await fetch("/api/admin/product-management", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedProduct),
    });
    if (!res.ok) return setError("Failed to update product.");
    setShowEditModal(false);
    setActiveTab("dashboard");
    setTimeout(() => setActiveTab("products"), 0);
  };
  const handleDeleteClick = (p: Product) => {
    setSelectedProduct(p);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    if (!selectedProduct?._id) return;
    const res = await fetch("/api/admin/product-management", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedProduct._id }),
    });
    if (!res.ok) return setError("Failed to delete product.");
    setShowDeleteModal(false);
    setActiveTab("dashboard");
    setTimeout(() => setActiveTab("products"), 0);
  };
  const getCategoryString = (cat: Product["category"]): string =>
    !cat ? "" : typeof cat === "object" ? cat.name : cat;

  // ------------ ORDER MANAGEMENT HANDLERS ------------

  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    const res = await fetch("/api/admin/order-management", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: orderId, status: newStatus }),
    });
    if (res.ok) {
      setOrders((o) =>
        o.map((ord) =>
          ord._id === orderId ? { ...ord, status: newStatus } : ord
        )
      );
    } else {
      setError("Failed to update order status.");
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm("Delete this order?")) return;
    const res = await fetch("/api/admin/order-management", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: orderId }),
    });
    if (res.ok) {
      setOrders((o) => o.filter((ord) => ord._id !== orderId));
    } else {
      setError("Failed to delete order.");
    }
  };

  return (
    <div className="admin-layout">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-left">
          <div className="logo-icon">
            <Image src="/images/brand-icon.png" alt="Brand" width={40} height={40} />
          </div>
          <span className="logo-text">Brand</span>
          <span className="admin-panel-text">Admin Panel</span>
        </div>
      </header>

      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="nav-links">
            <button
              className={`nav-item ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <i className="fas fa-box" /> Product Management
            </button>
            <button
              className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <i className="fas fa-clipboard-list" /> Order Management
            </button>
          </nav>

          {/* Admin Info & Logout */}
          <div className="user-info">
            {user ? (
              <>
                <Image src="/images/avatar.png" alt="User" width={50} height={50} className="user-avatar" />
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
                <div className="user-role">Admin</div>
              </>
            ) : (
              <p>Loading admin info…</p>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Product Management */}
          {activeTab === "products" && (
            <div className="product-card">
              <h2 className="product-title">Product Management</h2>
              {error && <div className="error-message">{error}</div>}
              <div className="top-actions">
                <button onClick={handleAddClick} className="add-product-btn">
                  Add Product
                </button>
              </div>
              <div className="table-wrapper">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((p) => (
                        <tr key={p._id}>
                          <td>{p._id}</td>
                          <td>{p.name}</td>
                          <td>{getCategoryString(p.category)}</td>
                          <td>${p.price}</td>
                          <td>{p.stock}</td>
                          <td>
                            <button onClick={() => handleEditClick(p)} className="edit-link">
                              Edit
                            </button>
                            <button onClick={() => handleDeleteClick(p)} className="delete-btn">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center" }}>
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Order Management */}
          {activeTab === "orders" && (
            <div className="product-card">
              <h2 className="product-title">Order Management</h2>
              {error && <div className="error-message">{error}</div>}
              <div className="table-wrapper">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>User</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((o) => (
                        <tr key={o._id}>
                          <td>{o._id}</td>
                          <td>
                            {o.userId.name}<br/>
                            <small>{o.userId.email}</small>
                          </td>
                          <td>
                            {o.items.map((it) => (
                              <div key={it.productId.name}>
                                {it.productId.name} × {it.quantity}
                              </div>
                            ))}
                          </td>
                          <td>${o.totalAmount.toFixed(2)}</td>
                          <td>{o.shippingAddress}</td>
                          <td>
                            <select
                              value={o.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  o._id,
                                  e.target.value as Order["status"]
                                )
                              }
                            >
                              {["pending","shipped","delivered","cancelled"].map((s) => (
                                <option key={s} value={s}>
                                  {s.charAt(0).toUpperCase()+s.slice(1)}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>{new Date(o.createdAt).toLocaleString()}</td>
                          <td>
                            <button
                              onClick={() => handleDeleteOrder(o._id)}
                              className="delete-btn"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} style={{ textAlign: "center" }}>
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ADD / EDIT / DELETE PRODUCT MODALS */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Product</h3>
            <form onSubmit={handleAddSubmit} className="modal-form">
              <label>Product Name</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
              <label>Description</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                required
              />
              <label>Price</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                required
              />
              <label>Stock</label>
              <input
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                required
              />
              <label>Category</label>
              <input
                type="text"
                value={getCategoryString(newProduct.category)}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEditModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Product</h3>
            <form onSubmit={handleEditSubmit} className="modal-form">
              <label>Product Name</label>
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                required
              />
              <label>Description</label>
              <textarea
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, description: e.target.value })
                }
                required
              />
              <label>Price</label>
              <input
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })
                }
                required
              />
              <label>Stock</label>
              <input
                type="number"
                value={selectedProduct.stock}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, stock: Number(e.target.value) })
                }
                required
              />
              <label>Category</label>
              <input
                type="text"
                value={getCategoryString(selectedProduct.category)}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, category: e.target.value })
                }
                required
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn">Update</button>
                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Product</h3>
            <p>Are you sure you want to delete <strong>{selectedProduct.name}</strong>?</p>
            <div className="modal-actions">
              <button onClick={confirmDelete} className="delete-confirm-btn">Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All your existing <style jsx>… */}
      <style jsx>{`
        html,
        body,
        #__next {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          font-family: sans-serif;
          box-sizing: border-box;
        }

        *,
        *::before,
        *::after {
          box-sizing: inherit;
        }

        .admin-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          background: #f8f9fa;
          overflow-x: hidden;
        }

        .top-bar {
          background: #fff;
          padding: 10px 20px;
          border-bottom: 1px solid #dee2e7;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .top-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          background: #8cb7f5;
          padding: 8px;
          border-radius: 8px;
        }

        .logo-icon img {
          width: 24px;
          height: 24px;
        }

        .logo-text {
          font-size: 20px;
          font-weight: 700;
          color: #0d6efd;
        }

        .admin-panel-text {
          font-size: 1.2rem;
          color: #0d6efd;
          font-weight: 600;
        }

        .content-wrapper {
          display: flex;
          flex: 1;
          width: 100%;
          max-width: 100vw;
          overflow: hidden;
        }

        .sidebar {
          width: clamp(180px, 20%, 240px);
          background: #fff;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid #e0e0e0;
        }

        .nav-links {
          display: flex;
          flex-direction: column;
        }

        .nav-item {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          color: #333;
          padding: 10px;
          margin-bottom: 5px;
          text-align: left;
          border-radius: 6px;
          cursor: pointer;
          width: 100%;
        }

        .nav-item.active,
        .nav-item:hover {
          background: #e9ecef;
          font-weight: 600;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 1rem;
        }

        .user-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }

        .user-name {
          font-weight: bold;
          color: #333;
        }

        .user-role {
          font-size: 0.85rem;
          color: #888;
        }

        .logout-btn {
          margin-top: 8px;
          background: #f44336;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .main-content {
          flex: 1;
          padding: 20px;
          width: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .product-card {
          background: white;
          padding: 20px;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        }

        .product-title {
          color: #0d6efd;
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .top-actions {
          margin-bottom: 1rem;
        }

        .add-product-btn {
          background: #0d6efd;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          border: none;
          cursor: pointer;
        }

        .error-message {
          background: #ffe9e0;
          border: 1px solid #ffa07a;
          padding: 10px;
          margin-bottom: 1rem;
          color: #a94442;
          border-radius: 4px;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .product-table {
          width: 100%;
          border-collapse: collapse;
        }

        .product-table th,
        .product-table td {
          padding: 10px;
          border-bottom: 1px solid #e0e0e0;
          text-align: left;
        }

        .edit-link {
          color: #0d6efd;
          margin-right: 10px;
          border: none;
          background: none;
          cursor: pointer;
        }

        .delete-btn {
          border: none;
          background: none;
          color: #e53935;
          cursor: pointer;
        }

        .dashboard-charts {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .charts-row {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        .card {
          background: #fff;
          border: 1px solid rgba(28, 28, 28, 0.1);
          box-shadow: 6px 6px 50px rgba(0, 0, 0, 0.05);
          border-radius: 16px;
          padding: 24px;
          flex: 1 1 300px;
          min-width: 0;
        }

        .chart-placeholder {
          height: 200px;
          background: #f1f2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          font-size: 1rem;
          border-radius: 8px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .modal {
          background: #fff;
          padding: 20px;
          border-radius: 6px;
          width: 400px;
          max-width: 90%;
        }

        .modal h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #0d6efd;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
        }

        .modal-form label {
          margin-top: 0.5rem;
          margin-bottom: 0.2rem;
          font-weight: 500;
        }

        .modal-form input,
        .modal-form textarea {
          padding: 8px;
          margin-bottom: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }

        .save-btn,
        .delete-confirm-btn {
          background: #0d6efd;
          color: #fff;
          padding: 8px 16px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        .delete-confirm-btn {
          background: #d9534f;
        }

        .cancel-btn {
          background: #6c757d;
          color: #fff;
          padding: 8px 16px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .content-wrapper {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            max-width: 100%;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-around;
          }
          .main-content {
            padding: 12px;
          }
          .modal {
            width: 95%;
          }
        }
      `}</style>
    </div>
  );
}