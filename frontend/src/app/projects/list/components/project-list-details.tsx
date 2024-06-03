import { Project } from '@/lib/types';

import ArticleListItem from './article-list-item';

export default function ProjectListDetails({ project }: { project?: Project }) {
  if (!project) return null;
  return (
    <div className='w-full divide-y'>
      <div className='py-10'>
        <h2>{project.title}</h2>
        <p className='text-muted'>{project.description}</p>
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
        <h5 className='mb-5'>Summaries</h5>
        {project.summaries && project.summaries.length > 0 ? (
          <h4>{`Summaries Generated : ${project.summaries.length}`}</h4>
        ) : (
          <h4>No summaries generated</h4>
        )}
      </div>
    </div>
  );
}
