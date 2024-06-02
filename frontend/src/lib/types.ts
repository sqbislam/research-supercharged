// Properties to receive on item creation

export interface ArticlesAssign {
  articles: Array<Record<string, any>>; // Array of objects, adjust type if more specific
  project_id: number;
}

export interface ArticleCreate {
  title?: string;
  authors?: AuthorList;
  link?: string;
  abstract?: string;
  category?: string;
  published_date?: string;
  journal_ref?: string;
  doi?: string;
}

// Properties to receive on item update

export interface ArticleUpdate {
  title?: string;
  authors?: string;
  link?: string;
  abstract?: string;
  category?: string;
}

// Properties to return to client (CURD model)

export interface AuthorList {
  author_list: string[];
}
export interface Article {
  uid?: string;
  title?: string;
  authors?: AuthorList;
  link?: string;
  abstract?: string;
  category?: string;
  published_date?: string;
  project_id?: number;
  journal_ref?: string;
  doi?: string;
}

// Properties to receive on item creation
export interface ProjectCreate {
  category?: string;
  title?: string;
  description?: string;
  keywords?: string;
}

// Properties to receive on item update
export interface ProjectUpdate {
  category?: string;
  title?: string;
  description?: string;
  keywords?: string;
  is_deleted?: boolean;
}

export interface Summary {
  id?: number;
  summary?: string;
  project_id: number;
  article_ids?: string[];
  created_at?: string;
}

// Properties to return to client
// CURD model
export interface Project {
  id?: number;
  category?: string;
  title?: string;
  description?: string;
  summaries?: Summary[];
  keywords?: string;
  is_deleted?: boolean;
  articles?: Article[]; // Using 'any[]' for the articles list; adjust the type if articles have a specific structure
  table_name?: string;
}
