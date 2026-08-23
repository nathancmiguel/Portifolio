import { t, type Dictionary } from 'intlayer';

const cardContent = {
  key: 'card',
  schema: undefined,
  content: {
    developer: t({
      en: 'Developer',
      "pt-BR": 'Desenvolvedor',
    }),
    location: t({
      en: 'Brazil, Anápolis, Goias',
      "pt-BR": 'Brasil, Anápolis, Goiás',
    }),
    description: t({
      en: 'Software Developer focused on creating efficient and scalable digital products. Specialized in building resilient APIs, data modeling, and high-performance graphics programming.',
      "pt-BR": 'Desenvolvedor de Software voltado para a criação de produtos digitais eficientes e escaláveis. Especializado na construção de APIs resilientes, modelagem de dados e programação gráfica de alta performance.',
    }),
    youtube: t({
      en: 'Programming and role-play channel',
      "pt-BR": 'Canal de programação e role-play',
    }),
    github: t({
      en: 'Check out my projects',
      "pt-BR": 'Confira meus projetos',
    }),
    linkedin: t({
      en: 'Connect with me on LinkedIn',
      "pt-BR": 'Conecte-se comigo no LinkedIn',
    }),
  }
} satisfies Dictionary;

export default cardContent;
