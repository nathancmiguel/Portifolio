import { t, type Dictionary } from 'intlayer';

const activityContent = {
  key: 'activity',
  schema: undefined,
  content: {
    label: t({ en: 'LIVE_ACTIVITY', "pt-BR": 'ATIVIDADE_AO_VIVO' }),
    push: t({ en: 'push', "pt-BR": 'push' }),
    create: t({ en: 'create', "pt-BR": 'criou' }),
    delete: t({ en: 'delete', "pt-BR": 'removeu' }),
    pr: t({ en: 'pull request', "pt-BR": 'pull request' }),
    issue: t({ en: 'issue', "pt-BR": 'issue' }),
    star: t({ en: 'starred', "pt-BR": 'favoritou' }),
    fork: t({ en: 'forked', "pt-BR": 'fez fork de' }),
    release: t({ en: 'release', "pt-BR": 'release' }),
    other: t({ en: 'event', "pt-BR": 'evento' }),
    empty: t({
      en: 'no recent public activity',
      "pt-BR": 'sem atividade pública recente',
    }),
  },
} satisfies Dictionary;

export default activityContent;
