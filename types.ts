export interface User {
  id: number;
  name: string;
  isVerified: boolean;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  condition: 'New' | 'Like New' | 'Good' | 'Used';
  imageUrl: string;
  seller: User;
  datePosted: string;
  status: 'Available' | 'Sold';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export type Category = 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'PSU' | 'Case' | 'Cooling' | 'Other';

export type Condition = 'New' | 'Like New' | 'Good' | 'Used';

export type Page = 'home' | 'browse' | 'product' | 'sell' | 'cart' | 'account' | 'login' | 'register';