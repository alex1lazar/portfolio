import React, { useEffect, useState } from 'react';
import NarrowContainer from '../components/containers/NarrowContainer';
import BlogPostCard from '../components/BlogPostCard';
import WideContainer from '../components/containers/WideContainer';
import { client } from '../lib/sanity';

const Writing = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // First, let's test if we can connect to Sanity
        const testQuery = `*[_type == "article"][0]`;
        const testResult = await client.fetch(testQuery);
        console.log('Test query result:', testResult);

        const query = `*[_type == "article"] | order(publishedAt desc) {
          title,
          slug,
          publishedAt,
          "description": pt::text(body[0...2])
        }`;
        
        const data = await client.fetch(query);
        console.log('Fetched posts:', data);
        setPosts(data);
      } catch (err) {
        console.error('Sanity fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return (
    <div className="pt-32">
      <WideContainer>
        <NarrowContainer>
          <div>Loading posts...</div>
        </NarrowContainer>
      </WideContainer>
    </div>
  );

  if (error) return (
    <div className="pt-32">
      <WideContainer>
        <NarrowContainer>
          <div className="text-red-600">
            <h2>Error loading posts</h2>
            <p>{error}</p>
            <p className="mt-4 text-sm">Please check your browser's console for more details.</p>
          </div>
        </NarrowContainer>
      </WideContainer>
    </div>
  );

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
            {posts.length === 0 ? (
              <p className="text-text-secondary">No posts found.</p>
            ) : (
              posts.map((post) => (
                <BlogPostCard
                  key={post.slug.current}
                  title={post.title}
                  description={post.description}
                  year={new Date(post.publishedAt).getFullYear()}
                  readTime="5 min"
                  link={`/writing/${post.slug.current}`}
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