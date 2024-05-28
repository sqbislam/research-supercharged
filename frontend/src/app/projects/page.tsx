import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function ProjectDashboard() {
  return (
    <section className='h-full'>
      <div className='section-inner'>
        <h4>Project Dashboard</h4>

        <Link href='/projects/list'>
          <Button>List</Button>
        </Link>
        <Link href='/projects/create'>
          <Button>Create</Button>
        </Link>
      </div>
    </section>
  );
}
