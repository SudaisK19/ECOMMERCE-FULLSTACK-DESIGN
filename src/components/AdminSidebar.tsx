"use client";
import React from "react";

interface Chat {
  _id: string;
  status: "waiting" | "active";
  users: { id: string; name: string; role: string }[];
  latestMessage?: { timestamp: number | string };
}

interface Props {
  adminName: string;
  chats: Chat[];
  onSelect: (id: string) => void;
  onAccept: (id: string) => void;
  onReject:  (id: string) => void;
}

export default function AdminSidebar({
  adminName,
  chats,
  onSelect,
  onAccept,
  onReject,
}: Props) {
  return (
    <aside className="w-72 bg-white shadow-lg flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 h-16 bg-gradient-to-r from-blue-500 to-blue-300 shadow">
        <div className="flex items-center">
          <img
            src="/images/avatar.png"
            alt="Admin avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-4 text-xl font-semibold text-black">
            {adminName}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {/* icons left blank if unused */}
        </div>
      </div>

      {/* CHAT LIST */}
      <ul className="flex-1 overflow-y-auto p-4 bg-blue-50">
        {chats.map((c) => {
          const customer = c.users.find((u) => u.role === "customer")!;
          return (
            <li key={c._id} className="mb-3">
              <div className="flex items-center justify-between bg-white border rounded-lg shadow-sm px-4 py-3 hover:bg-blue-50 transition">
                {/* select chat */}
                <button
                  onClick={() => onSelect(c._id)}
                  className="flex items-center space-x-3"
                >
                  <img
                    src="/images/avatar.png"
                    alt={customer.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="text-gray-800">{customer.name}</span>
                </button>
                <div className="flex space-x-2">
                  {/* only show accept while waiting */}
                  {c.status === "waiting" && (
                    <button
                      onClick={() => onAccept(c._id)}
                      className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center"
                    >
                      ✓
                    </button>
                  )}
                  {/* delete always available */}
                  <button
                    onClick={() => onReject(c._id)}
                    className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
