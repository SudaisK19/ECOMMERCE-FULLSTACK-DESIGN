"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Settings, Info } from "lucide-react";

export default function CustomerSidebar() {
  const router = useRouter();

  return (
    <aside className="w-16 bg-blue-50 p-4 flex flex-col items-center">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 hover:text-blue-800"
        aria-label="Go back"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Nav icons */}
      <nav className="flex flex-col items-center space-y-4">
        {/* Profile */}
        <button
          onClick={() => router.push("/profile")}
          aria-label="Profile"
        >
          <Image
            src="/images/icons/profile.png"
            alt="Profile"
            width={24}
            height={24}
          />
        </button>

        {/* Settings */}
        <button
          onClick={() => router.push("/settings")}
          aria-label="Settings"
        >
          <Settings size={24} />
        </button>

        {/* Help (info) */}
        <button
          onClick={() => router.push("/help")}
          aria-label="Help"
        >
          <Info size={24} />
        </button>
      </nav>
    </aside>
  );
}
