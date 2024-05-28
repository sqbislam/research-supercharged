import { useRouter } from 'next/navigation';
import React from 'react';

import { Project } from '@/lib/types';

import { Card } from '@/components/ui/card';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const router = useRouter();

  const onClick = (id: number | undefined) => (e: any) => {
    if (id) router.push(`/projects/${id}`);
  };
  return (
    <Card
      className=' shadow-lg rounded-lg p-6 mb-6 card-hover-anim'
      onClick={onClick(project.id)}
    >
      <h2 className='text-2xl font-bold mb-2'>{project.title}</h2>
      <p className='text-sm text-gray-500 mb-2'>
        {project.category || 'No Category'}
      </p>
      <p className='text-gray-700 mb-4'>
        {project.description || 'No description available.'}
      </p>
      <p className='text-sm text-gray-600 mb-4'>
        <strong>Keywords:</strong> {project.keywords || 'None'}
      </p>
      <p className='text-sm text-gray-600'>
        <strong>Articles:</strong>{' '}
        {project.articles ? project.articles.length : 0}
      </p>
    </Card>
  );
};

export default ProjectCard;
