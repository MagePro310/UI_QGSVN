import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuanWatt | Quantum Simulation for Power Grids",
  description:
    "QuanWatt helps utility and power-system R&D teams assess, simulate and benchmark HHL and VQLS workloads before deployment.",
  icons: {
    icon: "/images/quanwatt-logo.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    // Browser extensions and injected scripts can add classes such as `mdl-js`
    // before React hydrates the document root.
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
