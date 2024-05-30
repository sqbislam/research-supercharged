import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Article } from '@/lib/types';

// Dummy functions to simulate API calls
async function startGenerateSummary(projectID: number, articles: Article[]) {
  const body = articles.map((article) => {
    article.project_id = projectID;
    return article;
  });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles/extract`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ articles: body, project_id: projectID }),
    }
  );
  const data = await response.json();
  return data;
}

// function fetchSummary(projectID: number) {
//   console.debug(`Fetching summary for project ${projectID}`);

// }

async function fetchProjectStatus(projectID: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects/status/${projectID}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  return data;
}

type ProjectStatus = 'RUNNING' | 'FAILED' | 'SUCCESS' | 'NOT_STARTED';

export default function useSummaryPolling({
  articles,
  projectID,
}: {
  articles: Article[];
  projectID: number | undefined;
}) {
  const [status, setStatus] = useState<ProjectStatus>('NOT_STARTED');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [startProcess, setStartProcess] = useState(false);

  const handleProcessStart = () => {
    setStartProcess(true);
  };
  useEffect(() => {
    let intervalId: any;

    const startPolling = async () => {
      if (!projectID) return;

      if (status === 'NOT_STARTED') {
        setLoading(true);
        await startGenerateSummary(projectID, articles);
        setStatus('RUNNING');
      }

      intervalId = setInterval(async () => {
        const { process_status: currentStatus, ...rest } =
          await fetchProjectStatus(projectID);
        setStatus(currentStatus);

        if (currentStatus === 'SUCCESS') {
          const fetchedSummary = rest?.summaries[0]?.summary;
          setSummary(fetchedSummary);
          setLoading(false);
          toast.success('Summary generated successfully');

          clearInterval(intervalId);
        } else if (currentStatus === 'FAILED') {
          setLoading(false);
          clearInterval(intervalId);
        }
      }, 8000);
    };
    try {
      if (startProcess) startPolling();
    } catch (e) {
      setStatus('FAILED');
    } finally {
      setStatus('NOT_STARTED');

      setStartProcess(false);
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startProcess]);
  return { status, summary, loading, handleProcessStart };
}
