import { t, type Dictionary } from 'intlayer';

const navbarContent = {
  key: 'navbar',
  content: {
    about: t({
      en: "about",
      "pt-BR": "sobre",
    })
  },
} satisfies Dictionary;

export default navbarContent;
