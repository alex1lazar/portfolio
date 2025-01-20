import React from 'react';

const ProgressItem = ({ feature, isLast }) => {
  return (
    <div key={feature.id}>
      <div className="flex items-center space-x-3">
        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center
          ${feature.completed 
            ? 'border-green-600 bg-green-600' 
            : 'border-gray-300'}`}>
          {feature.completed && (
            <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" 
              strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" 
              stroke="currentColor">
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </div>
        <span className={`flex-grow ${feature.completed ? 'line-through text-gray-400' : ''}`}>
          {feature.name}
        </span>
        {feature.link && feature.completed && (
          <a href={feature.link} 
            className="text-blue-500 hover:text-blue-600 transition-colors">
            View {feature.name.toLowerCase()}
          </a>
        )}
      </div>
      {!isLast && (
        <div className="h-px bg-gray-100 my-2" />
      )}
    </div>
  );
};

export default ProgressItem; 