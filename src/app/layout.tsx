"use client";

import { usePathname } from "next/navigation";
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

  // If it's a layout route, apply the gray background
  const mainClassName = shouldShowLayout ? "page-content with-bg" : "page-content";

  return (
    <html lang="en">
      <body>
        <div className="page-wrapper">
          {shouldShowLayout && <Header />}

          <main className={mainClassName}>{children}</main>

          {shouldShowLayout && <Footer />}
        </div>

        <style jsx global>{`
          html,
          body {
            margin: 0;
            padding: 0;
            height: 100%;
          }

          .page-wrapper {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          /* By default, page-content takes remaining space */
          .page-content {
            flex: 1;
          }

          /* Only add the gray background if .with-bg is applied */
          .with-bg {
            background-color: #f3f4f6;
          }

          /* Center the content (Auth card) only if NOT using .with-bg */
          .page-content:not(.with-bg) {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </body>
    </html>
  );
}