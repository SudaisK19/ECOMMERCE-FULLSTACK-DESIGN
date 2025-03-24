"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ClientLayoutWrapperProps {
  children: ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/auth", "/product-management"];
  const shouldShowLayout = !noLayoutRoutes.includes(pathname);
  const mainClassName = shouldShowLayout ? "page-content with-bg" : "page-content";

  return (
    <div className="page-wrapper">
      {shouldShowLayout && <Header />}
      <main className={mainClassName}>{children}</main>
      {shouldShowLayout && <Footer />}
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

        .page-content {
          flex: 1;
        }

        .with-bg {
          background-color: #f3f4f6;
        }

        .page-content:not(.with-bg) {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
