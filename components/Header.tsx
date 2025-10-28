import React from 'react';
import { useCart } from '../hooks/useCart';
import { Page } from '../types';
import { useUser } from '../hooks/useUser';

interface HeaderProps {
    setPage: (page: Page, context?: any) => void;
}

const NavLink: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button onClick={onClick} className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium">
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ setPage }) => {
  const { itemCount } = useCart();
  const { currentUser, logout } = useUser();

  return (
    <header className="bg-surface/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all duration-300">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setPage('home')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h9.75a2.25 2.25 0 012.25 2.25z" />
          </svg>
          <span className="text-2xl font-bold text-text">IT.exe</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <NavLink onClick={() => setPage('home')}>Home</NavLink>
          <NavLink onClick={() => setPage('browse')}>Browse</NavLink>
          <NavLink onClick={() => setPage('sell')}>Sell Your Gear</NavLink>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => setPage('cart')} className="relative text-gray-600 hover:text-primary transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {itemCount}
              </span>
            )}
          </button>
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <NavLink onClick={() => setPage('account')}>
                Hi, {currentUser.name}
              </NavLink>
              <button onClick={logout} className="text-sm bg-gray-200 text-text font-semibold py-2 px-4 rounded-full hover:bg-gray-300 transition-all duration-300">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => setPage('login')} className="bg-primary text-white font-bold py-2 px-5 rounded-full hover:bg-blue-600 transition-all duration-300 shadow">
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};