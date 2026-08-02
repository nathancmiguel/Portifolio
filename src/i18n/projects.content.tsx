import { t, type Dictionary } from 'intlayer';

const projectsContent = {
  key: 'projects',
  content: {
    title: t({ en: "FEATURED PROJECTS", "pt-BR": "PROJETOS EM DESTAQUE" }),
    clickHint: t({ en: "* Click card for full case study", "pt-BR": "* Clique no card para ver o estudo de caso" }),
    systemOverview: t({ en: "System Overview", "pt-BR": "Visão Geral do Sistema" }),
    architecture: t({ en: "Architecture & Routing", "pt-BR": "Arquitetura e Roteamento" }),
    database: t({ en: "Database & Queues", "pt-BR": "Banco de Dados e Filas" }),
    metric: t({ en: "Engineering Metric", "pt-BR": "Métrica de Engenharia" }),
    techStack: t({ en: "Tech Stack Breakdown", "pt-BR": "Tecnologias Utilizadas" }),
    accessSystem: t({ en: "Access System", "pt-BR": "Acessar Sistema" }),
    noLink: t({ en: "No public link", "pt-BR": "Nenhum link público" }),
    close: t({ en: "[ESC / Close]", "pt-BR": "[ESC / Fechar]" }),
    list: [
      {
        id: "labpoint-website",
        title: "Labpoint",
        shortDescription: t({
          en: "Website for managing SENAI laboratory reservations using the Spring Boot, Nuxt, and PostgreSQL stacks.",
          "pt-BR": "Site para gerenciar reservas de laboratório do SENAI usando as stacks Spring Boot, Nuxt e PostgreSQL."
        }),
        tags: ["Java 25", "Spring Boot 4", "Postgresql", "Nuxt 4"],
        overview: t({
          en: "Website for managing SENAI laboratory reservations.",
          "pt-BR": "Site para gerenciar reservas de laboratório do SENAI."
        }),
        architectureDetails: t({
          en: "Spring Boot API Gateway for authentication, authorization, and request routing.",
          "pt-BR": "Spring Boot API Gateway para autenticação, autorização e roteamento de requisições."
        }),
        databaseDetails: t({
          en: "PostgreSQL for data persistence and schema design following the Entity–Attribute–Value (EAV) model.",
          "pt-BR": "PostgreSQL para persistência de dados e design de esquema seguindo o modelo Entidade-Atributo-Valor (EAV)."
        }),
        metricDetails: t({
          en: "Average response latency around ~200ms.",
          "pt-BR": "Latência média de resposta em torno de ~200ms."
        }),
        link: "https://github.com/orgs/LabPointer/repositories",
      },
      {
        id: "runa-engine",
        title: "Runa Engine",
        shortDescription: t({
          en: "A low-level project for a graphics engine built in WebGPU.",
          "pt-BR": "Um projeto de baixo nível para uma engine gráfica construída em WebGPU."
        }),
        tags: ["C++", "SDL3", "WebGPU(dawn)", "WGSL"],
        overview: t({
          en: "A low-level project for a graphics engine for real-time rendering using C++.",
          "pt-BR": "Um projeto de baixo nível para uma engine gráfica focada em renderização em tempo real usando C++."
        }),
        architectureDetails: t({
          en: "The project uses C++ and SDL3 for window management and input handling with WebGPU(dawn) for graphics rendering.",
          "pt-BR": "O projeto usa C++ e SDL3 para gerenciamento de janelas e inputs, junto com WebGPU(dawn) para renderização."
        }),
        databaseDetails: t({
          en: "No database used in this project.",
          "pt-BR": "Nenhum banco de dados utilizado neste projeto."
        }),
        metricDetails: t({
          en: "Low ram and vram usage avoid of memory copy with smart pointer and arena allocator.",
          "pt-BR": "Baixo uso de RAM e VRAM, evitando cópias de memória através de smart pointers e arena allocators."
        }),
        link: "https://github.com/orgs/RunaEngine/repositories",
      },
      {
        id: "bangboo-bot",
        title: "Bangboo Bot",
        shortDescription: t({
          en: "Discord bot for managing a community server and avoid scam messages.",
          "pt-BR": "Bot do Discord para gerenciar um servidor comunitário e evitar mensagens de golpe (scam)."
        }),
        tags: ["Rust", "twilight-rs", "sqlite"],
        overview: t({
          en: "A Discord bot for managing a community server, create a welcome card with a user profile picture and avoid scam messages from self-bot.",
          "pt-BR": "Um bot do Discord para gerenciar uma comunidade, criar cards de boas-vindas com a foto do usuário e prevenir spam."
        }),
        architectureDetails: t({
          en: "Twilight-rs for Discord API, sqlite to store my personal server data.",
          "pt-BR": "Twilight-rs para comunicação com a API do Discord, sqlite para armazenar dados do meu servidor."
        }),
        databaseDetails: t({
          en: "SQLite for personal data storage.",
          "pt-BR": "SQLite para armazenamento de dados pessoais."
        }),
        metricDetails: t({
          en: "Reduce a lot of messages sended for the users, low latency and low resource usage.",
          "pt-BR": "Redução drástica no envio de mensagens de spam, com baixa latência e uso mínimo de recursos."
        }),
        link: "https://github.com/nathancmiguel/Bangboo",
      }
    ]
  },
} satisfies Dictionary;

export default projectsContent;
