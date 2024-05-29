import { Article } from '@/lib/types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ArticlesList from '../articles/articles-list';
import ArticleResearcher from '../articles/article-researcher';

export function ProjectTabs({
  addArticleToCommit,
}: {
  addArticleToCommit: (article: Article) => void;
}) {
  return (
    <Tabs defaultValue='articles'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='researcher'>AI Researcher</TabsTrigger>
        <TabsTrigger value='articles'>Articles</TabsTrigger>
      </TabsList>
      <TabsContent value='researcher'>
        <ArticleResearcher />
      </TabsContent>
      <TabsContent value='articles'>
        <ArticlesList addArticleToCommit={addArticleToCommit} />
      </TabsContent>
    </Tabs>
  );
}
