// app/layout.tsx (or wherever your layout file is)

"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/auth", "/product-management"];
  const shouldShowLayout = !noLayoutRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="m-0 p-0 h-full">
        <div className="min-h-screen flex flex-col">
          {shouldShowLayout && <Header />}

          <motion.main
            className={`flex-1 ${
              shouldShowLayout ? "bg-[#f7fafc]" : "flex justify-center items-center"
            }`}
            initial={{ opacity: 0 }}       // Fade in effect when the page is loaded
            animate={{ opacity: 1 }}       // Animate to full opacity
            exit={{ opacity: 0 }}          // Fade out effect when the page is exited
            transition={{ duration: 0.5 }} // Transition duration for the animation
            key={pathname}                 // Trigger animation on route change
          >
            {children}
          </motion.main>

          {shouldShowLayout && <Footer />}
        </div>
      </body>
    </html>
  );
}
