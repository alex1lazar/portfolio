import React from 'react';
import ProgressItem from './ProgressItem';

const ProgressList = () => {
  const features = [
    { id: 1, name: 'To-do list', completed: true},
    { id: 2, name: 'Better showcase section animation', completed: true },
    { id: 3, name: 'Simple blog page', completed: false },
    { id: 4, name: 'Short about section on homepage', completed: true },
    { id: 5, name: 'Project section on homepage', completed: false },
    { id: 6, name: 'Reading page with collection of books read', completed: false },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-xl font-bold mb-6 font-serif">Coming next to this website:</h2>
      <div className="space-y-4">
        {features.map((feature, index) => (
          <ProgressItem 
            key={feature.id}
            feature={feature}
            isLast={index === features.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressList; 