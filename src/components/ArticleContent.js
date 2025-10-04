import React from 'react';
import ReactMarkdown from 'react-markdown';

const ArticleContent = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        components={{
          h1: ({children}) => <h1 className="text-4xl font-serif text-text-dark mb-6 mt-12">{children}</h1>,
          h2: ({children}) => <h2 className="text-3xl font-serif text-text-dark mb-4 mt-10">{children}</h2>,
          h3: ({children}) => <h3 className="text-2xl font-serif text-text-dark mb-3 mt-8">{children}</h3>,
          p: ({children}) => <p className="text-text-secondary mb-4 leading-relaxed text-base">{children}</p>,
          a: ({href, children}) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">{children}</a>,
          hr: () => <hr className="my-8 border-gray-300" />,
          blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-text-secondary my-4">{children}</blockquote>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleContent;