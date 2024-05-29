'use client';
import { ArrowBigLeftDash, FileText } from 'lucide-react';
import moment from 'moment';

import { Article } from '@/lib/types';

import Modal from '@/components/Modal';
import PDFViewer from '@/components/PdfViewer';

import { useModal } from '@/providers/modal-provider';
export default function ArticleCard({
  article,
  addArticleToCommit,
  noAbstract = false,
}: {
  article: Article;
  addArticleToCommit?: (article: Article) => void;
  noAbstract?: boolean;
}) {
  const publishedDateString =
    article.published_date && moment(article.published_date).toLocaleString();
  const { openModal } = useModal();

  // If the user clicks on the article card, add the article to the commit articless
  const handleArticleClick = (e: any) => {
    if (addArticleToCommit) {
      addArticleToCommit(article);
    }
  };
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
            <span
              className='inline-flex ml-2 cursor-pointer hover:scale-110 transition-transform transform duration-150'
              onClick={handleArticleClick}
            >
              <ArrowBigLeftDash color='green' size={16} />
            </span>
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
      {!noAbstract && <p className='text-xs mt-2'>{article.abstract}</p>}
    </div>
  );
}
