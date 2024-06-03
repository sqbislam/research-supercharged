'use client';
import { useState } from 'react';

import { Project } from '@/lib/types';

import ProjectCard from './project-card';
import ProjectListDetails from './project-list-details';

export default function ProjectList(data: { projects: Project[] }) {
  const { projects = [] } = data;
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    projects.length > 0 ? projects[0] : undefined
  );
  // Sets the selected project for details
  const setSelectedProjectHandler = (project: Project) => {
    setSelectedProject(project);
  };
  return (
    <div className='p-4 grid grid-cols-1 sm:grid-cols-2 gap-6'>
      <div>
        {projects &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              isSelected={selectedProject?.id === project.id}
              project={project}
              setSelectedProjectHandler={setSelectedProjectHandler}
            />
          ))}
      </div>
      <div>
        <ProjectListDetails project={selectedProject} />
      </div>
    </div>
  );
}
