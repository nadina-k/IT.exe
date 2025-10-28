import React, { useState, useMemo } from 'react';
import { Page, Category, Condition } from '../types';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, CONDITIONS } from '../constants';
import { useProducts } from '../hooks/useProducts';

interface BrowsePageProps {
  setPage: (page: Page, context?: any) => void;
}

export const BrowsePage: React.FC<BrowsePageProps> = ({ setPage }) => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedCondition, setSelectedCondition] = useState<Condition | 'all'>('all');
  const [priceRange, setPriceRange] = useState<number>(200000);
  const [sortBy, setSortBy] = useState<'date_desc' | 'price_asc' | 'price_desc'>('date_desc');
  const [showSold, setShowSold] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products
      .filter(p => showSold ? true : p.status === 'Available')
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
      .filter(p => selectedCondition === 'all' || p.condition === selectedCondition)
      .filter(p => p.price <= priceRange);

    switch (sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'date_desc':
      default:
        filtered.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
        break;
    }
    return filtered;
  }, [products, searchTerm, selectedCategory, selectedCondition, priceRange, sortBy, showSold]);

  const inputStyles = "mt-1 block w-full bg-slate-50 border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 transition";

  return (
    <div className="container mx-auto px-6 py-8 animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-center">Browse All Parts</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-1/4 bg-surface p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-semibold mb-6">Filters</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-text">Search</label>
              <input type="text" id="search" placeholder="e.g., RTX 3080" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={inputStyles}/>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text">Category</label>
              <select id="category" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value as Category | 'all')} className={inputStyles}>
                <option value="all">All Categories</option>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-text">Condition</label>
              <select id="condition" value={selectedCondition} onChange={e => setSelectedCondition(e.target.value as Condition | 'all')} className={inputStyles}>
                <option value="all">All Conditions</option>
                {CONDITIONS.map(con => <option key={con} value={con}>{con}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-text">Max Price: LKR {priceRange.toLocaleString()}</label>
              <input type="range" id="price" min="0" max="200000" step="1000" value={priceRange} onChange={e => setPriceRange(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2" />
            </div>
            <div>
              <div className="flex items-center">
                <input id="show-sold" name="show-sold" type="checkbox" checked={showSold} onChange={e => setShowSold(e.target.checked)} className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"/>
                <label htmlFor="show-sold" className="ml-2 block text-sm text-text">Include Sold Items</label>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-text-muted">{filteredAndSortedProducts.length} results found</p>
            <div>
              <label htmlFor="sort" className="text-sm font-medium text-text mr-2">Sort by:</label>
              <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value as any)} className={`${inputStyles} p-2`}>
                <option value="date_desc">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} setPage={setPage} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface rounded-lg">
                <h3 className="text-2xl font-semibold">No Products Found</h3>
                <p className="text-text-muted mt-2">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};