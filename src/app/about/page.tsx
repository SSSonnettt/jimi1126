import { ScrollAnimate } from "@/components/shared/scroll-animate";

const skills = [
  "TypeScript", "Vue 3", "React", "Next.js", "Nuxt",
  "Node.js", "Tailwind CSS", "Vite", "Webpack", "Git",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[960px] px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-28 xl:py-32 2xl:py-36">
      <ScrollAnimate>
        <h1 className="text-[32px] sm:text-[40px] lg:text-[56px] xl:text-[64px] 2xl:text-[72px] font-extralight tracking-[-0.03em] leading-[1.05] text-foreground mb-2">
          Sonnet
        </h1>

        <p className="text-[11px] tracking-[0.2em] text-fg-tertiary mb-10">
          AI 应用构建者
        </p>

        <div className="w-full h-px bg-border mb-10" />
      </ScrollAnimate>

      <div className="space-y-8">
        <ScrollAnimate delay={0.05}>
          <p className="text-[14px] xl:text-[15px] leading-[1.8] text-fg-secondary">
            一名 AI 应用构建者，为企业与个人提供软件开发与咨询服务。业余时间通过网络分享作品与心得，致力于帮助开发者提升专业技能。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.1}>
          <h2 className="text-[12px] font-normal text-fg-tertiary tracking-[0.2em] mb-3">
            经历
          </h2>
          <p className="text-[14px] xl:text-[15px] leading-[1.8] text-fg-secondary">
            2016 年毕业于一本院校，工学学位。自学 Java 入行，工作一段时间后被 JavaScript 吸引，恰逢前后端分离开发模式兴起，部门决定试点时第一个想到我，至此开启前端之路。从业多年多次担任前端项目负责人，主导过数据展示、开发平台、销售系统、管理系统、H5 应用等多个项目，带过团队，积累了管理与协作经验。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.15}>
          <h2 className="text-[12px] font-normal text-fg-tertiary tracking-[0.2em] mb-3">
            理念
          </h2>
          <p className="text-[14px] xl:text-[15px] leading-[1.8] text-fg-secondary">
            找准客户需求、解决问题永远是一位开发者的首位，其次是编写高质量、高可维护性的代码。为此热衷于实施前端工程化，不断学习设计模式和编程思想。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.2}>
          <h2 className="text-[12px] font-normal text-fg-tertiary tracking-[0.2em] mb-3">
            方向
          </h2>
          <p className="text-[14px] xl:text-[15px] leading-[1.8] text-fg-secondary">
            当前聚焦 AI 与 Web 的交汇地带。一直追求成为领域的专家，保持持续学习。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.25}>
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-fg-tertiary">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </div>
  );
}
