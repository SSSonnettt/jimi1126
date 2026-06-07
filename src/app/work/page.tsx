import { ExternalLink } from "lucide-react";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[960px] px-6 md:px-8 lg:px-12 py-20 md:py-24 xl:py-28 2xl:py-32">
      <ScrollAnimate>
        <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-2">
          WORK
        </p>
        <h1 className="text-[24px] sm:text-[28px] lg:text-[36px] xl:text-[40px] 2xl:text-[44px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground mb-4">
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
                <span className="md:ml-3 mt-1 md:mt-0 block md:inline text-[11px] text-fg-tertiary">
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
