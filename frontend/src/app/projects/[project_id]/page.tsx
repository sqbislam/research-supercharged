import { Project } from '@/lib/types';

import ProjectItem from '../../../components/project/project-page';
const fetchProject = async (params: { project_id: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${params.project_id}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const responseData = await response.json();
  return responseData as Project;
};
export default async function ProjectLoader({
  params,
}: {
  params: { project_id: string };
}) {
  const project = await fetchProject(params);

  return <section>{project && <ProjectItem projects={project} />}</section>;
}