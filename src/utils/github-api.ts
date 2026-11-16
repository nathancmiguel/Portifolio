export const GITHUB_USER = "nathancmiguel";

const PINNED_URL = `https://api.kremilly.com/github?user=${GITHUB_USER}`;
const GITHUB_API = "https://api.github.com";
const CACHE_PREFIX = "gh-cache:";
const DEFAULT_TTL = 60 * 60 * 1000; // 1h

// ==========================================
// Tipos
// ==========================================
export type KremillyRepo = {
  name: string;
  description: string | null;
  url: string;
  home: string | null;
  stars: number;
  forks: number;
  issues: number;
  commits: number;
  languages: string[];
  tags: string[];
};

export type LanguageShare = {
  name: string;
  percent: number;
};

export type PinnedRepo = KremillyRepo & {
  owner: string;
  fullName: string;
  isOrg: boolean;
  languageShares: LanguageShare[];
  /** ISO date do ultimo push, ou null se o enriquecimento falhar */
  pushedAt: string | null;
};

export type ActivityEvent = {
  id: string;
  type: string;
  repo: string;
  createdAt: string;
  ref: string | null;
  sha: string | null;
  action: string | null;
  refType: string | null;
};

type RawEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    ref?: string | null;
    head?: string;
    action?: string;
    ref_type?: string;
  };
};

// ==========================================
// Cache em localStorage
// ==========================================
type CacheEntry<T> = { at: number; data: T };

function readCache<T>(key: string, ttl: number): T | null {
  try {
    const raw = window.localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - entry.at > ttl) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    const entry: CacheEntry<T> = { at: Date.now(), data };
    window.localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // quota cheia ou storage indisponivel: ignora
  }
}

export async function cachedFetch<T>(
  key: string,
  url: string,
  signal?: AbortSignal,
  ttl = DEFAULT_TTL,
): Promise<T> {
  const cached = readCache<T>(key, ttl);
  if (cached !== null) return cached;

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${url}`);
  }

  const data = (await response.json()) as T;
  writeCache(key, data);
  return data;
}

// ==========================================
// Repos pinados
// ==========================================
function parseFullName(url: string) {
  const [owner = "", name = ""] = new URL(url).pathname.split("/").filter(Boolean);
  return { owner, fullName: `${owner}/${name}` };
}

function evenShares(languages: string[]): LanguageShare[] {
  if (languages.length === 0) return [];
  const percent = 100 / languages.length;
  return languages.map((name) => ({ name, percent }));
}

function toShares(bytes: Record<string, number>): LanguageShare[] {
  const total = Object.values(bytes).reduce((sum, value) => sum + value, 0);
  if (total === 0) return [];
  return Object.entries(bytes)
    .map(([name, value]) => ({ name, percent: (value / total) * 100 }))
    .sort((left, right) => right.percent - left.percent);
}

async function enrichRepo(repo: KremillyRepo, signal?: AbortSignal): Promise<PinnedRepo> {
  const { owner, fullName } = parseFullName(repo.url);
  const base: PinnedRepo = {
    ...repo,
    owner,
    fullName,
    isOrg: owner.toLowerCase() !== GITHUB_USER.toLowerCase(),
    languageShares: evenShares(repo.languages),
    pushedAt: null,
  };

  const [languages, meta] = await Promise.allSettled([
    cachedFetch<Record<string, number>>(
      `langs:${fullName}`,
      `${GITHUB_API}/repos/${fullName}/languages`,
      signal,
    ),
    cachedFetch<{ pushed_at: string }>(
      `repo:${fullName}`,
      `${GITHUB_API}/repos/${fullName}`,
      signal,
    ),
  ]);

  if (languages.status === "fulfilled") {
    const shares = toShares(languages.value);
    if (shares.length > 0) base.languageShares = shares;
  }
  if (meta.status === "fulfilled") {
    base.pushedAt = meta.value.pushed_at ?? null;
  }

  return base;
}

export async function fetchPinnedRepos(signal?: AbortSignal): Promise<PinnedRepo[]> {
  const repos = await cachedFetch<KremillyRepo[]>("pinned", PINNED_URL, signal);
  return Promise.all(repos.map((repo) => enrichRepo(repo, signal)));
}

// ==========================================
// Atividade publica
// ==========================================
export async function fetchActivity(signal?: AbortSignal): Promise<ActivityEvent[]> {
  const raw = await cachedFetch<RawEvent[]>(
    "events",
    `${GITHUB_API}/users/${GITHUB_USER}/events/public?per_page=30`,
    signal,
    15 * 60 * 1000,
  );

  return raw
    .map((event) => ({
      id: event.id,
      type: event.type,
      repo: event.repo.name,
      createdAt: event.created_at,
      ref: event.payload.ref ? event.payload.ref.replace("refs/heads/", "") : null,
      sha: event.payload.head ? event.payload.head.slice(0, 7) : null,
      action: event.payload.action ?? null,
      refType: event.payload.ref_type ?? null,
    }))
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

// ==========================================
// Helpers
// ==========================================
export function timeAgo(iso: string, locale: string) {
  const seconds = Math.round((new Date(iso).getTime() - Date.now()) / 1000);
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto", style: "narrow" });
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) {
      return formatter.format(Math.round(seconds / size), unit);
    }
  }
  return formatter.format(seconds, "second");
}
