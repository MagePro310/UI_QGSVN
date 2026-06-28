import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuanWatt | Nền tảng vận hành lưới điện hỗ trợ lượng tử",
  description:
    "QuanWatt kết nối dữ liệu hệ thống, quy trình kỹ thuật và thử nghiệm bộ giải lượng tử HHL/VQLS.",
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
    <html lang="vi" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
