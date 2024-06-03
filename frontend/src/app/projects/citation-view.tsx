import { Article } from '@/lib/types';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import CitationGenerator from './citation-generator';
import { useState } from 'react';
import Modal from '@/components/Modal';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';
export default function CitationView({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  const citation = CitationGenerator({ article });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Button
        variant='ghost'
        size='sm'
        className={cn('mt-2', className)}
        onClick={(e) => {
          e.stopPropagation();
          openModal();
        }}
      >
        Cite <Quote className='ml-2' size={16} />
      </Button>
      <Modal isOpen={modalIsOpen} closeModal={closeModal}>
        <Card className='flex flex-col w-full p-5 gap-4 max-w-[500px]'>
          <h2 className='text-xl font-semibold'>Citation</h2>
          <div className='grid grid-cols-[1fr_2fr]'>
            <p>APA </p>
            <p className='grid gap-4 text-sm'>{citation('APA')}</p>
          </div>
          <div className='grid grid-cols-[1fr_2fr]'>
            <p>MLA </p>
            <p className='grid gap-4 text-sm'>{citation('MLA')}</p>
          </div>
          <div className='grid grid-cols-[1fr_2fr]'>
            <p>Chicago </p>
            <p className='grid gap-4 text-sm'>{citation('Chicago')}</p>
          </div>
          <div className='grid grid-cols-[1fr_2fr]'>
            <p>IEEE </p>
            <p className='grid gap-4 text-sm'>{citation('IEEE')}</p>
          </div>
        </Card>
      </Modal>
    </>
  );
}
