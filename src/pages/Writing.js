import React, { useState, useEffect } from 'react';
import NarrowContainer from '../components/containers/NarrowContainer';
import BlogPostCard from '../components/BlogPostCard';
import WideContainer from '../components/containers/WideContainer';
import PageHeader from '../components/PageHeader';
import { getAllArticles } from '../lib/articles';

const Writing = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log('Fetching articles...');
        const articlesData = await getAllArticles();
        console.log('Articles fetched:', articlesData);
        setArticles(articlesData);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="pt-32">
        <WideContainer>
          <NarrowContainer>
            <div className="text-center">
              <p className="text-text-secondary">Loading articles...</p>
            </div>
          </NarrowContainer>
        </WideContainer>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16">
      <WideContainer>
        <NarrowContainer>
          <PageHeader
            title="Writing"
            description="My inconsistent pleasure of putting thoughts on paper. Personal, career, anything that seems interesting to me."
          />
          <div className="-my-8 mt-8">
            {/* Carturesti Case Study */}
            <BlogPostCard
              title="Carturesti.ro"
              description="Imagining a mobile experience for Romania's largest book retailer"
              year="2023"
              link="/carturesti"
            />
            {articles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text-secondary">No articles found. Check the console for errors.</p>
              </div>
            ) : (
              articles.map((article, index) => (
                <BlogPostCard
                  key={index}
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
};

export default Writing; 