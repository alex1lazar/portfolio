import React from 'react';
import NarrowContainer from '../containers/NarrowContainer';
import WideContainer from '../containers/WideContainer';
import ArticleContent from '../ArticleContent';
import { getArticleImages } from '../../lib/articleImages';

export default function ArticleView({ article, slug }) {
  const imageMap = getArticleImages(slug);

  return (
    <div className="pt-32 pb-16">
      <WideContainer>
        <NarrowContainer>
          <div className="border-b border-gray-200 my-8">
            <h1 className="text-4xl font-serif text-text-dark mb-4">
              {article.frontmatter.title}
            </h1>
            <p className="text-text-secondary mb-4">{article.frontmatter.description}</p>
          </div>

          <ArticleContent content={article.content} imageMap={imageMap} />
        </NarrowContainer>
      </WideContainer>
    </div>
  );
}
