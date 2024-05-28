// Properties to receive on item creation

export interface ArticlesAssign {
  articles: Array<Record<string, any>>; // Array of objects, adjust type if more specific
  project_id: number;
}

export interface ArticleCreate {
  title?: string;
  authors?: string;
  link?: string;
  abstract?: string;
  category?: string;
  published_date?: Date;
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

export interface Article {
  title?: string;
  authors?: string;
  link?: string;
  abstract?: string;
  category?: string;
  published_date?: Date;
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

// Properties to return to client
// CURD model
export interface Project {
  category?: string;
  title?: string;
  description?: string;
  keywords?: string;
  is_deleted?: boolean;
  articles?: Article[]; // Using 'any[]' for the articles list; adjust the type if articles have a specific structure
  table_name: string;
}