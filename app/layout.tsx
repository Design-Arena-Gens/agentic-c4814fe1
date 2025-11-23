import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "White T-Shirt Promo - Summer Aesthetic",
  description: "Casual white t-shirt promotional video with minimalist elegant style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
