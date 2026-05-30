import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { promises as fs } from "fs";
import path from "path";
import { getBlogPosts } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-[720px] px-4 md:px-8 py-20">
      <Link
        href="/notes"
        className="inline-flex items-center gap-1.5 text-[12px] text-fg-tertiary hover:text-fg-secondary mb-12"
      >
        <ArrowLeft className="h-3 w-3" /> 返回笔记
      </Link>
      <article>
        <header className="mb-8">
          <h1 className="text-[28px] md:text-[36px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <time className="text-[12px] text-fg-tertiary">{post.date}</time>
            {post.tags.map((tag) => (
              <span key={tag} className="text-[11px] text-fg-inactive">
                {tag}
              </span>
            ))}
          </div>
        </header>
        <RenderContent slug={slug} format={post.format} />
      </article>
    </div>
  );
}

async function RenderContent({
  slug,
  format,
}: {
  slug: string;
  format: "mdx" | "html";
}) {
  if (format === "html") {
    const filePath = path.join(process.cwd(), "src", "content", "blog", `${slug}.html`);
    const html = await fs.readFile(filePath, "utf-8");
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    return (
      <div
        className="prose-p:text-fg-secondary prose-p:leading-[1.7] prose-a:text-fg-secondary [&_img]:max-w-full"
        dangerouslySetInnerHTML={{
          __html: bodyMatch ? bodyMatch[1] : html,
        }}
      />
    );
  }

  const { default: PostContent } = await import(
    `@/content/blog/${slug}.mdx`
  );
  return <PostContent />;
}
