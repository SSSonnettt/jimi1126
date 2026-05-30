import Link from "next/link";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { projects } from "@/lib/projects";

const skills = [
  "系统架构", "界面开发", "技术判断",
  "Vue 3", "React", "TypeScript", "Next.js", "Nuxt",
  "Node.js", "Tailwind CSS", "Vite", "Webpack", "Three.js", "Git",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8 py-20 md:py-28">
      <ScrollAnimate>
        <h1 className="text-[44px] md:text-[56px] font-extralight tracking-[-0.03em] leading-[1.05] text-foreground mb-2">
          构建系统<br />不只是界面
        </h1>

        <p className="text-[11px] tracking-[0.2em] text-fg-tertiary mb-10">
          FRONTEND ENGINEER · 8年 · 20+项目
        </p>

        <div className="w-full h-px bg-border mb-10" />

        <p className="text-[14px] leading-[1.8] text-fg-secondary mb-6">
          跨越数据可视化、企业中后台、低代码平台。关注架构而非堆砌，追求约束与效率的平衡。从业多年多次担任前端项目负责人，主导过数据展示、开发平台、销售系统、管理系统、H5 应用等项目。
        </p>

        <p className="text-[14px] leading-[1.8] text-fg-secondary mb-10">
          当前聚焦 AI + 低代码 + Three.js 的交汇。追求成为前端领域的系统级思考者——不是比谁知道更多 API，而是比谁能理解更深层的约束。
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-[11px] text-fg-tertiary border border-border px-2.5 py-1"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="w-full h-px bg-border mb-10" />

        <div className="flex flex-col">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between border-b border-border py-4 hover:border-border-hi"
            >
              <div>
                <span className="text-[15px] text-foreground">
                  {project.title}
                </span>
                <span className="ml-3 text-[12px] text-fg-tertiary">
                  {project.tags.join(" · ")}
                </span>
              </div>
              <span className="text-[11px] text-fg-inactive group-hover:text-fg-tertiary shrink-0 ml-4">
                →
              </span>
            </a>
          ))}
        </div>

        <div className="mt-4">
          <Link
            href="/work"
            className="text-[11px] text-fg-inactive hover:text-fg-tertiary"
          >
            查看全部作品 →
          </Link>
        </div>
      </ScrollAnimate>
    </div>
  );
}
