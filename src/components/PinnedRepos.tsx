import type { CSSProperties } from "react";
import { useIntlayer, useLocale } from "react-intlayer";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { HudFrame } from "./ui/hud-frame";
import { usePinnedRepos } from "@/hooks/use-pinned-repos";
import { useInView } from "@/hooks/use-in-view";
import { useCountUp } from "@/hooks/use-count-up";
import { timeAgo, type LanguageShare, type PinnedRepo } from "@/utils/github-api";
import { langColor } from "@/utils/lang-colors";

const BAR_BLOCKS = 24;

// Colunas: PID | NAME | LANG | ★ | FORK | LAST_PUSH (as duas ultimas somem no mobile)
const ROW_GRID =
  "text-left grid grid-cols-[2.25rem_1fr_4.5rem_2.5rem] md:grid-cols-[3rem_1fr_6.5rem_3rem_3rem_7rem] items-center gap-x-3";

/** Distribui BAR_BLOCKS blocos entre as linguagens (metodo do maior resto). */
function toBlocks(shares: LanguageShare[]) {
  const raw = shares.map((share) => (share.percent / 100) * BAR_BLOCKS);
  const counts = raw.map(Math.floor);
  let missing = BAR_BLOCKS - counts.reduce((sum, value) => sum + value, 0);

  raw
    .map((value, index) => ({ index, rest: value - Math.floor(value) }))
    .sort((left, right) => right.rest - left.rest)
    .forEach(({ index }) => {
      if (missing > 0) {
        counts[index] += 1;
        missing -= 1;
      }
    });

  return shares.flatMap((share, index) => Array(counts[index]).fill(share.name) as string[]);
}

function LanguageBar({ shares, active }: { shares: LanguageShare[]; active: boolean }) {
  if (shares.length === 0) return null;
  const blocks = toBlocks(shares);
  const legend = shares.filter((share) => share.percent >= 1).slice(0, 4);

  return (
    <div className="flex flex-col gap-1.5 max-w-sm">
      <div className="flex gap-[2px]" aria-hidden>
        {blocks.map((name, index) => (
          <span
            key={index}
            className="lang-block h-2 flex-1"
            style={
              {
                backgroundColor: langColor(name),
                "--i": index,
                opacity: active ? 1 : 0,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
        {legend.map((share) => (
          <span key={share.name} className="flex items-center gap-1">
            <span className="inline-block size-1.5" style={{ backgroundColor: langColor(share.name) }} />
            {share.name} {Math.round(share.percent)}%
          </span>
        ))}
      </p>
    </div>
  );
}

function RepoRow({
  repo,
  index,
  active,
}: {
  repo: PinnedRepo;
  index: number;
  active: boolean;
}) {
  const { locale } = useLocale();
  const content = useIntlayer("pinned");
  const stars = useCountUp(repo.stars, active);
  const forks = useCountUp(repo.forks, active);
  const primary = repo.languageShares[0]?.name ?? repo.languages[0] ?? "—";

  return (
    <li className="reveal" style={{ "--i": index } as CSSProperties} data-visible={active}>
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/row relative flex flex-col gap-3 px-4 py-3 text-left outline-none transition-colors hover:bg-hud-fill/10 dark:hover:bg-hud-fill/5 focus-visible:bg-hud-fill/15"
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-0.5 bg-hud scale-y-0 transition-transform group-hover/row:scale-y-100 group-focus-visible/row:scale-y-100"
        />

        <div className={`${ROW_GRID} font-mono text-[12px]`}>
          <span className="text-neutral-400 dark:text-neutral-500">
            <span className="inline-block w-2 text-hud opacity-0 transition-opacity group-hover/row:opacity-100">
              &gt;
            </span>
            {String(index + 1).padStart(3, "0")}
          </span>

          <span className="flex min-w-0 items-center gap-1.5">
            {repo.isOrg && (
              <span className="hidden sm:inline truncate text-neutral-400 dark:text-neutral-500">
                {repo.owner}/
              </span>
            )}
            <span className="truncate font-bold text-neutral-800 dark:text-neutral-100 transition-colors group-hover/row:text-hud">
              {repo.name}
            </span>
            <ArrowUpRight className="size-3 shrink-0 text-hud opacity-0 -translate-x-1 transition-all group-hover/row:opacity-100 group-hover/row:translate-x-0" />
          </span>

          <span className="flex items-center gap-1.5 truncate text-neutral-600 dark:text-neutral-300">
            <span className="inline-block size-2 shrink-0" style={{ backgroundColor: langColor(primary) }} />
            <span className="truncate">{primary}</span>
          </span>

          <span className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300">
            <Star className="size-3 text-hud" />
            {stars}
          </span>

          <span className="hidden md:flex items-center gap-1 text-neutral-600 dark:text-neutral-300">
            <GitFork className="size-3 text-neutral-400" />
            {forks}
          </span>

          <span className="hidden md:block truncate text-neutral-500 dark:text-neutral-400">
            {repo.pushedAt ? timeAgo(repo.pushedAt, locale) : "—"}
          </span>
        </div>

        <div className="md:pl-[3.75rem] flex flex-col gap-2">
          <LanguageBar shares={repo.languageShares} active={active} />

          {/* Descricao: sempre visivel no mobile, expande no hover no desktop */}
          <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover/row:grid-rows-[1fr] group-focus-visible/row:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="pt-1 text-[12px] text-neutral-600 dark:text-neutral-400">
                {repo.description || content.noDescription.value}
              </p>
              <p className="pt-1 font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                {repo.commits} {content.commits.value}
                {repo.home ? ` · ${repo.home.replace(/^https?:\/\//, "")}` : ""}
              </p>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}

export default function PinnedRepos() {
  const content = useIntlayer("pinned");
  const { repos, status } = usePinnedRepos();
  const { ref, inView } = useInView<HTMLDivElement>();
  const active = inView && status === "ok";

  return (
    <HudFrame label="// SYS.PINNED" className="w-full">
      <Card ref={ref} className="hud-card paper-card w-full dark:bg-transparent dark:backdrop-blur-2xl gap-0 py-0">
        <CardHeader className="border-b dark:border-white/10 py-4">
          <CardTitle>
            <div className="flex items-center gap-x-2">
              <span className="inline-block size-2.5 border border-hud bg-hud-fill/30" />
              <span className="mono-label text-hud">{content.title}</span>
            </div>
          </CardTitle>
          <CardAction className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping bg-green-500/60" />
              <span className="relative inline-flex size-2 bg-green-500" />
            </span>
            <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
              {status === "ok" ? repos.length : "—"} {content.running}
            </span>
          </CardAction>
        </CardHeader>

        <CardContent className="px-0">
          <div
            className={`${ROW_GRID} px-4 py-2 border-b border-dashed dark:border-white/10 font-mono text-[10px] tracking-[0.18em] text-neutral-400 dark:text-neutral-500`}
          >
            <span className="pl-2">PID</span>
            <span>{content.colName}</span>
            <span>{content.colLang}</span>
            <span>★</span>
            <span className="hidden md:block">{content.colForks}</span>
            <span className="hidden md:block">{content.colPush}</span>
          </div>

          {status === "loading" && (
            <div className="flex flex-col gap-4 p-4">
              <p className="font-mono text-[12px] text-hud text-left">
                {content.loading}
                <span className="cursor-block" />
              </p>
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-full rounded-none" />
                  <Skeleton className="h-2.5 w-2/3 rounded-none" />
                </div>
              ))}
            </div>
          )}

          {status === "error" && (
            <p className="p-4 font-mono text-[12px] text-left text-red-500">{content.error}</p>
          )}

          {status === "ok" && (
            <ul className="divide-y divide-dashed divide-ink/15 dark:divide-white/10">
              {repos.map((repo, index) => (
                <RepoRow key={repo.fullName} repo={repo} index={index} active={active} />
              ))}
            </ul>
          )}
        </CardContent>

        <CardFooter className="justify-between border-t dark:border-white/10 bg-transparent py-3">
          <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
            {content.source}
          </span>
          <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
            api.kremilly.com
          </span>
        </CardFooter>
      </Card>
    </HudFrame>
  );
}
