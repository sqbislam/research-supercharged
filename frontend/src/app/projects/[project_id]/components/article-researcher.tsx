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
        <h4>AI Researcher</h4>
        <div>
          <Button variant='outline' onClick={handleProcessStart}>
            Generate Summary
          </Button>
        </div>
      </div>
      {summaryLoading ? (
        <Loading />
      ) : (
        <Card className='p-10'>
          <CardContent>
            {summary && (
              <MarkdownPreview
                source={summary ?? ''}
                style={{ padding: 6, backgroundColor: '#020202' }}
                className='bg-primary'
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
