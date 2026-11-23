import type { PinnedRepo } from "./pinned-types";

export type { LanguageShare, PinnedRepo } from "./pinned-types";

export const GITHUB_USER = "nathancmiguel";

// Funcao serverless (api/pinned.ts) que consulta o GitHub GraphQL com token
const PINNED_URL = "/api/pinned";
const GITHUB_API = "https://api.github.com";
const CACHE_PREFIX = "gh-cache:";
const DEFAULT_TTL = 60 * 60 * 1000; // 1h

// ==========================================
// Tipos
// ==========================================
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
export async function fetchPinnedRepos(signal?: AbortSignal): Promise<PinnedRepo[]> {
  // A CDN ja cacheia por 1h; o localStorage evita ate a ida a CDN em visitas repetidas
  return cachedFetch<PinnedRepo[]>("pinned:graphql", PINNED_URL, signal);
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
