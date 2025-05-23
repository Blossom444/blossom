import { User } from '@/types';

export const initialUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@blossom.com',
    password: 'admin123',
    role: 'admin',
    isPremium: true,
    createdAt: new Date().toISOString(),
    accessibleMeditations: ['meditation-1', 'meditation-2', 'meditation-3', 'meditation-4'],
    accessiblePractices: []
  },
  {
    id: '2',
    name: 'Test User',
    email: 'test@blossom.com',
    password: 'test123',
    role: 'user',
    isPremium: false,
    createdAt: new Date().toISOString(),
    accessibleMeditations: ['meditation-1', 'meditation-2'],
    accessiblePractices: []
  },
]; 