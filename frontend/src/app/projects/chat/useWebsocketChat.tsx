import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
interface Message {
  type?: string;
  content?: string;
}

export interface UseWebSocketChatProps {
  chatHistory: Message[];
  websckt: WebSocket | null;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  sendMessage: () => void;
  startChat?: boolean;
  startChatHandler: (start: boolean) => void;
  processing: boolean;
}

const useWebSocketChat = (urls: string[]): UseWebSocketChatProps => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [websckt, setWebsckt] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [startChat, setStartChat] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  useEffect(() => {
    if (!urls) return;
    if (!startChat) return;

    const ws = new WebSocket('ws://127.0.0.1:8000/api/v1/chat/ws');

    ws.onopen = () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send('ping:' + urls?.toString());
        setProcessing(true);
      }
    };

    ws.onmessage = (e) => {
      const message: Message = JSON.parse(e.data);
      if (message.type === 'start') {
        ws.send('Are you ready to answer questions about the articles?');
      }
      if ('type' in message && message.type == 'ai') {
        setProcessing(false);
      }
      setMessages((messagesArr) => [...messagesArr, message]);
    };

    setWebsckt(ws);

    return () => ws.close();
  }, [urls, startChat]);

  useEffect(() => {
    setChatHistory(messages);
  }, [messages]);

  const sendMessage = useCallback(() => {
    if (!websckt) {
      return;
    }
    if (!startChat) return;

    if (websckt.readyState === WebSocket.OPEN) {
      websckt.send(message);
      setMessages((messagesArr) => [
        ...messagesArr,
        { content: message, type: 'user' },
      ]);
    }

    websckt.onmessage = (e) => {
      const message: Message = JSON.parse(e.data);

      if ('type' in message && message.type == 'ai') {
        setProcessing(false);
      }
      if ('type' in message && message.type == 'error') {
        setProcessing(false);
        toast.error('Error in processing the message. Please try again');
      }
      setMessages((messagesArr) => [...messagesArr, message]);
    };
    websckt.onerror = (e) => {
      setProcessing(false);
    };
    websckt.onclose = (e) => {
      setProcessing(false);
    };

    setMessage('');
  }, [message, websckt, startChat]);

  const startChatHandler = (start: boolean) => {
    if (start) {
      setStartChat(true);
    } else {
      setStartChat(false);
      if (websckt) websckt.close();
    }
  };
  return {
    chatHistory,
    websckt,
    message,
    setMessage,
    messages,
    sendMessage,
    startChat,
    startChatHandler,
    processing,
  };
};

export default useWebSocketChat;
