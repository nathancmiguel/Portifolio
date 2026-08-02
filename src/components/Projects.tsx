import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Separator } from "./ui/separator";
import {
  Code2,
  ArrowRight,
  Layers,
  Database,
  Activity,
  ExternalLink,
} from "lucide-react";
import { useIntlayer } from "react-intlayer";

// ==========================================
// 1. Defina seus projetos aqui
// ==========================================
export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  tags: string[];

  // Informações para o Sidebar (Case Study)
  overview: string;
  architectureDetails: string;
  databaseDetails: string;
  metricDetails: string;
  link?: string;
};

export default function Projects() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const projectsContent = useIntlayer("projects");

  return (
    <>
      <Card className="w-full bg-neutral-100 dark:bg-transparent dark:backdrop-blur-2xl shadow-lg shadow-black/10 dark:shadow-yellow-700/10 rounded-xl">
        <CardHeader className="border-b dark:border-white/10">
          <CardTitle>
            <div className="flex items-center gap-x-2">
              <Code2 className="h-4 w-4 text-yellow-500" />
              <span className="text-[12px] font-bold tracking-[0.2em] text-yellow-500 uppercase">
                {projectsContent.title}
              </span>
            </div>
          </CardTitle>
          <CardAction className="flex justify-center">
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 tracking-wider">
              // CASE_STUDIES
            </span>
          </CardAction>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 py-3">
          {projectsContent.list.map((project) => (
            <button
              key={project.id.value}
              onClick={() => setSelectedProject(project)}
              className="group flex items-center justify-between p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-white/5 transition-all text-left"
            >
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-[16px] text-neutral-800 dark:text-neutral-200 group-hover:text-yellow-500 transition-colors font-mono">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag.value}
                      variant="outline"
                      className="rounded-md font-normal text-xs dark:border-white/20 dark:text-neutral-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-yellow-500 transition-colors group-hover:translate-x-1" />
            </button>
          ))}
        </CardContent>

        <div className="px-4">
          <Separator className="dark:bg-white/10" />
        </div>

        <CardFooter className="py-4 flex justify-between items-center bg-transparent border-none">
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
            {projectsContent.clickHint}
          </span>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono"></span>
        </CardFooter>
      </Card>

      <Sheet
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <SheetContent className="w-full sm:max-w-md overflow-y-auto border-l dark:border-white/10 dark:bg-neutral-950 p-0 flex flex-col">
          {selectedProject && (
            <>
              {/* Sidebar Header */}
              <SheetHeader className="p-6 border-b dark:border-white/10 sticky top-0 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md z-10 text-left">
                <SheetTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-yellow-500 text-sm font-mono tracking-wider">
                    <Code2 className="h-4 w-4" /> // CASE_STUDY
                  </div>
                </SheetTitle>
              </SheetHeader>

              {/* Sidebar Content */}
              <div className="p-6 flex flex-col gap-8 flex-1">
                <div>
                  <h2 className="text-2xl font-bold font-mono mb-2 dark:text-neutral-100">
                    {selectedProject.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {selectedProject.shortDescription}
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {/* System Overview */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs tracking-widest uppercase">
                      <Layers className="h-4 w-4" /> {projectsContent.systemOverview}
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {selectedProject.overview}
                    </p>
                  </div>

                  {/* Architecture & Routing */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs tracking-widest uppercase">
                      <Activity className="h-4 w-4" /> {projectsContent.architecture}
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {selectedProject.architectureDetails}
                    </p>
                  </div>

                  {/* Database & Queues */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-yellow-500 font-bold text-xs tracking-widest uppercase">
                      <Database className="h-4 w-4" /> {projectsContent.database}
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {selectedProject.databaseDetails}
                    </p>
                  </div>

                  {/* Engineering Metric Highlight */}
                  <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20">
                    <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500 font-bold text-xs tracking-widest uppercase mb-2">
                      <Activity className="h-4 w-4" /> {projectsContent.metric}
                    </div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      {selectedProject.metricDetails}
                    </p>
                  </div>

                  {/* Tech Stack Breakdown */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-neutral-400 tracking-widest uppercase">
                      {projectsContent.techStack}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag: any) => (
                        <Badge
                          key={tag.value}
                          variant="secondary"
                          className="rounded-md font-mono"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="p-6 border-t dark:border-white/10 mt-auto flex items-center justify-between bg-neutral-50 dark:bg-white/5">
                {selectedProject.link?.value ? (
                  <a
                    href={selectedProject.link.value}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-yellow-500 hover:text-yellow-600 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" /> {projectsContent.accessSystem}
                  </a>
                ) : (
                  <span className="text-sm text-neutral-400 italic">
                    {projectsContent.noLink}
                  </span>
                )}
                <span className="text-xs text-neutral-400 font-mono">
                  {projectsContent.close}
                </span>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
