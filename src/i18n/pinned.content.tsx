import { t, type Dictionary } from 'intlayer';

const pinnedContent = {
  key: 'pinned',
  schema: undefined,
  content: {
    section: t({
      en: 'PINNED REPOSITORIES',
      "pt-BR": 'REPOSITÓRIOS FIXADOS',
    }),
    title: t({
      en: 'PINNED_PROCESSES',
      "pt-BR": 'PROCESSOS_FIXADOS',
    }),
    running: t({
      en: 'running',
      "pt-BR": 'em execução',
    }),
    colName: t({ en: 'NAME', "pt-BR": 'NOME' }),
    colLang: t({ en: 'LANG', "pt-BR": 'LING' }),
    colForks: t({ en: 'FORK', "pt-BR": 'FORK' }),
    colPush: t({ en: 'LAST_PUSH', "pt-BR": 'ÚLTIMO_PUSH' }),
    noDescription: t({
      en: 'No description provided.',
      "pt-BR": 'Sem descrição.',
    }),
    commits: t({ en: 'commits', "pt-BR": 'commits' }),
    loading: t({
      en: '> fetching pinned repositories...',
      "pt-BR": '> buscando repositórios fixados...',
    }),
    error: t({
      en: 'ERR: could not reach the GitHub API — retry later',
      "pt-BR": 'ERR: não foi possível acessar a API do GitHub — tente mais tarde',
    }),
    source: t({
      en: 'source: github.com/nathancmiguel',
      "pt-BR": 'fonte: github.com/nathancmiguel',
    }),
  },
} satisfies Dictionary;

export default pinnedContent;
