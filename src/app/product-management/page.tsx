// app/admin/product-management/page.tsx
"use client";

export default function ProductManagementPage() {
  return (
    <div className="admin-container">
      <header>
        <h1>Admin Panel: Product Management</h1>
      </header>
      <section className="admin-info">
        <p>Welcome, Admin! Here you can manage products.</p>
        {/* Future product management components go here */}
      </section>
      <style jsx>{`
        .admin-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          font-family: "Source Sans Pro", sans-serif;
        }
        header h1 {
          font-size: 32px;
          color: #2c7cf1;
          text-align: center;
          margin-bottom: 20px;
        }
        .admin-info {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
