'use client';
import { FileText } from 'lucide-react';
import moment from 'moment';

import { Article } from '@/lib/types';

import Modal from '@/components/Modal';
import PDFViewer from '@/components/PdfViewer';

import { useModal } from '@/providers/modal-provider';
export default function ArticleCard({ article }: { article: Article }) {
  const publishedDateString =
    article.published_date && moment(article.published_date).toLocaleString();
  const { openModal } = useModal();
  return (
    <div className='flex flex-col p-2 hover:bg-primary-foreground hover:cursor-pointer'>
      <div className='flex flex-row justify-between items-center gap-1'>
        <div>
          <h4>
            {article.title}
            {article.link && (
              <>
                <span
                  className='inline-flex ml-2 cursor-pointer hover:scale-110 transition-transform transform duration-150'
                  onClick={openModal}
                >
                  <FileText color='red' size={16} />
                </span>

                <Modal>
                
                  <PDFViewer url={article.link} />
                </Modal>
              </>
            )}
          </h4>
          <span className='text-xs'>{`Publication date ${publishedDateString}`}</span>
          <div className='w-full flex flex-row gap-2'>
            {article.authors &&
              article.authors.length > 0 &&
              article.authors.map((author, index) => (
                <p key={index} className='font-bold text-xs'>
                  {author}
                </p>
              ))}
          </div>
        </div>
      </div>
      <p className='text-xs mt-2'>{article.abstract}</p>
    </div>
  );
}
