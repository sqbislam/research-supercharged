import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import ProjectList from './components/project-list';
const fetchProjects = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
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
  return responseData;
};

export default async function ProjectListPage() {
  const data = await fetchProjects();

  return (
    <section>
      <div className='section-inner'>
        <div className='w-full flex flex-row justify-between items-center p-5'>
          <div>
            <h1>Projects</h1>
            <p>Here are the list of your projects</p>
          </div>
          <Link href='/projects/create'>
            <Button variant='outline'>
              Create Project{' '}
              <span>
                <PlusCircleIcon size={20} className='ml-3' color='white' />
              </span>
            </Button>
          </Link>
        </div>

        <ProjectList projects={data} />
      </div>
    </section>
  );
}
