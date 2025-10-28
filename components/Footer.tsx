import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white">IT.exe</h3>
            <p className="text-slate-400">By the community, for the community.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-4 text-center text-slate-500">
          &copy; {new Date().getFullYear()} IT.exe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};