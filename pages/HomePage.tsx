import React from 'react';
import { Page } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';

interface HomePageProps {
  setPage: (page: Page, context?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { products } = useProducts();

  const latestProducts = [...products]
    .filter(p => p.status === 'Available')
    .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
    .slice(0, 4);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="bg-surface">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-text animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Find Your Perfect Part</h1>
          <p className="mt-4 text-lg md:text-xl text-text-muted max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            The #1 marketplace in Sri Lanka for used computer components. Buy from fellow enthusiasts and sell your old gear for cash.
          </p>
          <div className="mt-8 flex justify-center space-x-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => setPage('browse')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all transform hover:scale-105 duration-300"
            >
              Browse Parts
            </button>
            <button
              onClick={() => setPage('sell')}
              className="bg-slate-200 text-text font-bold py-3 px-8 rounded-full hover:bg-slate-300 transition-all transform hover:scale-105 duration-300"
            >
              Sell Your Gear
            </button>
          </div>
        </div>
      </div>

      {/* Latest Listings */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
              <ProductCard product={product} setPage={setPage} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
            <button onClick={() => setPage('browse')} className="text-primary font-semibold hover:underline">
                View All Products &rarr;
            </button>
        </div>
      </div>
    </div>
  );
};