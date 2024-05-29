'use client';

import { getCategories } from '@/lib/constants/category_constants';
import { Article, Project } from '@/lib/types';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { useProjectData } from './project-data-context';
import { ProjectTabs } from './project-tabs';
import ArticleCard from '../articles/article-card';
import { Button } from '../ui/button';

export default function ProjectItem({ projects }: { projects: Project }) {
  const { data, commitArticles, addArticleToCommit } = useProjectData();

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
                </div>
                <div className='divide-y'>
                  {commitArticles.length > 0 &&
                    commitArticles.map((article, index) => (
                      <ArticleCard
                        key={index}
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
