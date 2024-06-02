import MarkdownPreview from '@uiw/react-markdown-preview';
import { ArrowLeftSquare, ArrowRightSquare } from 'lucide-react';
import { use, useEffect, useState } from 'react';

import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { useProjectData } from './project-data-context';

export default function ArticleResearcher() {
  const {
    handleProcessStart,
    summary,
    summaryLoading,
    summaryList = [],
  } = useProjectData();
  const [currSummary, setCurrentSummary] = useState(summary);
  const [currIndex, setCurrIndex] = useState(0);
  useEffect(() => {
    // If new summary generated select that as current summary
    setCurrentSummary(summary);
  }, [summary]);

  const handleSummaryChange = (dir: number) => {
    if (summaryList.length === 0) return;

    // Change summary based on direction
    let index = (currIndex + dir) % summaryList.length;
    if (index < 0) index = summaryList.length - 1;
    setCurrIndex(index);
    setCurrentSummary(summaryList[index]?.summary);
  };
  const onlyOneSummary = summaryList.length <= 1;
  return (
    <div>
      <div className='flex flex-row p-2 justify-between items-center'>
        <div>
          <h4>Article Researcher</h4>
          <p className='text-xs text-muted'>
            Generate a summary of the article
          </p>
        </div>

        <div className='flex flex-row items-center '>
          <Button
            size='icon'
            variant='ghost'
            disabled={onlyOneSummary}
            onClick={() => handleSummaryChange(-1)}
          >
            <ArrowLeftSquare />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            disabled={onlyOneSummary}
            onClick={() => handleSummaryChange(1)}
          >
            <ArrowRightSquare />
          </Button>
          <Button
            variant='outline'
            className='ml-2'
            onClick={handleProcessStart}
          >
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
                source={currSummary ?? ''}
                style={{ padding: 6 }}
                className='!bg-background !text-primary'
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
