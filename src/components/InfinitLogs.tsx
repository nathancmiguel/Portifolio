import { useEffect, useState } from "react";
import { useIntlayer, useLocale } from "react-intlayer";
import { fetchActivity, type ActivityEvent } from "@/utils/github-api";

type Labels = Record<"push" | "create" | "delete" | "pr" | "issue" | "star" | "fork" | "release" | "other", string>;

function describe(event: ActivityEvent, labels: Labels) {
  switch (event.type) {
    case "PushEvent":
      return {
        verb: labels.push,
        detail: [event.ref && `@${event.ref}`, event.sha].filter(Boolean).join(" · "),
      };
    case "CreateEvent":
      return { verb: labels.create, detail: event.refType ?? "" };
    case "DeleteEvent":
      return { verb: labels.delete, detail: event.refType ?? "" };
    case "PullRequestEvent":
      return { verb: labels.pr, detail: event.action ?? "" };
    case "IssuesEvent":
      return { verb: labels.issue, detail: event.action ?? "" };
    case "WatchEvent":
      return { verb: labels.star, detail: "" };
    case "ForkEvent":
      return { verb: labels.fork, detail: "" };
    case "ReleaseEvent":
      return { verb: labels.release, detail: event.action ?? "" };
    default:
      return { verb: labels.other, detail: event.type.replace("Event", "") };
  }
}

function formatStamp(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function LogLine({ event, labels }: { event: ActivityEvent; labels: Labels }) {
  const { locale } = useLocale();
  const { verb, detail } = describe(event, labels);

  return (
    <a
      href={`https://github.com/${event.repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex shrink-0 items-center gap-2 px-5 font-mono text-[11px] whitespace-nowrap text-neutral-500 dark:text-neutral-400 hover:text-hud transition-colors"
    >
      <span className="text-neutral-400 dark:text-neutral-600">[{formatStamp(event.createdAt, locale)}]</span>
      <span className="text-hud">{verb}</span>
      <span className="text-neutral-400 dark:text-neutral-600">→</span>
      <span className="text-neutral-800 dark:text-neutral-200">{event.repo}</span>
      {detail && <span>{detail}</span>}
      <span aria-hidden className="pl-3 text-neutral-300 dark:text-neutral-700">
        //
      </span>
    </a>
  );
}

export default function InfinitLogs() {
  const content = useIntlayer("activity");
  const [events, setEvents] = useState<ActivityEvent[] | null>(null);
  const labels: Labels = {
    push: content.push.value,
    create: content.create.value,
    delete: content.delete.value,
    pr: content.pr.value,
    issue: content.issue.value,
    star: content.star.value,
    fork: content.fork.value,
    release: content.release.value,
    other: content.other.value,
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchActivity(controller.signal)
      .then((data) => setEvents(data.slice(0, 15)))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setEvents([]);
      });

    return () => controller.abort();
  }, []);

  // Sem dados ainda (ou falha): nao ocupa espaco extra
  if (events === null) return null;

  return (
    <section
      aria-label={content.label.value}
      className="flex items-stretch border-y border-ink/25 dark:border-yellow-500/15 bg-paper-card/80 dark:bg-black/20 backdrop-blur-md"
    >
      <div className="flex shrink-0 items-center gap-2 border-r border-ink/25 dark:border-yellow-500/15 bg-ink dark:bg-transparent px-3 py-2">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping bg-hud-fill/70" />
          <span className="relative inline-flex size-1.5 bg-hud-fill" />
        </span>
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-yellow-400 dark:text-hud">
          tail -f
        </span>
      </div>

      {events.length === 0 ? (
        <p className="px-4 py-2 font-mono text-[11px] text-neutral-500">{content.empty}</p>
      ) : (
        <div className="marquee-mask relative min-w-0 flex-1 overflow-hidden py-2">
          <div className="marquee-track flex w-max">
            {/* Lista duplicada para o loop continuo; a copia fica escondida de leitores de tela */}
            {[0, 1].map((copy) => (
              <div key={copy} className="flex" aria-hidden={copy === 1}>
                {events.map((event) => (
                  <LogLine key={`${copy}-${event.id}`} event={event} labels={labels} />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
