import { useRouter } from 'next/navigation';
import React from 'react';

import { getCategories } from '@/lib/constants/category_constants';
import { Project } from '@/lib/types';

import { Badge } from '@/components/ui/badge';
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
      className='shadow-sm rounded-sm p-6 mb-6 card-hover-anim'
      onClick={onClick(project.id)}
    >
      <div className='header-two-col'>
        <h4 className='text-2xl font-bold mb-1'>{project.title}</h4>
        <Badge>
          {(project.category && getCategories(project.category)) ||
            'No Category'}
        </Badge>
      </div>

      <p className='mb-2'>
        {project.description || 'No description available.'}
      </p>
      <p className='text-sm mb-6'>
        <strong>Keywords:</strong> {project.keywords || 'None'}
      </p>
      <div className='header-two-col'>
        <h4>Articles added</h4>
        <h6>{project.articles ? project.articles.length : 0}</h6>
      </div>
    </Card>
  );
};

export default ProjectCard;
