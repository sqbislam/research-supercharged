import { useCallback, useState } from 'react';

import { Article } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import ArticleCard from './article-card';

export default function ArticlesList({
  addArticleToCommit,
}: {
  addArticleToCommit: (article: Article) => void;
}) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('Computer Vision');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleFetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        '/api/articles?' +
          new URLSearchParams({
            search_query: searchQuery,
            start: '0',
            maxResult: '10',
          }),
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);
  return (
    <div>
      <div className='flex flex-row p-2 justify-between items-center'>
        <h4>Articles List</h4>
        <div className='flex-col md:header-two-col '>
          <Input
            defaultValue={searchQuery}
            placeholder='Search'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={handleFetchArticles} disabled={loading}>
            Fetch Articles
          </Button>
        </div>
      </div>
      <div className='divide-y max-h-[100vh] overflow-y-auto overflow-x-hidden'>
        {data &&
          data.length > 0 &&
          data.map((article: Article, index) => (
            <ArticleCard
              key={article.uid || index}
              article={article}
              addArticleToCommit={addArticleToCommit}
            />
          ))}
      </div>
    </div>
  );
}
