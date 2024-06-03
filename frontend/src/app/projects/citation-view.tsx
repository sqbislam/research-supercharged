import { Clipboard, Quote } from 'lucide-react';
import { useRef, useState } from 'react';

import { Article } from '@/lib/types';
import { cn } from '@/lib/utils';
import useCopyToClipboard from '@/hooks/useCopytoClipboard';

import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import CitationGenerator, { CitationFormat } from './citation-generator';
const citationFormats: CitationFormat[] = ['APA', 'MLA', 'Chicago', 'IEEE'];
export default function CitationView({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  const citation = CitationGenerator({ article });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isCopied, copyToClipboard] = useCopyToClipboard();
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const handleCopyClick = (index: any) => {
    if (
      textRefs.current &&
      textRefs.current[index] &&
      textRefs.current[index]?.innerText &&
      !isCopied
    ) {
      copyToClipboard(textRefs.current[index]?.innerText);
    }
  };

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
          {citationFormats.map((format, idx) => (
            <div className='grid grid-cols-[1fr_2fr]' key={idx}>
              <p>{`${format} `} </p>
              <div
                className='overflow-y-auto max-h-[150px] hover:text-teal-500 hover:cursor-pointer hover:transition-colors hover:duration-150'
                onClick={() => handleCopyClick(idx)}
              >
                <p
                  className='grid gap-4 text-sm'
                  ref={(el) => (textRefs.current[idx] = el) as any}
                >
                  {citation(format)}
                </p>
                <span>
                  <Clipboard size={16} />
                </span>
              </div>
            </div>
          ))}
        </Card>
      </Modal>
    </>
  );
}
