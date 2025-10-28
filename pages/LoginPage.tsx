import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { Page } from '../types';

interface LoginPageProps {
  setPage: (page: Page) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setPage }) => {
  const [email, setEmail] = useState('demo@it.exe'); // Pre-fill for demo
  const [password, setPassword] = useState('password'); // Pre-fill for demo
  const [error, setError] = useState('');
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    const success = login(email, password);
    if (success) {
      setPage('home');
    } else {
      // The toast from useUser context will handle the error message
    }
  };

  const inputStyles = "block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg bg-slate-50 placeholder-slate-400 text-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition";

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-text">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-danger text-center text-sm">{error}</p>}
          
          <div>
            <label htmlFor="email-address" className="block text-sm font-medium text-text mb-1">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={inputStyles}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password-login" className="block text-sm font-medium text-text mb-1">Password</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    id="password-login"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={inputStyles}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-105"
            >
              Sign in
            </button>
          </div>
          <div className="text-sm text-center">
            <button onClick={() => setPage('register')} type="button" className="font-medium text-primary hover:text-blue-500">
              Don't have an account? Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};