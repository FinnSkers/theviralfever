import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopBuilder AI - Generate Your Online Store",
  description: "Create beautiful online stores with AI-powered website generation and inventory management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
