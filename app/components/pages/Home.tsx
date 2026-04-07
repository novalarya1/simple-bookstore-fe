"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, TrendingUp, BookOpen, Users, 
  Sparkles, ChevronRight 
} from "lucide-react";

// Menggunakan Alias @/ sesuai tsconfig.json
import Navbar from "@/app/components/Navbar";
import BookCard from "@/app/components/BookCard";

const BOOKS = [
  {
    id: 1,
    title: "The Great Adventure",
    author: "John Smith",
    price: 125000,
    rating: 5,
    image: "https://images.unsplash.com/photo-1661936901394-a993c79303c7?q=80&w=1080",
    category: "Fiction",
    discount: 20,
    isBestseller: true
  },
  {
    id: 2,
    title: "Design System 101",
    author: "Jane Doe",
    price: 210000,
    rating: 4,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1080",
    category: "Science",
    discount: 10,
    isBestseller: false
  },
];

const CATEGORIES = ["Semua", "Fiction", "Mystery", "Science", "Fantasy", "Romance", "Thriller"];

const STATS = [
  { icon: BookOpen, label: "Buku Tersedia", value: "10.000+" },
  { icon: Users, label: "Pembaca Aktif", value: "50.000+" },
  { icon: TrendingUp, label: "Rating Rata-rata", value: "4.8/5" },
  { icon: Sparkles, label: "Buku Baru/Bulan", value: "200+" }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredBooks = useMemo(() => {
    return BOOKS.filter(book => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);
      
      const matchesCategory = selectedCategory === "Semua" || book.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero Section - Optimized for Tailwind v4 & Theme Variables */}
      <section className="relative bg-primary text-primary-foreground py-28 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold tracking-tight mb-8"
            >
              Jelajahi Dunia 
              <span className="block opacity-80">Lewat Jendela Buku</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-2xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed"
            >
              Platform terkurasi untuk literatur terbaik. 
              Dapatkan penawaran eksklusif setiap harinya.
            </motion.p>
          </div>
          
          {/* Enhanced Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative bg-background rounded-2xl shadow-2xl flex items-center p-2 border border-border/50">
              <Search className="ml-4 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul atau penulis..."
                className="w-full px-4 py-4 bg-transparent text-foreground focus:outline-none placeholder:text-muted-foreground"
              />
              <button className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold transition-all hover:scale-105 active:scale-95">
                Cari
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Bento Stats */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (0.1 * idx) }}
              className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all text-center group"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-4 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
              <p className="text-3xl font-bold text-foreground leading-tight">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-24">
        {/* Sticky-like Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-20">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === cat 
                ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-border pb-8">
          <div>
            <h2 className="text-4xl font-bold tracking-tight flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-indigo-500" />
              {selectedCategory === "Semua" ? "Koleksi Terpopuler" : `Genre: ${selectedCategory}`}
            </h2>
            <p className="text-muted-foreground mt-3 font-medium text-lg">
              Menampilkan {filteredBooks.length} pilihan terbaik untukmu.
            </p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
            Lihat Semua <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Optimized Books Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard {...book} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-muted/30 rounded-[2rem] border-2 border-dashed border-border"
          >
            <BookOpen className="w-20 h-20 mx-auto text-muted-foreground/30 mb-6" />
            <h3 className="text-2xl font-bold text-foreground">Buku Tidak Ditemukan</h3>
            <p className="text-muted-foreground mt-2 max-w-xs mx-auto">Coba gunakan kata kunci lain atau ubah filter kategori kamu.</p>
          </motion.div>
        )}
      </main>

      {/* Footer Minimalist */}
      <footer className="bg-primary text-primary-foreground/60 py-20 border-t border-border/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-white/5 pb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 text-primary-foreground font-bold text-3xl mb-8">
              <div className="bg-white p-1.5 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <span>BookStore</span>
            </div>
            <p className="max-w-md text-lg leading-relaxed">
              Membangun komunitas pembaca global melalui akses literatur berkualitas tinggi dengan pengalaman digital terbaik.
            </p>
          </div>
          <div>
            <h4 className="text-primary-foreground font-bold text-xl mb-8">Eksplorasi</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Semua Buku</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Kategori</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Bestseller</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-primary-foreground font-bold text-xl mb-8">Dukungan</h4>
            <p className="mb-4">Butuh bantuan?</p>
            <p className="text-primary-foreground font-medium text-lg">support@bookstore.id</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 text-sm flex flex-col md:flex-row justify-between items-center opacity-50">
          <p>© 2026 Noval Arya Wahyudhi. Built with passion and Next.js 16.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}