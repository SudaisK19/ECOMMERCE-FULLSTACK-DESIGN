"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch profile");
        } else {
          setProfile(data.user);
          setFormData({
            name: data.user.name,
            email: data.user.email,
            address: data.user.address || "",
            phone: data.user.phone || ""
          });
        }
      } catch {
        setError("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) router.push("/auth");
      else alert("Logout failed");
    } catch {
      alert("Logout error");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data.user);
        setEditMode(false);
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch {
      setError("Error updating profile");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!profile) return <div>No profile data found</div>;

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      {!editMode ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Address:</strong> {profile.address || "Not provided"}</p>
          <p><strong>Phone:</strong> {profile.phone || "Not provided"}</p>
          <div className="button-group">
            <button onClick={() => setEditMode(true)}>Edit Info</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="button-group">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
      <style jsx>{`
        .profile-container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          font-family: "Source Sans Pro", sans-serif;
        }
        h2 {
          text-align: center;
          color: #2c7cf1;
        }
        .profile-details p {
          font-size: 16px;
          margin: 10px 0;
        }
        .button-group {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }
        button {
          padding: 8px 16px;
          background: #2c7cf1;
          border: none;
          color: #fff;
          border-radius: 4px;
          cursor: pointer;
        }
        .edit-form div {
          margin: 10px 0;
        }
        .edit-form label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .edit-form input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
