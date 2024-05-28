import { Project } from '@/lib/types';

import ProjectCard from './project-card';

export default function ProjectList(data: {
  projects: Project[];
  error: string | null;
  loading: boolean;
}) {
  const { loading, projects = [] } = data;

  return (
    <div className='p-4 grid grid-cols-1 sm:grid-cols-2 gap-6'>
      {loading && <h5>Loading...</h5>}
      {projects &&
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </div>
  );
}
