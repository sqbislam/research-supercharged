'use client';

import { SaveIcon } from 'lucide-react';

import { getCategories } from '@/lib/constants/category_constants';
import { Article } from '@/lib/types';
import useFetchData from '@/hooks/useFetchData';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import ArticleCard from './article-card';
import { useProjectData } from './project-data-context';
import { ProjectTabs } from './project-tabs';

export default function ProjectItem() {
  const { data, commitArticles, addArticleToCommit, deleteArticleFromCommit } =
    useProjectData();
  const { isLoading, fetchData } = useFetchData({
    url: '/articles/commit',
    data: { articles: commitArticles, project_id: data.id },
    successAction: 'Articles saved to project!',
    transformData: (data) => {
      const res = data.articles.map((article: Article) => {
        article.project_id = data.project_id;
        return article;
      });
      return res;
    },
    method: 'POST',
  });

  return (
    <section>
      <div className='section-inner'>
        <div className='grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-6'>
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

                <p className='mb-5'>
                  {data.description || 'No description available.'}
                </p>

                <div className='header-two-col border-t-2 border-primary py-3'>
                  <h4>
                    Articles added{': '}
                    <span className='text-sm'>
                      {data.articles
                        ? data.articles.length + commitArticles.length
                        : 0}
                    </span>
                  </h4>
                  <Button
                    size='icon'
                    variant='ghost'
                    onClick={fetchData}
                    disabled={isLoading}
                  >
                    <SaveIcon size={24} />
                  </Button>
                </div>
                <div className='divide-y'>
                  {commitArticles.length > 0 &&
                    commitArticles.map((article, index) => (
                      <ArticleCard
                        key={index}
                        deleteArticle={deleteArticleFromCommit}
                        article={article}
                        noAbstract={true}
                      />
                    ))}
                </div>
              </Card>
            )}
          </div>
          <ProjectTabs addArticleToCommit={addArticleToCommit} />
        </div>
      </div>
    </section>
  );
}
