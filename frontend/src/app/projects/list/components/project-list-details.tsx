import { Project } from '@/lib/types';

import ArticleListItem from './article-list-item';

export default function ProjectListDetails({ project }: { project?: Project }) {
  if (!project) return null;
  return (
    <div className='w-full divide-y'>
      <div className='py-10'>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>
      <div className='py-5'>
        <h5>Articles</h5>
        <div className='divide-y'>
          {project.articles &&
            project.articles.map((article) => (
              <ArticleListItem key={article.uid} article={article} />
            ))}
        </div>
      </div>
      <div className='py-5'>
        <h5>Summaries</h5>
      </div>
    </div>
  );
}
