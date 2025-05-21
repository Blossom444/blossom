export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    region: string;
  };
}

export interface Order {
  id: string;
  userId: string;
  products: {
    type: 'planner';
    color: string;
    quantity: number;
    price: number;
  }[];
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  trackingNumber?: string;
  totalAmount: number;
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    region: string;
  };
  contactInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  region: string;
  plannerColor: string;
  quantity: number;
} 