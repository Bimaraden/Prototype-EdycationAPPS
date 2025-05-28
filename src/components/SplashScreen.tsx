import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center">
        <div className={`flex items-center justify-center gap-1 transform transition-all duration-700 ${
          showContent ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}>
          <img 
            src="/src/data/img/logo.png" 
            alt="Logo"
            className="w-55 h-55 md:w-60 md:h-60" // Mengubah ukuran logo
          />
        </div>
      </div>
    </div>
  );
};