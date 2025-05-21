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
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={imageUrl}
            alt={`Планер ${colorName}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Планер "{colorName}"
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <div 
              className="w-6 h-6 rounded-full border-2 border-gray-200" 
              style={{ backgroundColor: color }}
            />
            <span className="text-gray-600">{colorName}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-gray-900">{price}₴</span>
          </div>
          <button
            className={`w-full py-3 px-4 rounded-lg font-medium ${
              isAvailable
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={() => isAvailable && setShowOrderForm(true)}
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