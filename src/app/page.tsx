import Link from "next/link";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { getBlogPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8 py-20 md:py-28">
      <ScrollAnimate>
        <h1 className="text-[44px] md:text-[56px] font-extralight tracking-[-0.03em] leading-[1.05] text-foreground mb-2">
          Sonnet
        </h1>

        <div className="flex items-baseline justify-between mb-10">
          <p className="text-[11px] tracking-[0.2em] text-fg-tertiary shrink-0">
            AI 应用构建者
          </p>
          <p className="text-[12px] italic font-extralight tracking-[0.04em] text-fg-tertiary text-right ml-8">
            "真正的大师，永远都怀着一颗学徒的心。" —易
          </p>
        </div>

        <div className="w-full h-px bg-border mb-8" />

        <p className="text-[14px] leading-[1.8] text-fg-secondary mb-10">
          一名 AI 应用构建者，主攻 Web 领域的软件开发与 AI 应用落地。为企业与个人提供开发与咨询服务，同时在线上参与开源建设与知识分享。
        </p>

        <p className="text-[10px] tracking-[0.2em] text-fg-inactive mb-4">
          作品
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="aspect-[16/9] overflow-hidden mb-2 bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-[13px] text-foreground group-hover:text-fg-secondary">
                {project.title}
              </p>
              <p className="text-[11px] text-fg-tertiary mt-0.5">
                {project.description}
              </p>
            </a>
          ))}
        </div>

        <div className="w-full h-px bg-border mb-8" />

        {posts.length > 0 && (
          <>
            <p className="text-[10px] tracking-[0.2em] text-fg-inactive mb-4">
              笔记
            </p>
            <div className="flex flex-col">
              {posts.slice(0, 5).map((post) => (
                <Link
                  key={post.slug}
                  href={`/notes/${post.slug}`}
                  className="flex items-baseline justify-between border-b border-border py-3 hover:border-border-hi"
                >
                  <span className="text-[14px] text-foreground">{post.title}</span>
                  <span className="text-[11px] text-fg-tertiary shrink-0 ml-4">
                    {post.date}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/notes"
                className="text-[11px] text-fg-inactive hover:text-fg-tertiary"
              >
                查看全部笔记 →
              </Link>
            </div>
          </>
        )}
      </ScrollAnimate>
    </div>
  );
}
