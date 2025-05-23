export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isPremium: boolean;
  accessibleMeditations: string[];
  accessiblePractices: string[];
  createdAt: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    region: string;
  };
}

export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number;
  audioUrl: string;
  imageUrl: string;
  category: string;
  variant: 'orange' | 'blue' | 'purple' | 'green' | 'red' | 'yellow';
  isPremium: boolean;
}

export interface Practice {
  id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  imageUrl: string;
  category: string;
  type: 'text' | 'video' | 'audio';
  isPremium: boolean;
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