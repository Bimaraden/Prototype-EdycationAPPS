import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { materials } from '../data/mockData';
import { Download, ArrowLeft, Video, FileText } from 'lucide-react';
import { withSecurityFeatures } from '../utils/securityUtils';

const MaterialPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  
  const material = materials.find(m => m.id === id);
  
  if (!material) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Material Not Found</h2>
          <p className="text-gray-300 mb-6">The material you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg inline-flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
        
        <div className="flex gap-4">
          <button
            onClick={() => setShowVideo(!showVideo)}
            className={`px-6 py-2 text-white rounded-lg inline-flex items-center transition-colors ${
              showVideo ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            <Video className="w-4 h-4 mr-2" />
            {showVideo ? 'Show Content' : 'Watch Video'}
          </button>
          
          <a
            href={material.pdfUrl}
            download
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg inline-flex items-center"
          >
            <FileText className="w-4 h-4 mr-2" />
            View PDF
          </a>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
        {showVideo && material.videoUrl ? (
          <div className="aspect-video w-full">
            <iframe
              src={material.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <>
            {material.imageUrl && (
              <div className="h-64 overflow-hidden">
                <img 
                  src={material.imageUrl} 
                  alt={material.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <div className="mb-6">
                <span className="px-3 py-1 bg-emerald-900/30 text-emerald-400 rounded-full text-sm">
                  {material.subject}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-6">{material.title}</h1>
              
              <div className="prose prose-invert max-w-none">
                {material.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withSecurityFeatures(MaterialPage);