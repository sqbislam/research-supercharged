'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Suggestions from './suggestions';
import { useProjectData } from '../[project_id]/components/project-data-context';
import { Loader } from 'lucide-react';

export default function ChatPage() {
  const { websocketProps } = useProjectData();
  const {
    message,
    setMessage,
    messages,
    sendMessage,
    startChatHandler,
    startChat,
    processing,
  } = websocketProps;

  return (
    <div className='flex flex-col p-2 w-full'>
      <h4>Chat</h4>
      <p className='text-xs text-muted'>
        Chat with your articles to get valuable insights
      </p>
      <div className='chat h-[400px] overflow-y-scroll w-full p-3 flex flex-col mt-10 align-middle'>
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
        {processing && (
          <p className='text-xs'>
            <Loader className='animate-spin inline-flex' size={16} />{' '}
            {' Processing'}
          </p>
        )}
      </div>
      <div className='flex flex-col items-center'>
        {!startChat && (
          <Button onClick={() => startChatHandler(true)} className='mb-10'>
            Start Chat
          </Button>
        )}
        <Suggestions setMessage={setMessage} />
        <div className='flex flex-row gap-2 w-full'>
          <Input
            type='text'
            placeholder='Ask questions here ...'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <Button
            type='submit'
            className='min-w-[100px]'
            onClick={sendMessage}
            disabled={processing}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
