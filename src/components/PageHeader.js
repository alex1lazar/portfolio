import React from 'react';

function PageHeader({ title, description }) {
  return (
    <div className="text-muted mb-12">
      <h1 className="text-text-dark mb-3">
        {title}
      </h1>
      <p className="text-text-muted">
        {description}
      </p>
    </div>
  );
}

export default PageHeader;

