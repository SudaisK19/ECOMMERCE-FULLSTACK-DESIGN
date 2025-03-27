"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Update the interface so that category can be either a string or an object
interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string | { _id: string; name: string };
}

// Define an interface for admin info
interface AdminInfo {
  _id: string;
  name: string;
  email: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"dashboard" | "products">("dashboard");
  const [user, setUser] = useState<AdminInfo | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();

  // Fetch admin info
  const fetchAdminInfo = async () => {
    try {
      const res = await fetch("/api/admin/info");
      const data = await res.json();
      if (data.admin) {
        setUser(data.admin);
      } else {
        setError("Admin info not found.");
      }
    } catch (err) {
      setError("Failed to fetch admin info.");
    }
  };

  // Fetch products for product management tab
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/product-management");
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
        setError("");
      } else {
        setError("No products found.");
      }
    } catch (err) {
      setError("Failed to fetch products.");
    }
  };

  // Fetch admin info on component mount
  useEffect(() => {
    fetchAdminInfo();
  }, []);

  // Fetch products when the products tab is active
  useEffect(() => {
    if (activeTab === "products") {
      fetchProducts();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      router.push("/auth?mode=login");
    }
  };

  // ------------------- ADD PRODUCT -------------------
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });

  const handleAddClick = () => {
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
    });
    setShowAddModal(true);
  };

  const handleAddSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/product-management", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        setError("Failed to add product.");
        return;
      }
      fetchProducts();
      setShowAddModal(false);
    } catch (err) {
      setError("Failed to add product.");
    }
  };

  // ------------------- EDIT PRODUCT -------------------
  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProduct?._id) return;
    try {
      const res = await fetch("/api/admin/product-management", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedProduct),
      });
      if (!res.ok) {
        setError("Failed to update product.");
        return;
      }
      fetchProducts();
      setShowEditModal(false);
    } catch (err) {
      setError("Failed to update product.");
    }
  };

  // ------------------- DELETE PRODUCT -------------------
  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct?._id) return;
    try {
      const res = await fetch("/api/admin/product-management", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedProduct._id }),
      });
      if (!res.ok) {
        setError("Failed to delete product.");
        return;
      }
      fetchProducts();
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete product.");
    }
  };

  // Helper to convert category to a string for inputs
  const getCategoryString = (cat: Product["category"]): string => {
    if (!cat) return "";
    if (typeof cat === "object") return cat.name || "";
    return cat;
  };

  return (
    <div className="admin-layout">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-left">
          <div className="logo-icon">
            <img src="/images/brand-icon.png" alt="Brand Icon" />
          </div>
          <span className="logo-text">Brand</span>
          <span className="admin-panel-text">Admin Panel</span>
        </div>
      </header>

      {/* Main Layout */}
      <div className="content-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="nav-links">
            <button
              className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </button>
            <button
              className={`nav-item ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <i className="fas fa-box"></i> Product Management
            </button>
          </nav>

          {/* User Info - Dynamic Admin Info */}
          <div className="user-info">
            {user ? (
              <>
                <img src="/images/avatar.png" alt="User Avatar" className="user-avatar" />
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>  {/* Display email here */}
                <div className="user-role">Admin</div>
              </>
            ) : (
              <p>Loading admin info...</p>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {activeTab === "dashboard" && (
            <div className="dashboard-charts">
              <h2>Dashboard Charts</h2>
              <div className="charts-row">
                <div className="analytics-graph card">
                  <h3>Analytics Graph</h3>
                  <div className="chart-placeholder">[Analytics Chart]</div>
                </div>
                <div className="traffic-by-source card">
                  <h3>Traffic by Source</h3>
                  <div className="chart-placeholder">[Traffic by Source Chart]</div>
                </div>
              </div>
              <div className="charts-row">
                <div className="traffic-by-device card">
                  <h3>Traffic by Device</h3>
                  <div className="chart-placeholder">[Traffic by Device Chart]</div>
                </div>
                <div className="traffic-by-location card">
                  <h3>Traffic by Location</h3>
                  <div className="chart-placeholder">[Traffic by Location Chart]</div>
                </div>
              </div>
            </div>
          )}

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
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>
                            {typeof product.category === "object"
                              ? product.category.name
                              : product.category}
                          </td>
                          <td>${product.price}</td>
                          <td>{product.stock}</td>
                          <td>
                            <button onClick={() => handleEditClick(product)} className="edit-link">
                              Edit
                            </button>
                            <button onClick={() => handleDeleteClick(product)} className="delete-btn">
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
        </main>
      </div>

      {/* ADD PRODUCT MODAL */}
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
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
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
                <button type="submit" className="save-btn">
                  Update
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Delete Product</h3>
            <p>
              Are you sure you want to delete <strong>{selectedProduct.name}</strong>?
            </p>
            <div className="modal-actions">
              <button onClick={confirmDelete} className="delete-confirm-btn">
                Delete
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
