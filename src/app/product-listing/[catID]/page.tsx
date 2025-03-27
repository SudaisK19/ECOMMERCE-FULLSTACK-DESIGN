"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Sidebarlisting from "@/components/sidebarlisting"; 
import Image from "next/image";



/** Product interface using 'name' to match your schema */
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[]; // Updated to match the schema
}

/** Category interface */
interface Category {
  _id: string;
  name: string;
}

export default function ProductListingPage() {
  const { catID } = useParams();
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories] = useState<Category[]>([]);

  // Handlers for toggling the view mode
  const handleGridClick = () => setViewMode("grid");
  const handleListClick = () => setViewMode("list");

  // Fetch products for the given category
  useEffect(() => {
    if (!catID) return;
    fetch(`/api/shop/product-list/${catID}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data.products);
        setProducts(data.products || []);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [catID]);

  
  

  // Find the current category by matching catID to display its name
  const currentCategory = categories.find((cat) => cat._id === catID);

  return (
    <div className="product-listing-container">
      
      <Sidebarlisting/>
      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        <div className="top-bar">
          <div className="top-bar-inner">
            <div className="top-bar-left">
              <p className="top-bar-text">
                {products.length} items in category:{" "}
                {currentCategory ? currentCategory.name : catID}
              </p>
            </div>
            <div className="top-bar-right">
              <div className="verified-only">
                <input type="checkbox" id="verifiedOnly" defaultChecked />
                <label htmlFor="verifiedOnly">Verified only</label>
              </div>
              <div className="selectbox-done">
                <span className="selectbox-text">Featured</span>
                <span className="selectbox-icon">
                <Image
                  src="/images/arrow-d.png"
                  alt="Arrow down"
                  className="arrow-down"
                  width={24}
                  height={24}
                />

                </span>
              </div>
              <div className="btn-group">
                <button
                  className={`btn-grid ${viewMode === "grid" ? "active" : ""}`}
                  onClick={handleGridClick}
                  aria-label="Grid view"
                >
                  <Image
                    src="/images/grid-button.png"
                    alt="Grid view"
                    className="toggle-icon"
                    width={32}
                    height={32}
                  />

                </button>
                <button
                  className={`btn-list ${viewMode === "list" ? "active" : ""}`}
                  onClick={handleListClick}
                  aria-label="List view"
                >
                  <Image
                    src="/images/list-button.png"
                    alt="List view"
                    className="toggle-icon"
                    width={32}
                    height={32}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product listing cards */}
        <div className={`products-wrapper ${viewMode}-view grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4`}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-all">
                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform">
                  <Image src="/images/cart-button.png" alt="Add to cart" width={20} height={20} />
                </button>

                {/* Product Image - Handles Both Grid & List View */}
                <div className={`product-image flex ${viewMode === 'list' ? 'flex-row items-center' : 'justify-center'}`}>
                  <Image
                    src={product.images?.length > 0 ? product.images[0] : "/images/default-product.png"}
                    alt={product.name}
                    width={viewMode === 'list' ? 100 : 250} 
                    height={viewMode === 'list' ? 100 : 250}
                    className={`object-cover rounded-lg ${viewMode === 'list' ? 'mr-4' : ''}`}
                  />
                </div>

                {/* Product Details */}
                <div className="product-details text-center mt-3">
                  <h3 className="product-title font-semibold text-gray-900">{product.name}</h3>
                  <div className="product-price text-lg font-bold text-blue-600">${product.price}</div>
                  <p className="product-description text-sm text-gray-600">{product.description}</p>

                  {/* ✅ Next.js Link for navigation */}
                  <Link href={`/product-detail/${product._id}`} passHref>
                    <span className="view-details text-blue-500 hover:underline cursor-pointer">View details</span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found for this category.</p>
          )}
        </div>

        {/* PAGINATION (if needed) */}
        <div className="pagination-container">
          <button className="page-btn disabled">&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">...</button>
          <button className="page-btn">10</button>
          <button className="page-btn">&gt;</button>
        </div>
      </main>

      {/* --- STYLES (inline for demonstration) --- */}
      <style jsx>{`
        /* PAGE LAYOUT */
        .product-listing-container {
          display: flex;
          margin: 0 auto;
          padding: 1rem;
          max-width: 1400px;
        }
        /* SIDEBAR */
        .sidebar-filters {
          width: 240px;
          margin-right: 2rem;
        }
        .collapsible-section {
          border-top: 1px solid #dee2e7;
          padding-top: 1rem;
          margin-bottom: 1rem;
        }
        .collapsible-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          margin-bottom: 0.5rem;
        }
        .collapsible-title {
          font-family: "Inter", sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #1c1c1c;
          margin: 0;
        }
        .collapsible-icon {
          display: flex;
          align-items: center;
        }
        .arrow-img {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }
        .arrow-open {
          transform: rotate(180deg);
        }
        .arrow-closed {
          transform: rotate(0deg);
        }
        .collapsible-body {
          margin-top: 0.5rem;
        }
        .filter-list {
          list-style: none;
          margin: 0;
          padding: 0;
          font-family: "Inter", sans-serif;
        }
        .filter-list li {
          margin-bottom: 0.5rem;
          cursor: pointer;
        }
        .see-all {
          display: inline-block;
          margin-top: 0.5rem;
          color: #0d6efd;
          font-size: 14px;
          text-decoration: none;
          font-family: "Inter", sans-serif;
        }
        .checkbox-row {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          font-family: "Inter", sans-serif;
        }
        .checkbox-row input[type="checkbox"] {
          margin-right: 0.5rem;
        }
        .checkbox-row label {
          font-size: 14px;
          color: #1c1c1c;
        }
        /* PRICE RANGE */
        .price-inputs {
          display: flex;
          gap: 1rem;
          margin: 0.5rem 0;
        }
        .price-inputs label {
          display: block;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          margin-bottom: 0.25rem;
          color: #1c1c1c;
        }
        .price-inputs input {
          width: 80px;
          padding: 4px;
          border: 1px solid #dee2e7;
          border-radius: 4px;
          font-family: "Inter", sans-serif;
        }
        .range-bar {
          position: relative;
          height: 6px;
          background: #dee2e7;
          border-radius: 3px;
          margin-bottom: 1rem;
          margin-top: 0.5rem;
        }
        .range-active {
          position: absolute;
          left: 20%;
          width: 50%;
          top: 0;
          bottom: 0;
          background: #0d6efd;
          border-radius: 3px;
        }
        .range-control {
          position: absolute;
          width: 16px;
          height: 16px;
          background: #ffffff;
          border: 2px solid #0d6efd;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .left-control {
          left: 20%;
        }
        .right-control {
          left: 70%;
        }
        .apply-button {
          padding: 6px 12px;
          background: #0d6efd;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-family: "Inter", sans-serif;
        }
        /* RATING STARS */
        .stars {
          display: inline-flex;
          gap: 2px;
        }
        .star {
          width: 16px;
          height: 16px;
          background: url("/images/star-empty.png") no-repeat center/cover;
          display: inline-block;
        }
        .star-active {
          background: url("/images/star-filled.png") no-repeat center/cover;
        }
        /* MAIN CONTENT + TOP BAR */
        .main-content {
          flex: 1;
          position: relative;
        }
        .top-bar {
          background: #ffffff;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          margin-bottom: 1rem;
          padding: 0.5rem;
          font-family: "Inter", sans-serif;
        }
        .top-bar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .top-bar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-right: 1rem;
        }
        .verified-only {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .verified-only input[type="checkbox"] {
          width: 20px;
          height: 20px;
          background: #0d6efd;
          border-radius: 5px;
          cursor: pointer;
        }
        .top-bar-text {
          margin: 0 1rem;
          font-family: "Inter", sans-serif;
        }
        .selectbox-done {
          position: relative;
          width: 172px;
          height: 40px;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.5rem;
          cursor: pointer;
        }
        .selectbox-text {
          font-family: "Inter", sans-serif;
          font-size: 16px;
          color: #1c1c1c;
        }
        .selectbox-icon {
          display: flex;
          align-items: center;
        }
        .arrow-down {
          width: 8px;
          height: 8px;
          margin-left: 4px;
        }
        .btn-group {
          display: flex;
          gap: 0.25rem;
        }
        .btn-grid,
        .btn-list {
          width: 38px;
          height: 40px;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-grid.active,
        .btn-list.active {
          background: #eff2f4;
        }
        .toggle-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        /* PRODUCT CARDS */
        .products-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .products-wrapper.grid-view {
          flex-direction: row;
          flex-wrap: wrap;
        }
        .products-wrapper.grid-view .product-card {
          width: calc(33.333% - 1rem);
        }
        .products-wrapper.list-view .product-card {
          width: 100%;
        }
        .product-card {
          position: relative;
          min-height: 230px;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          background: #ffffff;
          padding: 1rem;
          display: flex;
          gap: 1rem;
        }
        .btn-favorite {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .favorite-icon {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .product-image {
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }
        .image-placeholder {
          background-color: #f0f0f0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b96a5;
          font-size: 14px;
          border-radius: 6px;
          font-family: "Inter", sans-serif;
        }
        .product-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .product-title {
          font-family: "Inter", sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #1c1c1c;
          margin: 0;
        }
        .product-price {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .price {
          font-family: "Inter", sans-serif;
          font-weight: 600;
          font-size: 20px;
          color: #1c1c1c;
        }
        .old-price {
          font-family: "Inter", sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #8b96a5;
          text-decoration: line-through;
        }
        .old-price.hidden {
          visibility: hidden;
        }
        .product-rating {
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .rating-text {
          font-family: "Inter", sans-serif;
          font-size: 16px;
          color: #8b96a5;
        }
        .dot-separator {
          width: 4px;
          height: 4px;
          background: #dee2e7;
          border-radius: 50%;
          margin: 0 0.25rem;
        }
        .free-shipping {
          font-family: "Inter", sans-serif;
          font-size: 16px;
          color: #00b517;
        }
        .product-description {
          font-family: "Inter", sans-serif;
          font-size: 16px;
          line-height: 24px;
          color: #505050;
          margin: 0.5rem 0;
          flex: 1;
        }
        .view-details {
          font-family: "Inter", sans-serif;
          font-weight: 500;
          font-size: 16px;
          color: #0d6efd;
          text-decoration: none;
        }
        /* PAGINATION */
        .pagination-container {
          display: inline-flex;
          border: 1px solid #dee2e7;
          border-radius: 6px;
          overflow: hidden;
          margin: 2rem auto 0 auto;
        }
        .page-btn {
          border: none;
          background: #fff;
          padding: 8px 16px;
          cursor: pointer;
          color: #505050;
          font-family: "Inter", sans-serif;
          font-size: 16px;
          transition: background 0.2s ease;
        }
        .page-btn + .page-btn {
          border-left: 1px solid #dee2e7;
        }
        .page-btn.active {
          background: #0d6efd;
          color: #fff;
        }
        .page-btn:hover:not(.active):not(.disabled) {
          background: #f5f5f5;
        }
        .page-btn.disabled {
          color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}