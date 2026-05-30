import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8 pt-28 pb-24">
      <ScrollAnimate>
        <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-6">
          FRONTEND ENGINEER · SYSTEMS BUILDER
        </p>
        <h1 className="text-[32px] md:text-[40px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground mb-8">
          构建系统，不只是界面。
        </h1>

        <p className="text-[15px] leading-[1.8] text-fg-secondary mb-6">
          八年经验，跨越数据可视化、企业中后台、低代码平台。关注架构而非堆砌，追求约束与效率的平衡。
        </p>

        <p className="text-[15px] leading-[1.8] text-fg-secondary mb-14">
          2016 年毕业于一本院校，工学学位。自学 Java 入行，后被 JavaScript 吸引，恰逢前后端分离模式兴起，转型前端。从业多年多次担任前端项目负责人，主导过数据展示、开发平台、销售系统、管理系统、H5 应用等项目。
        </p>

        <div className="flex gap-10 mb-20">
          <div>
            <span className="block text-[32px] font-light text-foreground">8+</span>
            <span className="text-[10px] tracking-[0.15em] text-fg-tertiary">年经验</span>
          </div>
          <div>
            <span className="block text-[32px] font-light text-foreground">20+</span>
            <span className="text-[10px] tracking-[0.15em] text-fg-tertiary">项目</span>
          </div>
          <div>
            <span className="block text-[32px] font-light text-foreground">3</span>
            <span className="text-[10px] tracking-[0.15em] text-fg-tertiary">领域</span>
          </div>
        </div>
      </ScrollAnimate>

      <ScrollAnimate delay={0.05}>
        <h2 className="text-[11px] tracking-[0.2em] text-fg-tertiary mb-8">
          能力
        </h2>

        <h3 className="text-[16px] font-normal text-foreground mb-2">
          系统架构
        </h3>
        <p className="text-[14px] leading-[1.7] text-fg-tertiary mb-10">
          前端工程化 · 组件体系 · 微前端 · 构建工具链
        </p>

        <h3 className="text-[16px] font-normal text-foreground mb-2">
          界面开发
        </h3>
        <p className="text-[14px] leading-[1.7] text-fg-tertiary mb-10">
          Vue 3 · React · TypeScript · Three.js · 数据可视化
        </p>

        <h3 className="text-[16px] font-normal text-foreground mb-2">
          技术判断
        </h3>
        <p className="text-[14px] leading-[1.7] text-fg-tertiary mb-20">
          架构评审 · 性能诊断 · 技术选型 · 团队规范
        </p>
      </ScrollAnimate>

      <ScrollAnimate delay={0.1}>
        <h2 className="text-[11px] tracking-[0.2em] text-fg-tertiary mb-8">
          作品
        </h2>

        <div className="flex flex-col mb-2">
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
              <ExternalLink className="h-3.5 w-3.5 text-fg-inactive opacity-0 group-hover:opacity-100 shrink-0" />
            </a>
          ))}
        </div>

        <div className="mb-20 mt-4">
          <Link href="/work" className="text-[12px] text-fg-inactive hover:text-fg-tertiary">
            查看全部作品 →
          </Link>
        </div>
      </ScrollAnimate>

      <ScrollAnimate delay={0.15}>
        <h2 className="text-[11px] tracking-[0.2em] text-fg-tertiary mb-8">
          方向
        </h2>
        <p className="text-[15px] leading-[1.8] text-fg-secondary">
          当前聚焦 AI + 低代码 + Three.js 的交汇地带。追求成为前端领域的系统级思考者——不是比谁知道更多 API，而是比谁能理解更深层的约束。
        </p>
      </ScrollAnimate>
    </div>
  );
}
