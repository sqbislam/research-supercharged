import { useState, useEffect } from 'react';
const statuses = [
  'Ingesting documents',
  'Processing documents',
  'Extracting information and generating report',
  'Finalizing',
];

const useArticleProcessingStatus = () => {
  const [status, setStatus] = useState(statuses[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < statuses.length - 1) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [index]);

  useEffect(() => {
    setStatus(statuses[index]);
  }, [index]);

  return status;
};

export default useArticleProcessingStatus;
