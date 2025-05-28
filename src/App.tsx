import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { SplashScreen } from './components/SplashScreen';
import { AnnouncementScreen } from './components/AnnouncementScreen';
import HomePage from './pages/HomePage';
import QuestionsPage from './pages/QuestionsPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import MaterialPage from './pages/MaterialPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const { isAuthenticated } = useAuth();

  if (showSplash) {
    return <SplashScreen onFinish={() => {
      setShowSplash(false);
      setShowAnnouncement(!isAuthenticated);
    }} />;
  }

  if (showAnnouncement && !isAuthenticated) {
    return <AnnouncementScreen onFinish={() => setShowAnnouncement(false)} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/material/:id" element={
            <ProtectedRoute>
              <MaterialPage />
            </ProtectedRoute>
          } />
          <Route path="/questions" element={
            <ProtectedRoute>
              <QuestionsPage />
            </ProtectedRoute>
          } />
          <Route path="/account" element={
            <ProtectedRoute>
              <AccountSettingsPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}