import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useIntlayer } from "react-intlayer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "./ui/card";
import { PiPulse } from "react-icons/pi";
import { GitHubCalendar } from "react-github-calendar";
import { Separator } from "./ui/separator";
import { selectLastHalfYear } from "@/utils/github";

type GitHubContribution = {
  date: string;
  count: number;
  level: number;
};

type GitHubContributionsResponse = {
  contributions: GitHubContribution[];
};

function getCurrentStreak(contributions: GitHubContribution[]) {
  const orderedContributions = [...contributions].sort((left, right) =>
    left.date.localeCompare(right.date),
  );

  let streak = 0;

  for (let index = orderedContributions.length - 1; index >= 0; index -= 1) {
    const contribution = orderedContributions[index];

    if (contribution.count <= 0) {
      if (streak > 0) {
        break;
      }

      continue;
    }

    streak += 1;
  }

  return streak;
}

export default function Github() {
  const { theme } = useTheme();
  const githubContent = useIntlayer("github");
  const [stats, setStats] = useState({
    totalCount: 0,
    streak: 0,
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadStats() {
      try {
        const response = await fetch(
          "https://github-contributions-api.jogruber.de/v4/nathancmiguel?y=last",
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub contribution stats.");
        }

        const data = (await response.json()) as GitHubContributionsResponse;
        const totalCount = data.contributions.reduce(
          (sum, contribution) => sum + contribution.count,
          0,
        );

        setStats({
          totalCount,
          streak: getCurrentStreak(data.contributions),
          isLoading: false,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setStats({
          totalCount: 0,
          streak: 0,
          isLoading: false,
        });
      }
    }

    loadStats();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Card className="w-full bg-neutral-100 dark:bg-transparent dark:backdrop-blur-2xl shadow-lg shadow-black/10 dark:shadow-yellow-700/10">
      <CardHeader className="border-b">
        <CardTitle>
          <div className="flex items-center gap-x-2">
            <PiPulse className="h-4 w-4 fill-yellow-500" />
            <span className="text-[12px] font-bold tracking-[0.2em] text-yellow-500">
              {githubContent.title}
            </span>
          </div>
        </CardTitle>
        <CardAction className="flex justify-center">
          <a
            href="https://github.com/nathancmiguel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] text-yellow-500 hover:underline underline-offset-3"
          >
            @nathancmiguel
          </a>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-4 pb-6">
        <GitHubCalendar
          className="github-calendar"
          username="nathancmiguel"
          transformData={selectLastHalfYear}
          colorScheme={theme}
          theme={{
            light: ['transparent', '#fef08a', '#facc15', '#eab308', '#ca8a04'],
            dark: ['transparent', '#fef08a', '#facc15', '#eab308', '#ca8a04'],
          }}
          blockSize={12}
          blockMargin={8}
          blockRadius={4}
          fontSize={12}
          showTotalCount={false}
          showColorLegend={true}
          showMonthLabels={false}
          showWeekdayLabels={false}
          labels={{
            totalCount: "",
            legend: {
              less: githubContent.less.value,
              more: githubContent.more.value,
            },
          }}
        />

        <div className="w-full flex gap-x-4">
          <div className="w-full flex flex-col items-start px-4 py-3 bg-neutral-100 dark:bg-black/10 outline outline-black/10 dark:outline-yellow-400/15">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-600 dark:text-neutral-400">
              {githubContent.lastYear}
            </p>
            <p className="mt-1 text-[18px] font-bold leading-none text-yellow-500">
              {stats.isLoading
                ? "..."
                : `${stats.totalCount.toLocaleString("pt-BR")} ${githubContent.commits}`}
            </p>
          </div>

          <div className="w-full flex flex-col items-start px-4 py-3 bg-neutral-100 dark:bg-black/10 outline outline-black/10 dark:outline-yellow-400/15">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-600 dark:text-neutral-400">
              {githubContent.currentStreak}
            </p>
            <p className="mt-1 text-[18px] font-bold leading-none text-yellow-500">
              {stats.isLoading ? "..." : `${stats.streak} ${githubContent.activeDays}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
