import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LineContactFloating from "@/components/LineContactFloating";

export const metadata: Metadata = {
  title: "TechRent - แพลตฟอร์มเช่าอุปกรณ์ IT ครบวงจร",
  description: "ระบบบริหารและเช่าอุปกรณ์ไอทีระดับมืออาชีพ โน้ตบุ๊ก จอคอมพิวเตอร์ กล้อง การ์ดจอ พร้อมระบบติดตาม Serial Number และ Overlap Prevention",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <LineContactFloating />
      </body>
    </html>
  );
}
