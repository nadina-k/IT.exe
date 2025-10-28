import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { Page } from '../types';

interface RegisterPageProps {
  setPage: (page: Page) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ setPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }
    setError('');
    const success = register(name, email, password);
    if (success) {
      setPage('home');
    } else {
      // Error is handled by toast from context
    }
  };

  const inputStyles = "block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg bg-slate-50 placeholder-slate-400 text-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition";

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-danger text-center text-sm">{error}</p>}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">Username</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>
                <input id="name" name="name" type="text" required className={inputStyles} placeholder="Your Username" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          
          <div>
            <label htmlFor="email-register" className="block text-sm font-medium text-text mb-1">Email address</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                </div>
                <input id="email-register" name="email" type="email" autoComplete="email" required className={inputStyles} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          
          <div>
            <label htmlFor="password-register" className="block text-sm font-medium text-text mb-1">Password</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                </div>
                <input id="password-register" name="password" type="password" autoComplete="new-password" required className={inputStyles} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-105">
              Sign up
            </button>
          </div>
          
          <div className="text-sm text-center">
            <button onClick={() => setPage('login')} type="button" className="font-medium text-primary hover:text-blue-500">
              Already have an account? Sign in
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};