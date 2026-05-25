import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/shared/scroll-animate";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-8 py-24 lg:py-32">
      <ScrollAnimate>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Hi, I&apos;m JIMI1126
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          一名前端开发工程师，为企业与个人提供软件开发与咨询服务。
          致力于工程化实践、开源社区建设与技术知识分享。
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/services"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hover:bg-primary/80"
            )}
          >
            了解我的服务 <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "hover:bg-muted"
            )}
          >
            联系我
          </Link>
        </div>
      </ScrollAnimate>
    </section>
  );
}
