import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8">
      {/* Positioning */}
      <section className="pt-20 pb-24">
        <ScrollAnimate>
          <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-5">
            FRONTEND ENGINEER · SYSTEMS BUILDER
          </p>
          <h1 className="text-[28px] md:text-[36px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground mb-4">
            构建系统，<br />不只是界面。
          </h1>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary max-w-[480px] mb-8">
            八年经验，跨越数据可视化、企业中后台、低代码平台。
            关注架构而非堆砌，追求约束与效率的平衡。
          </p>
          <div className="flex gap-9 border-t border-border pt-6">
            <div>
              <span className="block text-[28px] font-light text-foreground">8+</span>
              <span className="text-[10px] tracking-[0.15em] text-fg-tertiary">年经验</span>
            </div>
            <div>
              <span className="block text-[28px] font-light text-foreground">20+</span>
              <span className="text-[10px] tracking-[0.15em] text-fg-tertiary">项目</span>
            </div>
            <div>
              <span className="block text-[28px] font-light text-foreground">3</span>
              <span className="text-[10px] tracking-[0.15em] text-fg-tertiary">领域</span>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Capability */}
      <section className="py-16 border-t border-border">
        <ScrollAnimate delay={0.05}>
          <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-6">
            CAPABILITY
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <h3 className="text-[15px] md:text-[16px] font-normal text-[#cccccc] mb-1.5">
                系统架构
              </h3>
              <p className="text-[12px] leading-[1.6] text-fg-tertiary">
                前端工程化 · 组件体系 · 微前端 · 构建工具链
              </p>
            </div>
            <div>
              <h3 className="text-[15px] md:text-[16px] font-normal text-[#cccccc] mb-1.5">
                界面开发
              </h3>
              <p className="text-[12px] leading-[1.6] text-fg-tertiary">
                Vue 3 · React · TypeScript · Three.js · 数据可视化
              </p>
            </div>
            <div>
              <h3 className="text-[15px] md:text-[16px] font-normal text-[#cccccc] mb-1.5">
                技术判断
              </h3>
              <p className="text-[12px] leading-[1.6] text-fg-tertiary">
                架构评审 · 性能诊断 · 技术选型 · 团队规范
              </p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Selected Work */}
      <section className="py-16 border-t border-border">
        <ScrollAnimate delay={0.1}>
          <div className="flex items-baseline justify-between mb-6">
            <p className="text-[10px] tracking-[0.2em] text-fg-tertiary">
              SELECTED WORK
            </p>
            <Link
              href="/work"
              className="text-[11px] text-fg-inactive hover:text-fg-tertiary"
            >
              全部 →
            </Link>
          </div>
          <div className="flex flex-col">
            {projects.slice(0, 3).map((project) => (
              <a
                key={project.slug}
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
            ))}
          </div>
        </ScrollAnimate>
      </section>

      {/* Direction */}
      <section className="py-16 border-t border-border">
        <ScrollAnimate delay={0.15}>
          <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-5">
            CURRENT DIRECTION
          </p>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary max-w-[480px]">
            当前聚焦 AI + 低代码 + Three.js 的交汇地带。
            追求成为前端领域的系统级思考者——
            不是比谁知道更多 API，而是比谁能理解更深层的约束。
          </p>
        </ScrollAnimate>
      </section>
    </div>
  );
}
