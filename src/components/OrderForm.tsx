'use client';

import { useState } from 'react';
import { OrderFormData } from '@/types';

interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  selectedColor?: string;
}

export default function OrderForm({ onSubmit, selectedColor }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    region: '',
    plannerColor: selectedColor || 'Рожевий',
    quantity: 1
  });

  const [errors, setErrors] = useState<Partial<OrderFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я обов'язкове";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обов'язковий";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обов'язковий";
    } else if (!/^\+?\d{10,12}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Невірний формат телефону";
    }

    if (!formData.street.trim()) {
      newErrors.street = "Адреса обов'язкова";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Місто обов'язкове";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Поштовий індекс обов'язковий";
    }

    if (!formData.region.trim()) {
      newErrors.region = "Область обов'язкова";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof OrderFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Інформація для замовлення</h3>
        
        <div className="space-y-4">
          {/* Контактна інформація */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Ім'я та прізвище
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+380"
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.phone ? 'border-red-500' : ''
              }`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* Адреса доставки */}
          <div className="pt-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Адреса доставки</h4>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Вулиця та номер будинку
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.street ? 'border-red-500' : ''
                  }`}
                />
                {errors.street && <p className="mt-1 text-sm text-red-600">{errors.street}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Місто
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.city ? 'border-red-500' : ''
                  }`}
                />
                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  Поштовий індекс
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.postalCode ? 'border-red-500' : ''
                  }`}
                />
                {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
              </div>

              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                  Область
                </label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                    errors.region ? 'border-red-500' : ''
                  }`}
                />
                {errors.region && <p className="mt-1 text-sm text-red-600">{errors.region}</p>}
              </div>
            </div>
          </div>

          {/* Деталі замовлення */}
          <div className="pt-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Деталі замовлення</h4>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="plannerColor" className="block text-sm font-medium text-gray-700">
                  Колір планера
                </label>
                <select
                  id="plannerColor"
                  name="plannerColor"
                  value={formData.plannerColor}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="Рожевий">Рожевий</option>
                  <option value="Коричневий">Коричневий</option>
                  <option value="Бежевий">Бежевий</option>
                  <option value="Сірий">Сірий</option>
                </select>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Кількість
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="10"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Оформити замовлення
          </button>
        </div>
      </div>
    </form>
  );
} 