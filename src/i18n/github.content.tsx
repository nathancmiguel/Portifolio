import { t, type Dictionary } from 'intlayer';

const githubContent = {
  key: 'github',
  content: {
    title: t({
      en: 'GITHUB CONTRIBUTION GRAPH',
      "pt-BR": 'GRÁFICO DE CONTRIBUIÇÕES',
    }),
    less: t({
      en: 'Less',
      "pt-BR": 'Menos',
    }),
    more: t({
      en: 'More',
      "pt-BR": 'Mais',
    }),
    lastYear: t({
      en: 'LAST 365 DAYS',
      "pt-BR": 'ÚLTIMOS 365 DIAS',
    }),
    commits: t({
      en: 'commits',
      "pt-BR": 'commits',
    }),
    currentStreak: t({
      en: 'CURRENT STREAK',
      "pt-BR": 'STREAK ATUAL',
    }),
    activeDays: t({
      en: 'active days',
      "pt-BR": 'dias ativos',
    }),
  },
} satisfies Dictionary;

export default githubContent;
