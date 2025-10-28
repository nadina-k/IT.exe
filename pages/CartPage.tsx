import React from 'react';
import { useCart } from '../hooks/useCart';
import { Page } from '../types';

interface CartPageProps {
    setPage: (page: Page, context?: any) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ setPage }) => {
  const { cartItems, removeFromCart, totalPrice, itemCount } = useCart();

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center bg-surface p-12 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Your cart is empty.</h2>
          <p className="text-text-muted mt-2">Looks like you haven't added any parts yet.</p>
          <button
            onClick={() => setPage('browse')}
            className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-surface rounded-lg shadow-md">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-6 flex items-center space-x-6">
                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md"/>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-text-muted text-sm">{item.category}</p>
                      <p className="text-primary font-bold mt-2">LKR {item.price.toLocaleString()}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-surface p-8 rounded-lg shadow-md sticky top-28">
              <h2 className="text-2xl font-semibold border-b pb-4">Order Summary</h2>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>LKR {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>LKR {totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};