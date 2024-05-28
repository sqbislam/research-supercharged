'use client';
import { useEffect, useState } from 'react';

import { getCategories } from '@/lib/constants/category_constants';
import { Article } from '@/lib/types';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import ArticlesList from './articles-list';
export default function ProjectItem({
  params,
}: {
  params: { project_id: string };
}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [commitArticles, setCommitArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/projects/${params.project_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
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
    };

    fetchData();
  }, [params]);

  return (
    <section>
      <div className='section-inner'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div>
            {data && (
              <Card className='shadow-sm rounded-sm p-6 mb-6'>
                <div className='header-two-col'>
                  <h4 className='text-2xl font-bold mb-1'>{data.title}</h4>
                  <Badge>
                    {(data.category && getCategories(data.category)) ||
                      'No Category'}
                  </Badge>
                </div>

                <p className='mb-2'>
                  {data.description || 'No description available.'}
                </p>
                <p className='text-sm mb-6'>
                  <strong>Keywords:</strong> {data.keywords || 'None'}
                </p>
                <div className='header-two-col'>
                  <h4>Articles added</h4>
                  <h6>{data.articles ? data.articles.length : 0}</h6>
                </div>
              </Card>
            )}
          </div>
          <ArticlesList />
        </div>
      </div>
    </section>
  );
}
