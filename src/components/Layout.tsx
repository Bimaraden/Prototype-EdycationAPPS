import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { setupAntiScreenshot } from '../utils/securityUtils';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isQuizActive = location.pathname === '/questions' && location.search.includes('active=true');

  useEffect(() => {
    // Only apply anti-screenshot on non-login pages
    if (!isLoginPage) {
      setupAntiScreenshot();
    }
  }, [isLoginPage]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {!isLoginPage && !isQuizActive && <Navbar />}
      <main className={`container mx-auto px-4 ${isQuizActive ? '' : 'py-6'}`}>
        {children}
      </main>
    </div>
  );
};