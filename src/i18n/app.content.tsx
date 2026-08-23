import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  schema: undefined,
  content: {
    title: t({
      en: "Nathan Miguel | Dev",
      "pt-BR": "Nathan Miguel | Dev",
    }),
    description: t({
      en: "Portfolio of Nathan Miguel, specialized in Software Development, backend and frontend. Check out my projects and dev logs.",
      "pt-BR": "Portfólio de Nathan Miguel, especializado em Desenvolvimento de Software and backend, frontend. Veja meus projetos e logs.",
    }),
  },
} satisfies Dictionary;

export default appContent;