import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { CartItem, Product } from '../types';
import { useToast } from '../hooks/useToast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const addToast = useToast();

  const addToCart = useCallback((product: Product) => {
    if (product.status === 'Sold') {
      addToast('This item has already been sold.', 'error');
      return;
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        addToast('This unique item is already in your cart.', 'info');
        return prevItems;
      }
      addToast(`${product.name} added to cart!`, 'success');
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, [addToast]);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    addToast('Item removed from cart.', 'info');
  }, [addToast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, itemCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};