import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ title, description, year, readTime, link }) => (
  <Link to={link} className="block group p-4 rounded-lg bg-surface hover:drop-shadow-md transition-all duration-300">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h2 className="mb-2 pr-8">{title}</h2>
        <p className="text-text-secondary mb-4 pr-8 line-clamp-2">{description}</p>
        <div className="flex items-center text-text-tertiary text-sm">
          <span>{year}</span>
          <span className="mx-2">·</span>
          <span>{readTime} read</span>
        </div>
      </div>
      <div className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </Link>
);

export default BlogPostCard; 