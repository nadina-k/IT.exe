import React from 'react';
import { Product } from '../types';
import { useUser } from '../hooks/useUser';
import { useProducts } from '../hooks/useProducts';

export const AccountPage: React.FC = () => {
    const { currentUser } = useUser();
    const { getUserProducts, updateProduct } = useProducts();

    if (!currentUser) {
        return null; // This case is handled by the router in App.tsx
    }
    
    const userProducts = getUserProducts(currentUser.id);

    const handleMarkAsSold = (product: Product) => {
        updateProduct({ ...product, status: 'Sold' });
    };

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in-up max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">My Account</h1>
        <div className="bg-surface p-8 rounded-lg shadow-lg">
            <div className="border-b pb-4 mb-6">
            <h2 className="text-2xl font-semibold">Welcome, {currentUser?.name}</h2>
            {currentUser?.isVerified && <p className="text-sm text-success font-medium">You are a verified seller.</p>}
            </div>
            
            <h3 className="text-xl font-semibold mb-4">My Listings</h3>
            {userProducts.length > 0 ? (
            <div className="space-y-4">
                {userProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-md transition-shadow hover:shadow-md">
                    <div className="flex items-center gap-4">
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-danger'}`}>{product.status}</span>
                    </div>
                    </div>
                    {product.status === 'Available' && (
                    <button onClick={() => handleMarkAsSold(product)} className="bg-success text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-emerald-600 transition">
                        Mark as Sold
                    </button>
                    )}
                </div>
                ))}
            </div>
            ) : (
            <p className="text-text-muted">You have not listed any items yet.</p>
            )}
        </div>
        </div>
    );
};