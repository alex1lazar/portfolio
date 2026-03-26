import React from 'react';
import NarrowContainer from '../containers/NarrowContainer';
import BlogPostCard from '../BlogPostCard';
import WideContainer from '../containers/WideContainer';
import PageHeader from '../PageHeader';

export default function WritingList({ articles = [] }) {
  return (
    <div className="pt-32 pb-16">
      <WideContainer>
        <NarrowContainer>
          <PageHeader
            title="Writing"
            description="My inconsistent pleasure of putting thoughts on paper. Personal, career, anything that seems interesting to me."
          />
          <div className="-my-8 mt-8">
            <BlogPostCard
              title="Imagining a mobile experience for Romania's largest book retailer"
              description="Carturesti has 57 beautifully designed stores and an exceptional in-store experience. Yet, their online experience hides huge potential."
              year="2023"
              link="/carturesti"
            />
            {articles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text-secondary">No articles found.</p>
              </div>
            ) : (
              articles.map((article) => (
                <BlogPostCard
                  key={article.slug}
                  title={article.title}
                  description={article.description}
                  year={article.date}
                  link={`/writing/${encodeURIComponent(article.slug)}`}
                />
              ))
            )}
          </div>
        </NarrowContainer>
      </WideContainer>
    </div>
  );
}
