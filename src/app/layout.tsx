"use client"; 


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        <main style={{ padding: "20px", minHeight: "80vh" }}>
          {children}
        </main>
        
       
      </body>
    </html>
  );
}
