import HomeContent from "./components/pages/Home";
import { Metadata } from "next";

/**
 * Metadata SEO: Next.js akan merender ini di sisi server (SSR).
 */
export const metadata: Metadata = {
  title: "Beranda | BookStore",
  description: "Jelajahi ribuan koleksi buku terbaru dan terbaik di BookStore secara interaktif.",
  openGraph: {
    title: "BookStore - Dunia Literasi dalam Genggaman",
    description: "Platform pencarian buku cerdas dengan antarmuka modern.",
    type: "website",
    images: ["/og-image.png"], // Opsional: Tambahkan path gambar OG Anda
  },
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* WRAPPER KONTEN UTAMA
          - Menggunakan flex-1 agar footer tetap di bawah.
          - pt-20 sampai pt-24 disesuaikan dengan tinggi Navbar Anda.
      */}
      <div className="flex-1 w-full pt-20 sm:pt-24">
        <HomeContent />
      </div>

      {/* SECTION: NEWSLETTER / CTA
          Menggunakan variabel warna kustom dari theme.css (muted, border, primary).
      */}
      <section className="relative py-28 px-6 overflow-hidden border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Siap Menjelajahi Dunia Literasi?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Dapatkan kurasi buku terbaik dan promo eksklusif langsung ke email Anda setiap minggu.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <input 
              type="email" 
              placeholder="Masukkan email Anda..." 
              className="w-full sm:w-96 px-6 py-4 rounded-2xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
            />
            <button className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-xl shadow-primary/10 hover:opacity-90 transition-all active:scale-95">
              Langganan Gratis
            </button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground opacity-60">
            Kami menghargai privasi Anda. Berhenti berlangganan kapan saja.
          </p>
        </div>

        {/* Ornamen dekoratif Linear Style (Glow Effect) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      </section>

    </main>
  );
}