'use client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useProjectData } from '../[project_id]/components/project-data-context';
import Suggestions from './suggestions';

export default function ChatPage() {
  const { urls } = useProjectData();

  const [chatHistory, setChatHistory] = useState([]);
  const [websckt, setWebsckt] = useState<WebSocket>();

  const [message, setMessage] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  console.debug({
    message,
    messages,
    websckt,
    chatHistory,
  });
  useEffect(() => {
    const url = 'ws://127.0.0.1:8000/api/v1/chat/ws';
    const ws = new WebSocket(url);

    ws.onopen = () => {
      if (ws.readyState === 1) {
        ws.send('ping:' + urls?.toString());
      }
    };

    // recieve message every start page
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      if (message.type === 'start') {
        ws.send('Are you ready to answer questions about the articles?');
      }
      setMessages((messagesArr: any) => [...messagesArr, message]);
    };

    setWebsckt(ws);
    // clean up function when we close page
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (!websckt) {
      return;
    } // TODO: Add error feedback
    if (websckt.readyState === 1) {
      websckt.send(message);
      setMessages((messagesArr: any) => [
        ...messagesArr,
        { content: message, type: 'user' },
      ]);
    }
    // recieve message every send message
    websckt.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setMessages((messagesArr: any) => [...messagesArr, message]);
    };

    setMessage([]);
  };

  return (
    <div className='flex flex-col p-2 w-full'>
      <h4>Chat</h4>
      <p className='text-xs text-muted'>
        Chat with your articles to get valuable insights
      </p>
      <div className='chat h-[600px] overflow-y-scroll w-full p-3 flex flex-col mt-2'>
        {messages.map((value: any, index: number) => {
          if (value.content) {
            return (
              <div
                key={index}
                className={`bg-primary-foreground p-5 rounded-lg mb-5 max-w-md ${
                  value.type == 'user'
                    ? 'self-start bg-teal-400 dark:bg-teal-600'
                    : 'self-end'
                }`}
              >
                <div>
                  <p>{value.content}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className='input-chat-container'>
        <Suggestions setMessage={setMessage} />
        <div className='flex flex-row gap-2'>
          <Input
            type='text'
            placeholder='Ask questions here ...'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <Button type='submit' onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
