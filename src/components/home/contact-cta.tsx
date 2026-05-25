import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ScrollAnimate } from "@/components/shared/scroll-animate";

export function ContactCTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <ScrollAnimate>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg leading-relaxed">
            JIMI1126 是一名<b>前端开发工程师</b>，主攻 <b>Web</b> 领域的软件开发。
            为企业或个人提供软件开发与咨询服务，同时参与开源社区建设与知识分享。
          </p>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 hover:bg-primary/80"
            )}
          >
            联系我
          </Link>
        </div>
      </ScrollAnimate>
    </section>
  );
}
