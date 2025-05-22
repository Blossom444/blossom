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

  const handleOrderClick = () => {
    if (isAvailable) {
      setShowOrderForm(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-[400px]">
          <Image
            src={imageUrl}
            alt={`Планер ${colorName}`}
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            Планер {colorName}
          </h3>
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-6 h-6 rounded-full border-2 border-gray-200" 
              style={{ backgroundColor: color }}
            />
            <span className="text-lg font-bold">{price} грн</span>
          </div>
          <button
            className={`w-full px-4 py-2 rounded-lg text-base font-medium transition-all duration-300
              ${isAvailable 
                ? 'bg-white/20 backdrop-blur-sm text-primary border-2 border-primary hover:bg-primary hover:text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-300'
              }`}
            onClick={handleOrderClick}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Замовити' : 'Немає в наявності'}
          </button>
        </div>
      </div>

      {showOrderForm && (
        <OrderForm
          productName={`Планер "${colorName}"`}
          price={price}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </>
  );
} 