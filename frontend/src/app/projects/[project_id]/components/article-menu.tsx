import { PopoverTrigger } from '@radix-ui/react-popover';
import { EllipsisIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent } from '@/components/ui/popover';

export default function ArticleMenu({
  menuRef,
  handleArticleClick,
  openPDFModal,
  deleteArticle,
}: {
  menuRef: any;
  handleArticleClick: () => void;
  openPDFModal: () => void;
  deleteArticle?: () => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          ref={menuRef}
          onClick={(e) => {
            e.stopPropagation();
          }}
          variant='ghost'
          size='icon'
          className='absolute top-0 right-0 p-2'
        >
          <EllipsisIcon color='white' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-50 p-0 m-0' side='left' sideOffset={10}>
        <div className='grid'>
          <Button variant='menu' onClick={handleArticleClick}>
            Add to Project
          </Button>
          <Button variant='menu' onClick={openPDFModal}>
            View PDF
          </Button>
          {deleteArticle && (
            <Button onClick={deleteArticle} variant='menu'>
              Delete
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
