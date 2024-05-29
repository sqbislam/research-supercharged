import { Project } from '@/lib/types';

import ProjectList from './project-list';
const fetchProjects = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const responseData = await response.json();
  return responseData as Project[];
};

export default async function ProjectListPage() {
  const data = await fetchProjects();

  return (
    <section>
      <div className='section-inner'>
        <ProjectList projects={data} />
      </div>
    </section>
  );
}
