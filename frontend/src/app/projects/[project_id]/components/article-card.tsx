'use client';
import { ArrowBigLeftDash, FileText } from 'lucide-react';
import moment from 'moment';
import { createRef } from 'react';
import { useState } from 'react';

import { Article } from '@/lib/types';

import Modal from '@/components/Modal';
import PDFViewer from '@/components/PdfViewer';

import ArticleMenu from './article-menu';
import { getDate } from '@/lib/utils';
import CitationView from '../../citation-view';

export default function ArticleCard({
  article,
  addArticleToCommit,
  noAbstract = false,
  deleteArticle,
}: {
  article: Article;
  addArticleToCommit?: (article: Article) => void;
  noAbstract?: boolean;
  deleteArticle?: (article: Article) => void;
  alreadyComitted?: boolean;
}) {
  const publishedDateString =
    article.published_date && getDate(article.published_date);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const articleMenuRef = createRef<HTMLButtonElement>();
  // If the user clicks on the article card, add the article to the commit articless
  const handleArticleClick = () => {
    if (addArticleToCommit) {
      addArticleToCommit(article);
    }
  };
  const onArticleClickOpenMenu = () => {
    if (articleMenuRef?.current) {
      articleMenuRef.current?.click();
    }
  };
  const onArticleDelete = () => {
    if (deleteArticle) {
      deleteArticle(article);
    }
  };
  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <div
      className='flex flex-col p-4 hover:bg-primary-foreground hover:cursor-pointer relative min-h-[160px]'
      onClick={onArticleClickOpenMenu}
    >
      <CitationView
        article={article}
        className='absolute bottom-[10px] right-[10px]'
      />
      <ArticleMenu
        menuRef={articleMenuRef}
        deleteArticle={deleteArticle && onArticleDelete}
        handleArticleClick={handleArticleClick}
        openPDFModal={openModal}
      />
      <div className='flex flex-row justify-between items-center gap-1'>
        <div>
          <h6>
            {article.title}
            {article.link && (
              <>
                <span
                  className='inline-flex ml-2 cursor-pointer hover:scale-110 transition-transform transform duration-150'
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal();
                  }}
                >
                  <FileText color='red' size={16} />
                </span>
                <Modal
                  isOpen={modalIsOpen}
                  closeModal={() => setModalIsOpen(false)}
                >
                  <PDFViewer url={article.link} />
                </Modal>
              </>
            )}
            {!noAbstract && (
              <span
                className='inline-flex ml-2 cursor-pointer hover:scale-110 transition-transform transform duration-150'
                onClick={(e) => {
                  e.stopPropagation();
                  handleArticleClick();
                }}
              >
                <ArrowBigLeftDash color='green' size={16} />
              </span>
            )}
          </h6>

          <div className='w-full flex flex-row gap-2 flex-wrap mt-2'>
            {article.authors &&
              article.authors.author_list &&
              article.authors.author_list.length > 0 &&
              article.authors.author_list.map((author, index) => (
                <p key={index} className='font-bold text-xs'>
                  {author}
                </p>
              ))}
          </div>
          <span className='text-xs text-muted'>{`Publication date ${publishedDateString}`}</span>
        </div>
      </div>
      {!noAbstract && <p className='text-xs mt-2'>{article.abstract}</p>}
    </div>
  );
}
