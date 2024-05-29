'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { getCategories } from '@/lib/constants/category_constants';
import { Article, Project } from '@/lib/types';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import ArticleCard from '../articles/article-card';
import ArticlesList from '../articles/articles-list';
import { ProjectTabs } from './project-tabs';
export default function ProjectItem({ projects }: { projects: Project }) {
  const [data] = useState<Project>(projects);

  const [commitArticles, setCommitArticles] = useState<Article[]>([]);

  const addArticleToCommit = (article: Article) => {
    // Only append articles which are not already present in the array based on uid
    if (commitArticles.find((a) => a.uid === article.uid)) {
      toast.info('Article already added to project');
      return;
    } else {
      setCommitArticles([...commitArticles, article]);
    }
  };
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
                  <h4>Articles added</h4>
                  <h6>
                    {data.articles
                      ? data.articles.length + commitArticles.length
                      : 0}
                  </h6>
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
