'use client';

import { useState } from 'react';
import Image from 'next/image';
import OrderForm from './OrderForm';

interface PlannerCardProps {
  color: string;
  colorName: string;
  imageUrl: string;
  isAvailable: boolean;
  price: number;
}

export default function PlannerCard({ color, colorName, imageUrl, isAvailable, price }: PlannerCardProps) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOrderClick = () => {
    if (isAvailable) {
      setShowOrderForm(true);
    }
  };

  return (
    <>
      <div 
        className="bg-[#F5F5DC]/20 backdrop-blur-md rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-[#F5F5DC]/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-40 sm:h-48 md:h-64 bg-black/10">
          <Image
            src={imageUrl}
            alt={`Комплект BLOSSOM ${colorName}`}
            fill
            className="object-contain p-2"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
            priority
          />
        </div>
        
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#F5F5DC] drop-shadow-md">
              Комплект BLOSSOM {colorName}
            </h3>
            <div 
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[#F5F5DC]/50" 
              style={{ backgroundColor: color }}
            />
          </div>
          <p className="text-xs sm:text-sm md:text-base text-[#F5F5DC]/90 mb-2 sm:mb-3 md:mb-4">{price} грн</p>
          <button 
            className={`w-full py-1.5 sm:py-2 px-3 sm:px-4 rounded-md transition-colors duration-300 text-xs sm:text-sm md:text-base ${
              isAvailable 
                ? 'bg-amber-500/80 hover:bg-amber-600 text-white' 
                : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
            }`}
            disabled={!isAvailable}
            onClick={handleOrderClick}
          >
            {isAvailable ? 'Купити' : 'Немає в наявності'}
          </button>
        </div>
      </div>

      {showOrderForm && (
        <OrderForm
          productName={`Комплект BLOSSOM "${colorName}"`}
          price={price}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </>
  );
} 