import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { withSecurityFeatures } from '../utils/securityUtils';
import { LogOut, Save, User, Mail, KeyRound, MessageCircle } from 'lucide-react';

const AccountSettingsPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [saveMessage, setSaveMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  
  const handleSave = () => {
    setSaveMessage({
      text: 'Your profile information has been saved.',
      type: 'success'
    });
    
    setTimeout(() => {
      setSaveMessage(null);
    }, 3000);
  };
  
  const handleLogout = () => {
    logout();
  };

  const handleContactDeveloper = () => {
    window.open('https://wa.me/+6281234567890', '_blank');
  };
  
  if (!currentUser) return null;
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-custom-black rounded-xl overflow-hidden shadow-lg border border-gray-700">
        <div className="bg-gradient-to-r from-custom-green/90 to-custom-green/70 p-8">
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          <p className="text-white/90 mt-2">Manage your profile information and preferences</p>
        </div>
        
        <div className="p-8">
          {saveMessage && (
            <div className={`mb-6 p-4 rounded-md ${
              saveMessage.type === 'success' ? 'bg-green-900/30 border border-green-700' : 'bg-red-900/30 border border-red-700'
            }`}>
              <p className={`text-sm ${
                saveMessage.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {saveMessage.text}
              </p>
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="username"
                  type="text"
                  defaultValue={currentUser.username}
                  className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-green focus:border-custom-green text-white"
                  readOnly
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">Your username cannot be changed.</p>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  defaultValue={currentUser.email}
                  className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-green focus:border-custom-green text-white"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="accessCode" className="block text-sm font-medium text-gray-300 mb-2">
                Access Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="accessCode"
                  type="text"
                  defaultValue={currentUser.accessCode}
                  className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-green focus:border-custom-green text-white"
                  readOnly
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">Your access code is unique and cannot be changed.</p>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <h3 className="text-lg font-medium text-white mb-4">Account Actions</h3>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-custom-green hover:bg-custom-green/90 text-white rounded-md flex items-center transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
                
                <button
                  onClick={handleContactDeveloper}
                  className="px-4 py-2 bg-custom-green hover:bg-custom-green/90 text-white rounded-md flex items-center transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Developer
                </button>
                
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withSecurityFeatures(AccountSettingsPage);