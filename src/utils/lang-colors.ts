// Cores das linguagens, levemente dessaturadas para conviver com o amarelo do tema.
const LANG_COLORS: Record<string, string> = {
  "C++": "#d0648a",
  C: "#8a8a8a",
  "C#": "#6fae5a",
  Rust: "#d39b72",
  TypeScript: "#4f8ac9",
  JavaScript: "#e6d465",
  CSS: "#8a6bbf",
  HTML: "#d9694a",
  Shell: "#7fbf5a",
  CMake: "#cf5a6e",
  Nix: "#7e8fc9",
  Dockerfile: "#5a8a9a",
  HLSL: "#9a8ac9",
  Python: "#4f7ea8",
  Java: "#b07219",
  Lua: "#3a3a9a",
};

const FALLBACK = "#a3a3a3";

/** Cor local (ajustada ao tema) > cor oficial do GitHub > cinza. */
export function langColor(language: string, githubColor?: string | null) {
  return LANG_COLORS[language] ?? githubColor ?? FALLBACK;
}
