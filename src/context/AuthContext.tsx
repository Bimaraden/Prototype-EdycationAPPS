import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

const VALID_ACCESS_CODES = [
  'EDU-7K9D-2X3F', 'EDU-Z4LQ-8W1N', 'EDU-B8VY-0R6M', 'EDU-Q2ME-4L9J',
  'EDU-X7PW-1T6A', 'EDU-C5RN-9Z2Y', 'EDU-K3VG-6F8B', 'EDU-W9AT-7Q0E',
  'EDU-M2LC-3D5K', 'EDU-R1YN-5P4X', 'EDU-T0XB-9K7W', 'EDU-H3QF-2V6J',
  'EDU-L8DZ-1R9M', 'EDU-V6NW-0Y3L', 'EDU-G5MC-8Z7P', 'EDU-A2VX-6L9T',
  'EDU-Y0PR-5K1Q', 'EDU-J3TL-9D2B', 'EDU-N9WF-1X6A', 'EDU-S7EK-4M8V'
];

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, username: string, password: string, accessCode: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface UsedAccessCode {
  code: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const isAuthenticated = !!currentUser;

  const getUsedAccessCodes = (): UsedAccessCode[] => {
    const usedCodes = localStorage.getItem('usedAccessCodes');
    return usedCodes ? JSON.parse(usedCodes) : [];
  };

  const saveUsedAccessCode = (email: string, accessCode: string) => {
    const usedCodes = getUsedAccessCodes();
    usedCodes.push({ code: accessCode, email });
    localStorage.setItem('usedAccessCodes', JSON.stringify(usedCodes));
  };

  const isAccessCodeValid = (accessCode: string): boolean => {
    return VALID_ACCESS_CODES.includes(accessCode.toUpperCase());
  };

  const isAccessCodeUsedByDifferentEmail = (accessCode: string, email: string): boolean => {
    const usedCodes = getUsedAccessCodes();
    const existingCode = usedCodes.find(entry => entry.code.toUpperCase() === accessCode.toUpperCase());
    return existingCode ? existingCode.email !== email : false;
  };

  const login = async (email: string, username: string, password: string, accessCode: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!isAccessCodeValid(accessCode)) {
        return {
          success: false,
          error: 'Invalid access code. Please check your access code and try again.'
        };
      }

      if (isAccessCodeUsedByDifferentEmail(accessCode, email)) {
        return {
          success: false,
          error: 'This access code is already associated with a different email address.'
        };
      }

      saveUsedAccessCode(email, accessCode);
      
      const userData: User = {
        id: 'user-' + Date.now(),
        username,
        email,
        accessCode,
        role: 'user'
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setCurrentUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred during login. Please try again.'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};