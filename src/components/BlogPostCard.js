import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ title, description, year, readTime, link }) => (
  <Link to={link} className="block group">
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="font-serif text-xl text-text-dark mb-2 group-hover:text-text-accent group-hover:underline transition-colors">
          {title}
        </h2>
        <p className="text-text-secondary pr-10 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center text-text-tertiary text-sm">
          <span>{year}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default BlogPostCard; 