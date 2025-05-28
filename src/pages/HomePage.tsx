import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { materials, subjects } from '../data/mockData';
import { withSecurityFeatures } from '../utils/securityUtils';
import { FileText } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  const filteredMaterials = selectedSubject === 'all' 
    ? materials 
    : materials.filter(material => material.subject === selectedSubject);
  
  return (
    <div className="max-w-6xl mx-auto relative min-h-screen pb-20">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-emerald-400 mb-4">Welcome to LearnHub</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Explore our curated learning materials to enhance your knowledge and skills.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSubject === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Subjects
          </button>
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSubject === subject
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredMaterials.map((material) => (
          <div 
            key={material.id} 
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-emerald-700 transition-all duration-300"
          >
            {material.imageUrl && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={material.imageUrl} 
                  alt={material.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
            <div className="p-6">
              <div className="mb-4">
                <span className="px-3 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-sm">
                  {material.subject}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-emerald-400 mb-3">{material.title}</h3>
              <p className="text-gray-300 line-clamp-4 mb-4">{material.content}</p>
              <button 
                onClick={() => navigate(`/material/${material.id}`)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md transition-colors duration-200"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Questions Button */}
      <button
        onClick={() => navigate('/questions')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        aria-label="Go to Questions"
      >
        <FileText className="w-6 h-6" />
      </button>
    </div>
  );
};

export default withSecurityFeatures(HomePage);