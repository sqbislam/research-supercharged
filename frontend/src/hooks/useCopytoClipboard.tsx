import { useState } from 'react';
import { toast } from 'react-toastify';

const useCopyToClipboard = (): [
  boolean,
  (text: string | undefined) => void
] => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = async (text: string | undefined) => {
    if (
      'clipboard' in navigator &&
      'writeText' in navigator.clipboard &&
      text
    ) {
      try {
        await navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      } catch (error) {
        console.error('Failed to copy text: ', error);
        setIsCopied(false);
      }
    } else {
      console.error('Clipboard API not supported');
      setIsCopied(false);
    }
  };

  return [isCopied, copyToClipboard];
};

export default useCopyToClipboard;
