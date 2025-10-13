import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ title, description, link }) => (
  <Link to={link} className="block group">
    <div className="flex">
      <div className="mb-4 min-w-0">
        <h2 className="text-text-dark mb-2 group-hover:text-text-accent group-hover:underline transition-colors">
          {title}
        </h2>
        <p className="text-text-muted pr-10 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

export default BlogPostCard; 