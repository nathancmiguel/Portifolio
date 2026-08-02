import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Nathan Miguel | Software Development",
      "pt-BR": "Nathan Miguel | Desenvolvimento de Software",
    }),
    description: t({
      en: "Portfolio of Nathan Miguel, specialized in Software Development, backend and frontend. Check out my projects and dev logs.",
      "pt-BR": "Portfólio de Nathan Miguel, especializado em Desenvolvimento de Software, backend e frontend. Veja meus projetos e logs.",
    }),
  },
} satisfies Dictionary;

export default appContent;