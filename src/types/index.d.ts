export interface ILanguage {
  alias: string;
  name: string;
  logo: string;
}

export interface ISnippet {
  content: string;
  description?: string;
  excerpt?: string | null;
  language?: ILanguage;
  logo?: string | null;
  title: string;
  slug: string;
}
