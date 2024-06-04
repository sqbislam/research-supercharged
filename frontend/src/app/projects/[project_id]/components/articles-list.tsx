import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { Article } from '@/lib/types';

import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import ArticleCard from './article-card';
import { useProjectData } from './project-data-context';

export default function ArticlesList({
  addArticleToCommit,
}: {
  addArticleToCommit: (article: Article) => void;
}) {
  const { fetchedArticles, setFetchArticles } = useProjectData();
  const [searchQuery, setSearchQuery] = useState('disease detection');
  const [loading, setLoading] = useState(false);
  const [maxResult, setMaxResult] = useState(10);

  // Fetch more articles
  const handleFetchMore = () => {
    setMaxResult((prev) => prev + 10);
    handleFetchArticles();
  };
  // Fetch articles from arxiv api
  const handleFetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        '/api/articles?' +
          new URLSearchParams({
            search_query: searchQuery,
            start: '0',
            maxResult: maxResult.toString(),
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
      toast.error(err.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, maxResult]);
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
          <Button onClick={handleFetchMore} disabled={loading}>
            Fetch Articles
          </Button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className='divide-y max-h-[70vh] w-full overflow-y-auto overflow-x-hidden'>
          {fetchedArticles && fetchedArticles.length > 0 ? (
            <>
              {fetchedArticles.map((article: Article, index) => (
                <ArticleCard
                  key={article.uid || index}
                  article={article}
                  addArticleToCommit={addArticleToCommit}
                />
              ))}
              <Button
                onClick={handleFetchArticles}
                disabled={loading}
                size='sm'
                variant='ghost'
              >
                Fetch More
              </Button>
            </>
          ) : (
            <h4 className='mx-auto mt-[200px] w-max'>No results</h4>
          )}
        </div>
      )}
    </div>
  );
}
