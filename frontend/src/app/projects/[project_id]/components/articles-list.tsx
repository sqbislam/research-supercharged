import { useCallback, useState } from 'react';

import { Article } from '@/lib/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import ArticleCard from './article-card';
import Loading from '../loading';
import { useProjectData } from './project-data-context';

export default function ArticlesList({
  addArticleToCommit,
}: {
  addArticleToCommit: (article: Article) => void;
}) {
  const { fetchedArticles, setFetchArticles } = useProjectData();
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
      if (setFetchArticles) setFetchArticles(responseData as Article[]);
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
        <div>
          <h4>Search Articles</h4>
          <p className='text-xs text-muted'>
            Search for articles and add them to your project
          </p>
        </div>

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
      {loading ? (
        <Loading />
      ) : (
        <div className='divide-y max-h-[70vh] w-full overflow-y-auto overflow-x-hidden'>
          {fetchedArticles && fetchedArticles.length > 0 ? (
            fetchedArticles.map((article: Article, index) => (
              <ArticleCard
                key={article.uid || index}
                article={article}
                addArticleToCommit={addArticleToCommit}
              />
            ))
          ) : (
            <h4 className='mx-auto mt-[200px] w-max'>No results</h4>
          )}
        </div>
      )}
    </div>
  );
}
