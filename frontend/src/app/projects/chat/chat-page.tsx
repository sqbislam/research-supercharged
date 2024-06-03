'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Suggestions from './suggestions';
import { useProjectData } from '../[project_id]/components/project-data-context';

export default function ChatPage() {
  const { urls, websocketProps } = useProjectData();
  const {
    chatHistory,
    websckt,
    message,
    setMessage,
    messages,
    sendMessage,
    startChatHandler,
    startChat,
  } = websocketProps;

  return (
    <div className='flex flex-col p-2 w-full'>
      <h4>Chat</h4>
      <p className='text-xs text-muted'>
        Chat with your articles to get valuable insights
      </p>
      <div className='chat h-[500px] overflow-y-scroll w-full p-3 flex flex-col mt-2'>
        {!startChat && (
          <Button onClick={() => startChatHandler(true)}>Start Chat</Button>
        )}
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
