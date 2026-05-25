import { Code2, Smartphone, Globe, Layers, Wrench, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollStagger, ScrollStaggerItem } from "@/components/shared/scroll-animate";
import Link from "next/link";

const services = [
  { icon: Code2, title: "Web 应用开发", desc: "使用 React、Vue、Next.js 等现代框架构建高性能 Web 应用" },
  { icon: Smartphone, title: "移动端开发", desc: "响应式设计、H5 应用、小程序开发" },
  { icon: Globe, title: "网站设计与开发", desc: "个人品牌站、企业官网、营销落地页" },
  { icon: Layers, title: "前端工程化", desc: "CI/CD、自动化测试、性能优化、组件库建设" },
  { icon: Wrench, title: "技术咨询", desc: "架构评审、技术选型、代码审查、团队培训" },
  { icon: Palette, title: "UI 开发", desc: "设计系统搭建、像素级设计还原、微交互实现" },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <SectionHeading label="Services" title="服务内容" description="为企业与个人提供专业的前端开发与咨询服务" />
      <ScrollStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((svc) => (
          <ScrollStaggerItem key={svc.title}>
            <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <CardContent className="p-6">
                <svc.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg">{svc.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{svc.desc}</p>
              </CardContent>
            </Card>
          </ScrollStaggerItem>
        ))}
      </ScrollStagger>
      <div className="mt-12 text-center p-8 bg-secondary/50 rounded-lg">
        <h2 className="text-xl font-semibold">有项目想聊聊？</h2>
        <p className="mt-2 text-muted-foreground">无论是短期咨询还是长期合作，都欢迎联系。</p>
        <Link className={cn(buttonVariants({ size: "lg" }), "mt-4")} href="/contact">联系我</Link>
      </div>
    </div>
  );
}
