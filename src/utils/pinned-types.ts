// Tipos compartilhados entre o frontend e a funcao serverless /api/pinned.

export type LanguageShare = {
  name: string;
  percent: number;
  /** Cor oficial do GitHub (fallback quando a linguagem nao esta no mapa local) */
  color: string | null;
};

export type PinnedRepo = {
  name: string;
  fullName: string;
  owner: string;
  isOrg: boolean;
  description: string | null;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  /** Total de commits no branch padrao (null em repo vazio) */
  commits: number | null;
  topics: string[];
  pushedAt: string | null;
  languageShares: LanguageShare[];
};
