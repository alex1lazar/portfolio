import React from 'react';
import NarrowContainer from '../components/containers/NarrowContainer';
import BlogPostCard from '../components/BlogPostCard';
import WideContainer from '../components/containers/WideContainer';

const Writing = () => {
  return (
    <div className="pt-32">
      <WideContainer>
        <NarrowContainer>
          <div className="border-b border-gray-200 mb-6">
            <h1 className="text-4xl font-serif text-text-dark mb-4">Writing</h1>
            <p className="text-text-secondary mb-3">
              My inconsistent pleasure of putting thoughts on paper. Personal, career, anything that seems interesting to me.
            </p>
          </div>
          <div className="-my-8 mt-8">
            {/* Placeholder article - to be connected to markdown later */}
            <BlogPostCard
              title="A job I'd love"
              description="A short note about the kind of role I'd love to do."
              year={2023}
              readTime="3 min"
              link="/writing/a-job-id-love"
            />
          </div>
        </NarrowContainer>
      </WideContainer>
    </div>
  );
};

export default Writing; 