import React from 'react';
import NarrowContainer from '../components/containers/NarrowContainer';
import BlogPostCard from '../components/BlogPostCard';
import WideContainer from '../components/containers/WideContainer';

const Writing = () => {
  const posts = [
    {
      title: "Creative angst",
      description: "Currently, I'm leading all design initiatives at Kota where we're making global benefits more accessible to companies and their employees. I'm used to working...",
      year: "2024",
      readTime: "1 minute",
      link: "/writing/creative-angst"
    }
  ];

  return (
    <div className="pt-32">
      <WideContainer>
        <NarrowContainer>
        <div className="border-b border-gray-200 mb-6">
          <h1 className="text-4xl font-serif mb-4">Writing</h1>
          <p className="text-text-secondary mb-3">
            My inconsistent pleasure of putting thoughts on paper. Personal, career, anything that seems interesting to me.
          </p>
          </div>
          <div className="-my-8 mt-8">
            {posts.map((post) => (
              <BlogPostCard key={post.title} {...post} />
            ))}
          </div>
        </NarrowContainer>
      </WideContainer>
    </div>
  );
};

export default Writing; 