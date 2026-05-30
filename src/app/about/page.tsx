import { ScrollAnimate } from "@/components/shared/scroll-animate";

const skills = [
  "TypeScript", "Vue 3", "React", "Next.js", "Nuxt",
  "Node.js", "Tailwind CSS", "Vite", "Webpack", "GSAP", "Three.js", "Git",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[960px] px-6 md:px-12 py-24">
      <ScrollAnimate>
        <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-2">
          ABOUT
        </p>
        <h1 className="text-[28px] md:text-[36px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground mb-12">
          JIMI1126
        </h1>
      </ScrollAnimate>

      <div className="space-y-10">
        <ScrollAnimate delay={0.05}>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary">
            一名前端开发工程师和开源建设者。2016 年毕业于一本院校，工学学位。
            自学 Java 入行，后被 JavaScript 吸引，恰逢前后端分离模式兴起，转型前端。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.1}>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary">
            从业多年多次担任前端项目负责人，主导过数据展示、开发平台、
            销售系统、管理系统、H5 应用等项目。
            为企业与个人提供软件开发与咨询服务。
          </p>
        </ScrollAnimate>

        <ScrollAnimate delay={0.15}>
          <p className="text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary">
            当前聚焦 AI + 低代码 + Three.js 的交汇地带。
            追求成为前端领域的系统级思考者——
            &ldquo;真正的大师永远都怀着一个学徒的心&rdquo;。
          </p>
        </ScrollAnimate>
      </div>

      <ScrollAnimate delay={0.2}>
        <div className="mt-12 pt-8 border-t border-border">
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
