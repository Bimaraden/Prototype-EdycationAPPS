import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Users, LogIn } from 'lucide-react';

interface AnnouncementScreenProps {
  onFinish: () => void;
}

export const AnnouncementScreen = ({ onFinish }: AnnouncementScreenProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const announcements = [
    {
      icon: <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400" />,
      title: "Materi Lengkap",
      description: "Akses semua konten pembelajaran dengan mudah"
    },
    {
      icon: <GraduationCap className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400" />,
      title: "Sesuai Kurikulum",
      description: "Materi sesuai dengan kurikulum pendidikan terkini"
    },
    {
      icon: <Users className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400" />,
      title: "Akses Terbatas",
      description: "Dapatkan kode akses khusus untuk memulai"
    }
  ];

  const handleNext = () => {
    if (currentPage < announcements.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-blue-950 to-blue-900 flex items-center justify-center p-4">
      <div 
        className={`w-full max-w-md aspect-[9/16] bg-black/30 backdrop-blur-lg rounded-3xl relative overflow-hidden transform transition-all duration-500 border border-blue-500/20 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <button
          onClick={handleNext}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 text-blue-400 text-xs sm:text-sm font-medium z-10 hover:text-blue-300 transition-colors px-3 py-1.5 bg-blue-900/20 rounded-full border border-blue-500/30 hover:border-blue-500/50"
        >
          {currentPage === announcements.length - 1 ? 'Mulai' : 'Lanjut'}
        </button>

        <div className="h-full flex flex-col items-center justify-center px-6 sm:px-8 text-center">
          <div className="mb-6 sm:mb-8">
            {announcements[currentPage].icon}
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-3 sm:mb-4">
            {announcements[currentPage].title}
          </h2>
          
          <p className="text-sm sm:text-base text-blue-100/90">
            {announcements[currentPage].description}
          </p>
        </div>

        <div className="absolute bottom-8 sm:bottom-12 inset-x-0 px-6 sm:px-8">
          <div className="flex justify-center space-x-2 mb-4">
            {announcements.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentPage 
                    ? 'w-6 sm:w-8 bg-blue-500' 
                    : 'w-1.5 sm:w-2 bg-blue-500/30'
                }`}
              />
            ))}
          </div>

          {currentPage === announcements.length - 1 && (
            <button
              onClick={onFinish}
              className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center mx-auto transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black border border-blue-400/50"
              aria-label="Login"
            >
              <LogIn className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};