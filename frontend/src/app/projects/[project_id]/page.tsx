import { Project, Article } from '@/lib/types';

import { ProjectDataProvider } from './components/project-data-context';
import ProjectItem from './components/project-page';

const fetchProject = async (params: { project_id: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.project_id}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 0 },
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const responseData = await response.json();
  if (responseData.articles && responseData.articles.length > 0) {
    const parsedArticles: Article[] = [];
    responseData.articles = responseData.articles.map((article: any) => {
      const parsedAuthor = JSON.parse(article.authors);
      article.authors = parsedAuthor;
      parsedArticles.push(article);
    });
    responseData.articles = parsedArticles;
  }
  return responseData as Project;
};
export default async function ProjectLoader({
  params,
}: {
  params: { project_id: string };
}) {
  const project = await fetchProject(params);

  return (
    <section>
      <ProjectDataProvider project={project}>
        <ProjectItem />
      </ProjectDataProvider>
    </section>
  );
}
