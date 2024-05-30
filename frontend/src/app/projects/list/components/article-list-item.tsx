import { FileText } from 'lucide-react';
import moment from 'moment';

import { Article } from '@/lib/types';

export default function ArticleListItem({ article }: { article: Article }) {
  const publishedDateString =
    article.published_date && moment(article.published_date).toLocaleString();
  return (
    <div className='p-4 rounded-lg shadow-md'>
      <div className='flex flex-row justify-between items-center gap-1'>
        <div>
          <h6>{article.title}</h6>

          <span className='text-xs'>{`Publication date ${publishedDateString}`}</span>
          <div className='w-full flex flex-row gap-2'>
            {article.authors &&
              article.authors.author_list &&
              article.authors.author_list.length > 0 &&
              article.authors.author_list.map((author, index) => (
                <p key={index} className='font-bold text-xs'>
                  {author}
                </p>
              ))}
          </div>
          {/* {article.link && (
            <>
              <span className='inline-flex ml-2 cursor-pointer hover:scale-110 transition-transform transform duration-150'>
                <p className='text-xs mr-1'>PDF Available</p>
                <FileText color='red' size={16} />
              </span>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
}
