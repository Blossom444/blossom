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

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-[400px]">
          <Image
            src={imageUrl}
            alt={`Планер ${colorName}`}
            fill
            className="object-contain"
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
            className="w-full bg-white/20 backdrop-blur-sm text-primary border-2 border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-medium"
            onClick={() => isAvailable && setShowOrderForm(true)}
            disabled={!isAvailable}
          >
            Замовити
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