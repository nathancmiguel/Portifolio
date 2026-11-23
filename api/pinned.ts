// Funcao serverless (Vercel): busca os repositorios fixados via GitHub GraphQL.
// O token fica so no servidor (variavel de ambiente GITHUB_TOKEN).
// Sem imports em runtime de proposito: o `import type` some na compilacao.
import type { PinnedRepo } from "../src/utils/pinned-types.ts";

const GITHUB_USER = "nathancmiguel";
const GRAPHQL_URL = "https://api.github.com/graphql";

const QUERY = /* GraphQL */ `
  query PinnedRepos($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            nameWithOwner
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            pushedAt
            owner { login __typename }
            issues(states: OPEN) { totalCount }
            defaultBranchRef {
              target { ... on Commit { history { totalCount } } }
            }
            repositoryTopics(first: 10) { nodes { topic { name } } }
            languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
              totalSize
              edges { size node { name color } }
            }
          }
        }
      }
    }
  }
`;

type GraphQLRepo = {
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  pushedAt: string | null;
  owner: { login: string; __typename: "User" | "Organization" };
  issues: { totalCount: number };
  defaultBranchRef: { target: { history?: { totalCount: number } } } | null;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
  languages: {
    totalSize: number;
    edges: { size: number; node: { name: string; color: string | null } }[];
  };
};

type GraphQLResponse = {
  data?: { user: { pinnedItems: { nodes: GraphQLRepo[] } } | null };
  errors?: { message: string }[];
};

function toPinnedRepo(repo: GraphQLRepo): PinnedRepo {
  const { totalSize, edges } = repo.languages;

  return {
    name: repo.name,
    fullName: repo.nameWithOwner,
    owner: repo.owner.login,
    isOrg: repo.owner.__typename === "Organization",
    description: repo.description,
    url: repo.url,
    homepage: repo.homepageUrl || null,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    openIssues: repo.issues.totalCount,
    commits: repo.defaultBranchRef?.target.history?.totalCount ?? null,
    topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
    pushedAt: repo.pushedAt,
    languageShares:
      totalSize > 0
        ? edges.map((edge) => ({
            name: edge.node.name,
            percent: (edge.size / totalSize) * 100,
            color: edge.node.color,
          }))
        : [],
  };
}

export async function getPinnedRepos(token: string): Promise<PinnedRepo[]> {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-pinned-repos",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USER } }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL respondeu ${response.status}`);
  }

  const payload = (await response.json()) as GraphQLResponse;
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  const nodes = payload.data?.user?.pinnedItems.nodes ?? [];
  // `nodes` pode trazer objetos vazios se algum item fixado nao for repositorio
  return nodes.filter((node) => node && node.nameWithOwner).map(toPinnedRepo);
}

function json(body: unknown, status: number, cacheControl: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cacheControl,
    },
  });
}

export async function GET(): Promise<Response> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return json({ error: "GITHUB_TOKEN nao configurado" }, 500, "no-store");
  }

  try {
    const repos = await getPinnedRepos(token);
    // Cache na CDN da Vercel: 1h fresco, serve antigo por ate 1 dia enquanto revalida
    return json(repos, 200, "public, s-maxage=3600, stale-while-revalidate=86400");
  } catch (error) {
    console.error("[api/pinned]", error);
    return json({ error: "Falha ao consultar o GitHub" }, 502, "no-store");
  }
}
