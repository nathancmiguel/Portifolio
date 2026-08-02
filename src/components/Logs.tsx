import { Terminal } from "lucide-react";
import { Separator } from "./ui/separator";
import Github from "./Github";
import Projects from "./Projects";
import { useIntlayer } from "react-intlayer";

export default function Logs() {
    const logsContent = useIntlayer("logs")
    return (
        <section className="flex flex-col gap-y-1">
            <div className="flex gap-x-2 items-center px-4">
                <Terminal className="w-4 h-4 stroke-yellow-500 animate-pulse" />
                <h2 className="font-bold text-[16px] text-yellow-500">{logsContent.dev_log.value}</h2>
            </div>

            <Separator orientation="horizontal" />

            <div className="flex flex-col md:flex-row p-4 gap-4">
                <Github />
                <Projects />
            </div>
        </section>
    );
}
