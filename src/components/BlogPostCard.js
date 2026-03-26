import React from 'react';
import Link from 'next/link';

const BlogPostCard = ({ title, description, link }) => (
  <Link href={link} className="block group">
    <div className="flex">
      <div className="mb-8 min-w-0">
        <h3 className="text-text-dark mb-2 group-hover:text-text-accent group-hover:underline transition-colors">
          {title}
        </h3>
        <p className="text-text-muted line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  </Link>
);

export default BlogPostCard; 