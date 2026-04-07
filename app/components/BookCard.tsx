"use client";

import { useState } from "react";
import Image from "next/image"; // Menggunakan Image Next.js untuk optimasi
import { ShoppingCart, Star, Heart, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  discount?: number;
  isBestseller?: boolean;
}

export default function BookCard({ 
  title, 
  author, 
  price, 
  rating, 
  image, 
  category,
  discount,
  isBestseller 
}: BookCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const discountedPrice = discount ? price - (price * discount / 100) : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }} // Lebih baik untuk list (animasi saat scroll)
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 group relative border border-slate-100"
    >
      {/* Badges - Floating Style */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <span className="bg-indigo-600/90 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
          {category}
        </span>
        {isBestseller && (
          <span className="bg-amber-400 text-amber-950 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" /> Bestseller
          </span>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className={`p-2.5 rounded-xl shadow-xl backdrop-blur-md transition-colors ${
            isLiked ? "bg-red-500 text-white" : "bg-white/90 text-slate-600 hover:text-red-500"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2.5 bg-white/90 backdrop-blur-md rounded-xl shadow-xl text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <Eye className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Image Container */}
      <div className="relative h-80 w-full bg-slate-100 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill // Mengisi container h-80
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          priority={isBestseller} // Loading prioritas jika bestseller
        />
        {/* Overlay subtle */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        
        {/* Discount Tag */}
        {discount && (
          <div className="absolute bottom-4 left-4 bg-red-500 text-white font-bold px-2 py-1 rounded-md text-sm animate-bounce">
            {discount}% OFF
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="mb-1">
          <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-500 font-medium">{author}</p>
        </div>
        
        <div className="flex items-center gap-1.5 mt-3 mb-5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-400">({rating}.0)</span>
        </div>
        
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {discount && (
              <span className="text-xs text-slate-400 line-through font-medium">
                Rp {price.toLocaleString('id-ID')}
              </span>
            )}
            <span className="text-xl font-black text-slate-900 tracking-tight">
              Rp {discountedPrice.toLocaleString('id-ID')}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Beli</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}