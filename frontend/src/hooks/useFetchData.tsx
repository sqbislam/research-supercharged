import { useState } from 'react';
import { toast } from 'react-toastify';

export default function useFetchData({
  url,
  method,
  headers,
  next,
  data,
  successAction,
  transformData,
}: {
  url: string;
  method?: string;
  headers?: any;
  next?: any;
  data?: any;
  successAction?: string;
  transformData?: (data: any) => any;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (transformData) {
        data = transformData(data);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api${url}`,
        {
          method,
          headers,
          next,
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (successAction) {
        toast.success(successAction);
      }
      return responseData;
    } catch (error: any) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, isLoading, error };
}
