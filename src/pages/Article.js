import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NarrowContainer from '../components/containers/NarrowContainer';
import WideContainer from '../components/containers/WideContainer';
import ArticleContent from '../components/ArticleContent';
import { loadArticle } from '../lib/articles';

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const articleData = await loadArticle(slug);
        
        if (articleData) {
          setArticle(articleData);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Failed to load article');
        console.error('Error loading article:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32">
        <WideContainer>
          <NarrowContainer>
            <div className="text-center">
              <p className="text-text-secondary">Loading article...</p>
            </div>
          </NarrowContainer>
        </WideContainer>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="pt-32">
        <WideContainer>
          <NarrowContainer>
            <div className="text-center">
              <h1 className="text-2xl font-serif text-text-dark mb-4">Article Not Found</h1>
              <p className="text-text-secondary">The article you're looking for doesn't exist.</p>
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
          <div className="border-b border-gray-200 my-8">
            <h1 className="text-4xl font-serif text-text-dark mb-4">{article.frontmatter.title}</h1>
            <p className="text-text-secondary mb-4">{article.frontmatter.description}</p>
            <div className="flex items-center gap-4 text-base text-text-secondary">
              {/* <span>{article.frontmatter.date}</span>
              {article.frontmatter.tags && (
                <div className="flex gap-2">
                  {article.frontmatter.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )} */}
            </div>
          </div>
          
          <ArticleContent content={article.content} />
        </NarrowContainer>
      </WideContainer>
    </div>
  );
};

export default Article;
