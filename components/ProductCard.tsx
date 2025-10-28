import React from 'react';
import { Product, Page } from '../types';

// FIX: Define props interface for ProductCard
interface ProductCardProps {
  product: Product;
  setPage: (page: Page, context?: any) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, setPage }) => {
  return (
    <div 
        onClick={() => setPage('product', { id: product.id })}
        className="relative bg-surface rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col group"
    >
      {product.status === 'Sold' && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
          <span className="text-white text-2xl font-bold transform -rotate-12 border-2 border-white px-4 py-2 rounded-md">SOLD</span>
        </div>
      )}
      <div className="overflow-hidden">
        <img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-text truncate">{product.name}</h3>
        <div className="flex items-center justify-between text-sm text-text-muted mt-1">
          <span>{product.category}</span>
          <div className="flex items-center">
            <span>{product.seller.name}</span>
            {product.seller.isVerified && (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-success" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
        <div className="mt-4 flex-grow">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                {product.condition}
            </span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-bold text-primary">LKR {product.price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};