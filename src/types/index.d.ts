export interface ILanguage {
  id: string;
  alias: string | null;
  name: string;
  logo: string | null;
}

export interface ISnippet {
  id: string;
  content: string;
  description: string | null;
  excerpt: string | null;
  language: ILanguage | null;
  logo: string | null;
  title: string;
  slug: string;
}

export interface IProject {
  id: string;
  description: string | string[];
  href: string;
  thumbnail?: string | null;
  title: string;
}

export interface IExperience {
  description: string[];
  title: string;
  subtitle: string;
}
