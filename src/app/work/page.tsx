import { ExternalLink } from "lucide-react";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8 py-20">
      <ScrollAnimate>
        <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-2">
          WORK
        </p>
        <h1 className="text-[28px] md:text-[36px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground mb-4">
          精选作品
        </h1>
        <p className="text-[14px] leading-[1.7] text-fg-secondary mb-12">
          我参与和主导的项目。
        </p>
      </ScrollAnimate>

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <ScrollAnimate key={project.slug} delay={i * 0.05}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between border-b border-border py-4 hover:border-border-hi"
            >
              <div>
                <span className="text-[14px] text-foreground">
                  {project.title}
                </span>
                <span className="ml-3 text-[11px] text-fg-tertiary">
                  {project.tags.join(" · ")}
                </span>
              </div>
              <ExternalLink className="h-3 w-3 text-fg-inactive opacity-0 group-hover:opacity-100 shrink-0" />
            </a>
          </ScrollAnimate>
        ))}
      </div>
    </div>
  );
}
