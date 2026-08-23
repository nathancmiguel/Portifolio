import { t, type Dictionary } from 'intlayer';

const logsContent = {
  key: 'logs',
  schema: undefined,
  content: {
    dev_log: t({
        en: {
            value: 'DEV LOG & FEATURED SYSTEMS'
        },
        "pt-BR": {
            value: 'LOGS DE DESENVOLVIMENTO & SISTEMAS EM DESTAQUE'
        }
    }),
    
  },
} satisfies Dictionary;

export default logsContent;
