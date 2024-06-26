import LoadingSpinner from './loading-spinner';
import useArticleProcessingStatus from '../hooks/useArticleProcessingStatus';
const Loading = ({ showProcessing = false }: { showProcessing?: boolean }) => {
  let status = '';

  if (showProcessing) status = useArticleProcessingStatus();
  return (
    <div className='relative h-full w-full min-h-[400px]'>
      <LoadingSpinner />
      {showProcessing && (
        <p className='mt-10 absolute left-1/2 transform -translate-x-1/2'>
          {`${status}...`}
        </p>
      )}
    </div>
  );
};
export default Loading;
