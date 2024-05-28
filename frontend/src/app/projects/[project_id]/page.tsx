'use client';
import { useEffect, useState } from 'react';

export default function ProjectItem({
  params,
}: {
  params: { project_id: string };
}) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/projects/${params.project_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        setData(responseData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>{data && <h1>Project: {data.toString()}</h1>}</div>;
}
