"use client";

import { useState, useEffect, FormEvent } from "react";

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string;
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
  });

  // Fetch Products
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

  useEffect(() => {
    fetchProducts();
  }, []);

  // ------------------- ADD PRODUCT -------------------
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

  return (
    <div className="p-6 bg-gray-100 w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>

      {/* Add Product Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowAddModal(true)}
      >
        Add Product
      </button>

      {/* Product Table */}
      <div className="bg-white p-4 shadow-md rounded">
        {error && <p className="text-red-500">{error}</p>}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-center">
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">{product.stock}</td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleAddSubmit}>
              <input
                type="text"
                placeholder="Name"
                className="border p-2 w-full mb-2"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                className="border p-2 w-full mb-2"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                className="border p-2 w-full mb-2"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              />
              <input
                type="number"
                placeholder="Stock"
                className="border p-2 w-full mb-4"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
              />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete {selectedProduct?.name}?</p>
            <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">
              Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
