import { ChatBubbleIcon } from '@radix-ui/react-icons';

import { Article } from '@/lib/types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ArticleResearcher from './article-researcher';
import ArticlesList from './articles-list';
import ChatPage from '../../chat/chat-page';

export function ProjectTabs({
  addArticleToCommit,
}: {
  addArticleToCommit: (article: Article) => void;
}) {
  return (
    <Tabs defaultValue='articles'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='chat'>
          Chat <ChatBubbleIcon fontSize='1.6rem' className='ml-1' />
        </TabsTrigger>
        <TabsTrigger value='researcher'>AI Researcher</TabsTrigger>
        <TabsTrigger value='articles'>Articles</TabsTrigger>
      </TabsList>
      <TabsContent value='researcher'>
        <ArticleResearcher />
      </TabsContent>
      <TabsContent value='articles'>
        <ArticlesList addArticleToCommit={addArticleToCommit} />
      </TabsContent>
      <TabsContent value='chat' className='w-full'>
        <ChatPage />
      </TabsContent>
    </Tabs>
  );
}
