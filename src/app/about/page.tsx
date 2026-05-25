import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { ExternalLink, Mail } from "lucide-react";
import Link from "next/link";

const skills = ["TypeScript", "Vue 3", "React", "Next.js", "Nuxt", "Node.js", "Tailwind CSS", "Vite", "Webpack", "GSAP", "Three.js", "Git"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <ScrollAnimate>
        <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">关于我</h1>
      </ScrollAnimate>

      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <ScrollAnimate delay={0.1}>
            <section>
              <h2 className="text-2xl font-semibold">JIMI1126</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                一名前端开发工程师和开源建设者。为企业或个人提供软件开发与咨询服务，
                帮助客户更好地开展业务。业余时间通过网络分享作品和心得，
                致力于帮助前端开发者们提升专业技能。
              </p>
            </section>
          </ScrollAnimate>

          <ScrollAnimate delay={0.2}>
            <section>
              <h2 className="text-xl font-semibold">工科背景 + 工作经历</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                2016 年毕业于一本院校，工学学位，自学 Java 入行。
                后被 JavaScript 吸引，恰逢前后端分离模式兴起，转型前端。
                从业多年多次担任前端项目负责人，主导过数据展示、开发平台、销售系统、管理系统、H5 应用等项目。
              </p>
            </section>
          </ScrollAnimate>

          <ScrollAnimate delay={0.3}>
            <section>
              <h2 className="text-xl font-semibold">最近在忙什么？</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                正在学习 AI、低代码和 Three.js。追求成为前端领域的专家——
                "真正的大师永远都怀着一个学徒的心"。
              </p>
            </section>
          </ScrollAnimate>

          <ScrollAnimate delay={0.4}>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </ScrollAnimate>
        </div>

        <div>
          <ScrollAnimate delay={0.2}>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="mx-auto h-24 w-24 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-2xl font-semibold">J</span>
                </div>
                <h2 className="text-center text-lg font-semibold">社交媒体</h2>
                <div className="flex justify-center gap-2">
                  <a href="https://github.com/Jimi1126" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a href="mailto:jimi1126_mid@163.com">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
                <Link className={cn(buttonVariants(), "w-full")} href="/contact">联系我</Link>
              </CardContent>
            </Card>
          </ScrollAnimate>
        </div>
      </div>
    </div>
  );
}
