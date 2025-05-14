// pages/admin-chat.tsx (or wherever your AdminChatPage lives)
"use client";

import { useEffect, useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import AdminSidebar from "@/components/AdminSidebar";

type Chat = {
  _id: string;
  status: "waiting" | "active";
  users: { id: string; name: string; role: string }[];
};

export default function AdminChatPage() {
  const [chatId, setChatId]       = useState<string | null>(null);
  const [me, setMe]               = useState<string>("");
  const [adminName, setAdminName] = useState<string>("Admin");
  const [chats, setChats]         = useState<Chat[]>([]);

  // fetch admin info + chats
  useEffect(() => {
    // get admin name
    fetch("/api/admin/info", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setAdminName(data.admin.name))
      .catch(() => setAdminName("Admin"));

    // set your own ID
    setMe("67e4ce2a3a34023e8484d3ba");

    // load chats
    const token = localStorage.getItem("authToken");
    fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/api/chat/admin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((list: Chat[]) => setChats(list))
      .catch(console.error);
  }, []);

  // accept a waiting chat
  const handleAccept = (id: string) => {
    const token = localStorage.getItem("authToken");
    fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/api/chat/accept`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chatId: id }),
    })
      .then((res) => res.json())
      .then(() => {
        // mark this chat as active
        setChats((prev) =>
          prev.map((c) =>
            c._id === id ? { ...c, status: "active" } : c
          )
        );
      })
      .catch(console.error);
  };

  // reject/delete a chat entirely
  const handleReject = (id: string) => {
    const token = localStorage.getItem("authToken");
    fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/api/chat/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        // remove from list & close if open
        setChats((prev) => prev.filter((c) => c._id !== id));
        if (chatId === id) setChatId(null);
      })
      .catch(console.error);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar
        adminName={adminName}
        chats={chats}
        onSelect={setChatId}
        onAccept={handleAccept}
        onReject={handleReject}
      />

      {chatId ? (
        <ChatWindow
          chatId={chatId}
          userId={me}
          title={
            // show the other user’s name as title
            chats
              .find((c) => c._id === chatId)!
              .users.filter((u) => u.id !== me)[0].name
          }
        />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a customer chat
        </div>
      )}
    </div>
  );
}
