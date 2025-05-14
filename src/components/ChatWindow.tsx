// components/ChatWindow.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import CryptoJS from "crypto-js";

interface HistoryMessage {
  _id: string;
  chat: string;
  sender: { _id: string; name: string; role: string };
  content: string;     // possibly encrypted blob
  createdAt: string;
}

interface LocalMessage {
  _id: string;
  senderId: string;
  content: string;     // decrypted plaintext
  timestamp: number;
}

interface Props {
  chatId: string;
  userId: string;
  title:  string;
}

export default function ChatWindow({ chatId, userId, title }: Props) {
  const [msgs, setMsgs] = useState<LocalMessage[]>([]);
  const [text, setText] = useState("");
  const socketRef = useRef<any>(null);

  // must match your .env.local:
  // NEXT_PUBLIC_MESSAGE_PASSPHRASE=YourSuperSecretPassphrase
  const PASSPHRASE = process.env.NEXT_PUBLIC_MESSAGE_PASSPHRASE!;
  if (!PASSPHRASE) {
    throw new Error("NEXT_PUBLIC_MESSAGE_PASSPHRASE is not set");
  }

  // decrypt with fallback for non-encrypted content
  function decrypt(cipher: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(cipher, PASSPHRASE);
      const plain = bytes.toString(CryptoJS.enc.Utf8);
      return plain || cipher;
    } catch {
      return cipher;
    }
  }

  // encrypt before sending
  function encrypt(plain: string): string {
    return CryptoJS.AES.encrypt(plain, PASSPHRASE).toString();
  }

  useEffect(() => {
    if (!chatId) return;

    const token = localStorage.getItem("authToken")!;

    // 1️⃣ load existing messages
    fetch(
      `${process.env.NEXT_PUBLIC_CHAT_URL}/api/messages?chatId=${chatId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`History fetch failed (${res.status})`);
        return res.json();
      })
      .then((history: HistoryMessage[]) => {
        const localHistory: LocalMessage[] = history.map((m) => ({
          _id:       m._id,
          senderId:  m.sender._id,
          content:   decrypt(m.content),
          timestamp: new Date(m.createdAt).getTime(),
        }));
        setMsgs(localHistory);
      })
      .catch(console.error);

    // 2️⃣ socket setup
    socketRef.current = io(process.env.NEXT_PUBLIC_CHAT_URL!, {
      auth: { token },
    });
    socketRef.current.emit("join_chat", chatId);

    socketRef.current.on("new_message", (raw: any) => {
      const incoming: LocalMessage = {
        _id:       raw._id,
        senderId:  raw.sender ?? raw.senderId,
        content:   decrypt(raw.content),
        timestamp: raw.timestamp ?? Date.now(),
      };
      setMsgs((ms) => [...ms, incoming]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [chatId]);

  const send = () => {
    if (!text.trim()) return;

    const plain = text.trim();
    const encrypted = encrypt(plain);
    const tempMsg: LocalMessage = {
      _id:       `temp-${Date.now()}`,
      senderId:  userId,
      content:   plain,
      timestamp: Date.now(),
    };

    // optimistically render
    setMsgs((ms) => [...ms, tempMsg]);
    setText("");

    // send encrypted to server
    socketRef.current.emit("send_message", {
      chatId,
      senderId:  userId,
      content:   encrypted,
      timestamp: tempMsg.timestamp,
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 h-16 bg-gradient-to-r from-blue-500 to-blue-300 text-black shadow">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-semibold">{title}</h1>
          <span className="flex items-center space-x-1 text-sm opacity-90">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Online</span>
          </span>
        </div>
      </header>

      {/* MESSAGES */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50 space-y-4">
        {msgs.map((m, i) => {
          const isMine = m.senderId === userId;
          return (
            <div
              key={m._id || i}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-xl shadow ${
                  isMine ? "bg-blue-200" : "bg-white"
                }`}
              >
                <p className="text-gray-800">{m.content}</p>
                <span className="block text-right text-xs text-gray-500 mt-1">
                  {new Date(m.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center space-x-3 shadow">
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <i className="fas fa-paperclip" />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <i className="fas fa-microphone" />
        </button>
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition"
        >
          <span className="mr-2">Send</span>
          <i className="fas fa-paper-plane" />
        </button>
      </div>
    </div>
  );
}
