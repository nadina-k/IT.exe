import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { DEMO_PRODUCTS } from '../constants';
import { useUser } from '../hooks/useUser';
import { useToast } from '../hooks/useToast';

interface ProductContextType {
  products: Product[];
  addProduct: (productData: Omit<Product, 'id' | 'datePosted' | 'seller' | 'status'>) => boolean;
  updateProduct: (updatedProduct: Product) => void;
  getUserProducts: (userId: number) => Product[];
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem('products');
      return savedProducts ? JSON.parse(savedProducts) : DEMO_PRODUCTS;
    } catch (error) {
      console.error('Error reading products from localStorage', error);
      return DEMO_PRODUCTS;
    }
  });

  const { currentUser } = useUser();
  const addToast = useToast();

  useEffect(() => {
    try {
      localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error('Error writing products to localStorage', error);
    }
  }, [products]);

  const addProduct = (newProductData: Omit<Product, 'id' | 'datePosted' | 'seller' | 'status'>): boolean => {
    if (!currentUser) {
      addToast("You must be logged in to sell an item.", 'error');
      return false;
    }
    const newProduct: Product = {
      ...newProductData,
      id: Math.max(...products.map(p => p.id), 0) + 1,
      datePosted: new Date().toISOString().split('T')[0],
      seller: currentUser,
      status: 'Available',
    };
    setProducts(prev => [newProduct, ...prev]);
    addToast("Your product has been listed successfully!", 'success');
    return true;
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    addToast("Product status updated.", 'info');
  };
  
  const getUserProducts = (userId: number) => {
    return products.filter(p => p.seller.id === userId);
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, getUserProducts }}>
      {children}
    </ProductContext.Provider>
  );
};