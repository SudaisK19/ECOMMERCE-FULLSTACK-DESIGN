// CustomerChatPage.tsx
"use client";
import { useEffect, useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import CustomerSidebar from "@/components/CustomerSidebar";

export default function CustomerChatPage() {
  const [chatId, setChatId]     = useState<string | null>(null);
  const [me, setMe]             = useState<string>("");
  const [adminName, setAdminName] = useState<string>("Seller");

  useEffect(() => {
    // fetch the admin’s name
    fetch("/api/admin/info", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setAdminName(data.admin.name))
      .catch(() => setAdminName("Seller"));

    if (chatId) return;
    setMe("67e4ce2a3a34023e8484d3bb");
    const token = localStorage.getItem("authToken");
    fetch(`${process.env.NEXT_PUBLIC_CHAT_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:  `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: "67e4ce2a3a34023e8484d3ba" }),
    })
      .then((r) => r.json())
      .then((chat) => setChatId(chat._id))
      .catch((err) => console.error("chat fetch failed:", err));
  }, [chatId]);

  return (
    <div className="flex h-screen">
      <CustomerSidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        {chatId ? (
          <ChatWindow
            chatId={chatId}
            userId={me}
            title={adminName}   // ← pass title
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Loading…
          </div>
        )}
      </div>
    </div>
  );
}
