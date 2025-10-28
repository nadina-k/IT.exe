import React from 'react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';

interface ProductDetailPageProps {
  productId: number;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { products } = useProducts();
  const product = products.find(p => p.id === productId);
  const { addToCart, cartItems } = useCart();

  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-3xl font-bold">Product not found!</h1>
      </div>
    );
  }
  
  const isInCart = cartItems.some(item => item.id === product.id);

  return (
    <div className="bg-surface animate-fade-in-up">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Gallery */}
          <div className="lg:w-1/2">
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover rounded-lg shadow-xl" />
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col">
            <span className="text-sm font-semibold text-primary uppercase">{product.category}</span>
            <h1 className="text-4xl font-bold mt-2">{product.name}</h1>
            <p className="text-3xl font-light text-text mt-4">LKR {product.price.toLocaleString()}</p>
            
            <div className="mt-6 border-t pt-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-text-muted leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-6 space-y-4">
                <div className="flex items-center">
                    <span className="font-semibold w-28">Condition:</span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{product.condition}</span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold w-28">Seller:</span>
                    <span className="text-text-muted flex items-center">{product.seller.name}
                      {product.seller.isVerified && (
                        <span className="ml-2 flex items-center text-sm font-semibold bg-green-100 text-success px-2 py-0.5 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified Seller
                        </span>
                      )}
                    </span>
                </div>
                <div className="flex items-center">
                    <span className="font-semibold w-28">Posted On:</span>
                    <span className="text-text-muted">{new Date(product.datePosted).toLocaleDateString()}</span>
                </div>
                 <div className="flex items-center">
                    <span className="font-semibold w-28">Status:</span>
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${product.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-danger'}`}>{product.status}</span>
                </div>
            </div>

            <div className="mt-auto pt-8">
              <button
                onClick={() => addToCart(product)}
                disabled={isInCart || product.status === 'Sold'}
                className={`w-full text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg ${
                    product.status === 'Sold'
                    ? 'bg-danger cursor-not-allowed'
                    : isInCart 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105'
                }`}
              >
                {product.status === 'Sold' ? 'Item is Sold' : isInCart ? 'Already in Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};