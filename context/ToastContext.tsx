import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { ToastMessage } from '../types';
import { ToastContainer } from '../components/Toast';

interface ToastContextType {
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer messages={messages} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};