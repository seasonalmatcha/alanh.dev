export interface ILanguage {
  alias: string;
  name: string;
  logo: string;
}

export interface ISnippet {
  content: string;
  description?: string;
  excerpt?: string;
  language: ILanguage;
  logo?: string;
  title: string;
  slug: string;
}
