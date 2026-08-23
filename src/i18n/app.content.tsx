import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  schema: undefined,
  content: {
    title: t({
      en: "Nathan Miguel | Dev | discloud.dev",
      "pt-BR": "Nathan Miguel | Dev | discloud.dev",
    }),
    description: t({
      en: "Portfolio of Nathan Miguel, specialized in Software Development, backend, frontend and discloud.dev. Check out my projects and dev logs.",
      "pt-BR": "Portfólio de Nathan Miguel, especializado em Desenvolvimento de Software, backend, frontend e discloud.dev. Veja meus projetos e logs.",
    }),
  },
} satisfies Dictionary;

export default appContent;