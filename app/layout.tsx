import type { Metadata } from "next";
import { Inter } from "next/font/google";

/** * PERBAIKAN IMPORT CSS:
 * Menggunakan path relatif karena globals.css ada di app/styles/globals.css
 * (atau sesuaikan jika kamu memindahkannya ke app/globals.css)
 */
import "@/app/styles/globals.css";

/**
 * PERBAIKAN IMPORT NAVBAR:
 * Folder components berada di dalam folder app.
 */
import Navbar from "./components/Navbar";

// Konfigurasi font Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
});

export const metadata: Metadata = {
  title: "BookStore | Temukan Buku Favoritmu",
  description: "Platform jual beli buku modern dengan pengalaman AI.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-indigo-100 selection:text-indigo-900`}
      >
        {/* Navbar diletakkan di luar <main> agar tetap konsisten di semua halaman.
          Pastikan di dalam Navbar.tsx sudah menggunakan 'sticky' atau 'fixed' 
          jika ingin melayang saat di-scroll.
        */}
        <Navbar />
        
        {/* Main container menggunakan min-h-screen agar layout tetap penuh 
          meskipun konten halaman sedang kosong atau sedikit.
        */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer bisa ditambahkan di sini nantinya agar muncul secara otomatis
          di bawah setiap halaman (Beranda, Login, Register, dll).
        */}
      </body>
    </html>
  );
}