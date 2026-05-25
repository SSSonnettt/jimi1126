import { Handshake, Globe, PenLine, Podcast } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollStagger, ScrollStaggerItem } from "@/components/shared/scroll-animate";

const services = [
  { icon: Handshake, title: "软件开发", desc: "Web 应用 · 小程序 · 管理后台" },
  { icon: Globe, title: "技术咨询", desc: "架构设计 · 性能优化 · 前端工程化" },
  { icon: PenLine, title: "知识分享", desc: "技术博客 · 开源项目" },
  { icon: Podcast, title: "更多探索", desc: "播客 · 视频教程 · 社区建设" },
];

export function ServicesGrid() {
  return (
    <section className="bg-secondary/50 py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading label="Services" title="我能做什么" description="为企业与个人开发者提供全方位的技术服务" />
        <ScrollStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc) => (
            <ScrollStaggerItem key={svc.title}>
              <Card className="h-full border-0 shadow-none bg-transparent">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <svc.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold">{svc.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{svc.desc}</p>
                </CardContent>
              </Card>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
