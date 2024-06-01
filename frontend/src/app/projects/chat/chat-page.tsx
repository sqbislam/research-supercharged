'use client';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const [clientId, setClienId] = useState(
    Math.floor(new Date().getTime() / 1000)
  );

  const [chatHistory, setChatHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [websckt, setWebsckt] = useState<WebSocket>();

  const [message, setMessage] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  console.debug({
    message,
    messages,
    websckt,
    chatHistory,
    isOnline,
    textValue,
  });
  useEffect(() => {
    const url = 'ws://127.0.0.1:8000/api/v1/chat/ws';
    const ws = new WebSocket(url);

    ws.onopen = (event) => {
      if (ws.readyState === 1) {
        ws.send('Tell me the authors of the article');
      }
    };

    // recieve message every start page
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
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
    }
    // recieve message every send message
    websckt.onmessage = (e) => {
      console.debug('message', e.data);
      const message = JSON.parse(e.data);
      setMessages((messagesArr: any) => [...messagesArr, message]);
    };
    websckt.onerror = (e) => {
      console.debug({ error: e });
    };
    setMessage([]);
  };

  return (
    <div>
      <div className='flex flex-row p-2 justify-between items-center'>
        <div>
          <h4>Chat</h4>
          <p className='text-xs text-muted'>
            Chat with your articles to get valuable insights
          </p>
          <div className='chat'>
            {messages.map((value: any, index: number) => {
              if (value.content) {
                return (
                  <div
                    key={index}
                    className='my-message-container bg-background p-5 rounded-lg'
                  >
                    <div className='my-message'>
                      <p className='message'>{value.content}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className='input-chat-container'>
            <input
              className='input-chat'
              type='text'
              placeholder='Chat message ...'
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></input>
            <button className='submit-chat' onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
