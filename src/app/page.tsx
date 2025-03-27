"use client";

//import HeroSection from "@/components/Hero-section";

export default function Home() {
  return (
    <div className="page-inner bg-gray-100">
      <main className="page-content">
        {/* Centered container for all content */}
        <div className="container max-w-[1180px] w-full mx-auto px-4">
          {/* <HeroSection /> */}
          {/* Add other sections/components here below */}
        </div>
      </main>

      <style jsx>{`
        .page-inner {
          display: flex;
          flex-direction: column;
          flex: 1;
          height: 100%;
          background-color: #f3f4f6; /* gray-100 */
        }

        .page-content {
          flex: 1;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center; /* center horizontally */
          justify-content: flex-start;
        }
      `}</style>
    </div>
  );
}