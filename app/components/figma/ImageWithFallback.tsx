"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback({ src, alt, className, ...rest }: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  // Update imgSrc jika prop src berubah (penting untuk aplikasi dinamis)
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className ?? ''}`}>
      <Image
        {...rest}
        src={imgSrc}
        alt={alt || "Image"}
        className={`object-cover transition-opacity duration-300 ${imgSrc === ERROR_IMG_SRC ? 'opacity-50 scale-50' : 'opacity-100'}`}
        // Next.js onError handler
        onError={() => {
          setImgSrc(ERROR_IMG_SRC);
        }}
        // Jika menggunakan domain eksternal (seperti Unsplash di Home.tsx Anda), 
        // pastikan sudah daftar di next.config.ts
      />
    </div>
  );
}