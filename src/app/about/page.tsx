import { ScrollAnimate } from "@/components/shared/scroll-animate";

const skills = [
  "TypeScript", "Vue 3", "React", "Next.js", "Nuxt",
  "Node.js", "Tailwind CSS", "Vite", "Webpack", "GSAP", "Three.js", "Git",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8 py-20 md:py-28">
      <ScrollAnimate>
        <h1 className="text-[44px] md:text-[56px] font-extralight tracking-[-0.03em] leading-[1.05] text-foreground mb-2">
          Sonnet
        </h1>
        <p className="text-[11px] tracking-[0.2em] text-fg-tertiary mb-10">
          FRONTEND ENGINEER
        </p>
        <div className="w-full h-px bg-border mb-10" />
      </ScrollAnimate>

      <div className="space-y-8">
        <ScrollAnimate delay={0.05}>
          <p className="text-[14px] leading-[1.8] text-fg-secondary">
            一名前端开发工程师和开源建设者，为企业或个人提供软件开发与咨询服务。业余时间通过网络分享作品和心得，致力于帮助前端开发者提升专业技能，关注身心健康，并有效管理情绪和精力。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.1}>
          <p className="text-[14px] leading-[1.8] text-fg-secondary">
            2016 年毕业于一本院校，工学学位。自学 Java 入行，工作一段时间后被 JavaScript 吸引，喜爱它的动态类型与弱类型特性，恰逢前后端分离开发模式兴起，当时项目组的前端问题也由我负责解决。当部门决定试点前后端分离时，第一个想到我，至此开启前端之路。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.15}>
          <p className="text-[14px] leading-[1.8] text-fg-secondary">
            从业多年多次担任前端项目负责人，主导前端项目的建设，项目类型包括数据展示、开发平台、销售系统、管理系统、H5 应用等。带过团队开发过多个项目，从中丰富了管理与团队协作经验。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.2}>
          <p className="text-[14px] leading-[1.8] text-fg-secondary">
            认为找准客户需求、解决问题永远是一位开发工程师的首位，其次是开发高质量、高可维护性的代码。为此热衷于实施前端工程化，不断学习设计模式和编程思想。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.25}>
          <p className="text-[14px] leading-[1.8] text-fg-secondary">
            当前聚焦 AI + 低代码 + Three.js 的交汇地带。一直追求成为前端领域的专家，保持持续学习。&ldquo;真正的大师永远都怀着一个学徒的心&rdquo;。
          </p>
        </ScrollAnimate>
      </div>

      <ScrollAnimate delay={0.3}>
        <div className="mt-14 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-fg-tertiary">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <div className="mt-8 flex gap-6 text-[12px] text-fg-inactive">
            <a href="https://github.com/Jimi1126" target="_blank" rel="noopener noreferrer" className="hover:text-fg-tertiary">
              GitHub
            </a>
            <a href="mailto:jimi1126_mid@163.com" className="hover:text-fg-tertiary">
              Email
            </a>
          </div>
        </div>
      </ScrollAnimate>
    </div>
  );
}
