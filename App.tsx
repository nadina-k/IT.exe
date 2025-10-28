import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SellPage } from './pages/SellPage';
import { CartPage } from './pages/CartPage';
import { AccountPage } from './pages/AccountPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { ProductProvider } from './context/ProductContext';
import { ToastProvider } from './context/ToastContext';
import { useUser } from './hooks/useUser';
import { Page } from './types';

const AppContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [pageContext, setPageContext] = useState<any>(null);
    const { currentUser } = useUser();

    const setPage = useCallback((page: Page, context: any = null) => {
        setCurrentPage(page);
        setPageContext(context);
        window.scrollTo(0, 0);
    }, []);

    const renderPage = () => {
        // Protected Routes: Redirect to login if not authenticated
        if (['sell', 'account'].includes(currentPage) && !currentUser) {
            return <LoginPage setPage={setPage} />;
        }
        // Guest-only Routes: Redirect to home if authenticated
        if (['login', 'register'].includes(currentPage) && currentUser) {
            // This prevents a logged-in user from seeing the login page.
            // We can show the home page instead.
            return <HomePage setPage={setPage} />;
        }

        switch (currentPage) {
            case 'home':
                return <HomePage setPage={setPage} />;
            case 'browse':
                return <BrowsePage setPage={setPage} />;
            case 'product':
                return <ProductDetailPage productId={pageContext?.id} />;
            case 'sell':
                return <SellPage setPage={setPage} />;
            case 'cart':
                return <CartPage setPage={setPage} />;
            case 'account':
                 return <AccountPage />;
            case 'login':
                return <LoginPage setPage={setPage} />;
            case 'register':
                return <RegisterPage setPage={setPage} />;
            default:
                return <HomePage setPage={setPage} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header setPage={setPage} />
            <main className="flex-grow">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}

const App: React.FC = () => {
  return (
    <ToastProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </ToastProvider>
  );
};

export default App;