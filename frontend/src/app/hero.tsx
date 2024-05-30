import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section>
      <div className='layout flex flex-col items-center justify-center py-12 text-center'>
        <h1 className='text-4xl md:text-6xl p-4'>Research SuperCharged</h1>
        <h5>Start your research journey here!</h5>
        <Link href='/projects'>
          <Button className='mt-4' variant='secondary'>
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
}
