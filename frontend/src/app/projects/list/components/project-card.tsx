'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { getCategories } from '@/lib/constants/category_constants';
import { Project } from '@/lib/types';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProjectCardProps {
  project: Project;
  setSelectedProjectHandler?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  setSelectedProjectHandler,
}) => {
  const router = useRouter();

  const onCardClick = (e: any) => {
    if (setSelectedProjectHandler) setSelectedProjectHandler(project);
    // if (id) router.push(`/projects/${id}`);
  };
  const onProjectClick = (id: number | undefined) => (e: any) => {
    if (id) router.push(`/projects/${id}`);
  };
  return (
    <Card
      className='shadow-sm rounded-none p-4 mb-2 card-hover-anim'
      onClick={onCardClick}
    >
      <div className='header-two-col'>
        <h4 className='text-2xl font-bold mb-1'>{project.title}</h4>
        <Button
          variant='outline'
          size='sm'
          onClick={onProjectClick(project.id)}
        >
          Open
        </Button>
      </div>

      <p className='mb-5 text-sm text-secondary-foreground'>
        {project.description || 'No description available.'}
      </p>
      <Badge variant='secondary' size='small'>
        {(project.category && getCategories(project.category)) || 'No Category'}
      </Badge>
    </Card>
  );
};

export default ProjectCard;
