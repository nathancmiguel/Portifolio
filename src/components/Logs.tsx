import { Terminal } from "lucide-react";
import { Separator } from "./ui/separator";
import Github from "./Github";
import Projects from "./Projects";
import PinnedRepos from "./PinnedRepos";
import { useInView } from "@/hooks/use-in-view";
import { useIntlayer } from "react-intlayer";

export default function Logs() {
    const logsContent = useIntlayer("logs")
    const pinnedContent = useIntlayer("pinned")
    const { ref, inView } = useInView<HTMLDivElement>()
    return (
        <>
        <section className="flex flex-col gap-y-1">
            <div className="flex gap-x-2 items-center px-4">
                <Terminal className="w-4 h-4 stroke-hud animate-pulse" />
                <h2 className="font-bold text-[12px] text-left text-hud">{logsContent.dev_log.value}</h2>
            </div>

            <Separator orientation="horizontal" className="bg-ink/15 dark:bg-border" />

            <div ref={ref} data-visible={inView} className="reveal flex flex-col md:flex-row p-4 gap-6">
                <Github />
                <Projects />
            </div>
        </section>

        <section className="flex flex-col gap-y-1">
            <div className="flex gap-x-2 items-center px-4">
                <Terminal className="w-4 h-4 stroke-hud" />
                <h2 className="font-bold text-[12px] text-left text-hud">{pinnedContent.section}</h2>
            </div>

            <Separator orientation="horizontal" className="bg-ink/15 dark:bg-border" />

            <div className="p-4">
                <PinnedRepos />
            </div>
        </section>
        </>
    );
}
