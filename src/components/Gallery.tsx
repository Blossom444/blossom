'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Галерея зображень */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>

      {/* Лайтбокс */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl aspect-[4/3]">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              fill
              className="object-contain"
              sizes="(max-width: 1536px) 100vw, 1536px"
              priority
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            ×
          </button>
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1);
                }}
              >
                ‹
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0);
                }}
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
} 