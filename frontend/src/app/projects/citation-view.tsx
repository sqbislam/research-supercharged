import { Article } from '@/lib/types';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import CitationGenerator from './citation-generator';
export default function CitationView({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  const citation = CitationGenerator({ article });
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className={cn('mt-2', className)}
          onClick={(e) => e.stopPropagation()}
        >
          Cite
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4 text-lg'>{citation('APA')}</div>
      </PopoverContent>
    </Popover>
  );
}
