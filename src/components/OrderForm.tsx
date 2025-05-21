'use client';

import { useState } from 'react';
import { OrderFormData } from '@/types';
import { sendOrderToTelegram } from '@/utils/telegram';

interface OrderFormProps {
  productName: string;
  price: number;
  onClose: () => void;
}

export default function OrderForm({ productName, price, onClose }: OrderFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    contactType: 'phone',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    contact: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      contact: '',
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ім'я обов'язкове";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Прізвище обов'язкове";
      isValid = false;
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Контактні дані обов'язкові";
      isValid = false;
    } else if (formData.contactType === 'phone') {
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(formData.contact)) {
        newErrors.contact = 'Невірний формат номера телефону';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const success = await sendOrderToTelegram({
        ...formData,
        productName,
        price,
      });

      if (success) {
        onClose();
      } else {
        setSubmitError('Помилка при відправці замовлення. Будь ласка, спробуйте пізніше.');
      }
    } catch (error) {
      setSubmitError('Щось пішло не так. Будь ласка, спробуйте пізніше.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Замовлення планера</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <p className="text-lg text-gray-700">Товар: {productName}</p>
          <p className="text-lg font-semibold text-gray-900">Ціна: {price}₴</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ім'я
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Прізвище
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Тип зв'язку
            </label>
            <select
              value={formData.contactType}
              onChange={(e) => setFormData({ ...formData, contactType: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isSubmitting}
            >
              <option value="phone">Телефон</option>
              <option value="telegram">Telegram</option>
              <option value="viber">Viber</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {formData.contactType === 'phone' ? 'Номер телефону' : 'Контактні дані'}
            </label>
            <input
              type={formData.contactType === 'phone' ? 'tel' : 'text'}
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder={
                formData.contactType === 'phone'
                  ? '+380XXXXXXXXX'
                  : `Ваш ${formData.contactType === 'telegram' ? 'Telegram' : 'Viber'}`
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              disabled={isSubmitting}
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
            )}
          </div>

          {submitError && (
            <p className="text-red-600 text-sm">{submitError}</p>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Відправка...' : 'Замовити'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 