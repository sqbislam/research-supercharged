import MarkdownPreview from '@uiw/react-markdown-preview';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Article } from '@/lib/types';

import { useProjectData } from './project-data-context';
import Loading from '../../../../components/Loading';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';

const fetchSummaryofArticles = async (articles: Article[]) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/extract`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articles),
    }
  );
  const data = await response.json();
  return data;
};
export default function ArticleResearcher() {
  const { commitArticles } = useProjectData();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (commitArticles.length === 0) {
      toast.error('No articles to summarize');
    } else {
      try {
        setLoading(true);
        const summary = await fetchSummaryofArticles(commitArticles);
        setData(summary);
        setLoading(false);
      } catch (err: any) {
        toast.error('Error generating summary', err.message);
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <div className='flex flex-row p-2 justify-between items-center'>
        <h4>AI Researcher</h4>
        <div>
          <Button variant='outline' onClick={generateSummary}>
            Generate Summary
          </Button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Card className='p-10'>
          <CardContent>
            {data && (
              <MarkdownPreview
                source={data}
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
