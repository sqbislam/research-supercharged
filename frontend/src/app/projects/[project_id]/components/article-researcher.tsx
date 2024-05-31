import MarkdownPreview from '@uiw/react-markdown-preview';

import { useProjectData } from './project-data-context';
import Loading from '../../../../components/Loading';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';

export default function ArticleResearcher() {
  const { handleProcessStart, summary, summaryLoading } = useProjectData();

  return (
    <div>
      <div className='flex flex-row p-2 justify-between items-center'>
        <div>
          <h4>Article Researcher</h4>
          <p className='text-xs text-muted'>
            Generate a summary of the article
          </p>
        </div>

        <div>
          <Button variant='outline' onClick={handleProcessStart}>
            Generate Summary
          </Button>
        </div>
      </div>
      {summaryLoading ? (
        <Loading />
      ) : (
        <Card className='p-10 rounded-none border-none overflow-y-auto max-h-[70vh]'>
          <CardContent>
            {summary ? (
              <MarkdownPreview
                source={summary ?? ''}
                style={{ padding: 6 }}
                className='!bg-background'
              />
            ) : (
              <h5>Click Generate Summary to generate summary</h5>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
