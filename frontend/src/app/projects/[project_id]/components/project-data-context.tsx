// Component to store the project data and provider

'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { Article, Project } from '@/lib/types';
import useSummaryPolling from '@/hooks/useSummaryPolling';

interface ProjectDataContextProps {
  data: Project;
  commitArticles: Article[];
  addArticleToCommit: (article: Article) => void;
  deleteArticleFromCommit: (article: Article) => void;
  handleProcessStart?: () => void;
  summary?: string;
  summaryLoading?: boolean;
  fetchedArticles?: Article[];
  setFetchArticles?: (articles: Article[]) => void;
  urls?: string[];
}

const ProjectDataContext = createContext<ProjectDataContextProps | undefined>(
  undefined
);

export const ProjectDataProvider: React.FC<{
  children: ReactNode;
  project: Project;
}> = ({ children, project }) => {
  const [data, setData] = useState(project);
  const [fetchedArticles, setFetchArticles] = useState<Article[]>([]);
  const [commitArticles, setCommitArticles] = useState<Article[]>(
    project.articles || []
  );
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    if (commitArticles.length > 0) {
      // Get all the urls from the articles
      const urls = commitArticles.map((article) => {
        if (article.link) return article.link;
      });
      setUrls(urls as any);
    }
  }, [commitArticles]);

  const { loading, summary, handleProcessStart } = useSummaryPolling({
    articles: commitArticles,
    defaultSummary: project.summaries?.[0]?.summary ?? '',
    projectID: data.id,
  });
  // Function to add an article to the commit list
  const addArticleToCommit = (article: Article) => {
    // Only append articles which are not already present in the array based on uid
    if (commitArticles.find((a) => a.uid === article.uid)) {
      toast.info('Article already added to project');
      return;
    } else {
      setCommitArticles([...commitArticles, article]);
    }
  };
  const deleteArticleFromCommit = (article: Article) => {
    setCommitArticles(commitArticles.filter((a) => a.uid !== article.uid));
  };
  return (
    <ProjectDataContext.Provider
      value={{
        data,
        commitArticles,
        addArticleToCommit,
        deleteArticleFromCommit,
        handleProcessStart,
        summary,
        summaryLoading: loading,
        fetchedArticles,
        setFetchArticles,
        urls,
      }}
    >
      {children}
    </ProjectDataContext.Provider>
  );
};

export const useProjectData = (): ProjectDataContextProps => {
  const context = useContext(ProjectDataContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
