"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/login", "/signup", "/product-management"];
  const shouldShowLayout = !noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="m-0 p-0 h-full">
        <div className="min-h-screen flex flex-col">
          {shouldShowLayout && <Header />}

          <main
            className={`flex-1 ${
              shouldShowLayout ? "bg-[#f7fafc]" : "flex justify-center items-center"
            }`}
          >
            {children}
          </main>

          {shouldShowLayout && <Footer />}
        </div>
      </body>
    </html>
  );
}
