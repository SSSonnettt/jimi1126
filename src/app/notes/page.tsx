import Link from "next/link";
import { ScrollAnimate } from "@/components/shared/scroll-animate";
import { getBlogPosts } from "@/lib/blog";

export default async function NotesPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8 py-20">
      <ScrollAnimate>
        <p className="text-[10px] tracking-[0.2em] text-fg-tertiary mb-2">
          NOTES
        </p>
        <h1 className="text-[28px] md:text-[36px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground mb-4">
          笔记
        </h1>
        <p className="text-[14px] leading-[1.7] text-fg-secondary mb-12">
          技术分享与个人思考。
        </p>
      </ScrollAnimate>

      <div className="flex flex-col">
        {posts.map((post, i) => (
          <ScrollAnimate key={post.slug} delay={i * 0.05}>
            <Link
              href={`/notes/${post.slug}`}
              className="flex items-baseline justify-between border-b border-border py-4 hover:border-border-hi"
            >
              <span className="text-[14px] text-foreground">{post.title}</span>
              <span className="text-[11px] text-fg-tertiary shrink-0 ml-4">
                {post.date}
              </span>
            </Link>
          </ScrollAnimate>
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-[14px] text-fg-tertiary">还没有文章。</p>
      )}
    </div>
  );
}
