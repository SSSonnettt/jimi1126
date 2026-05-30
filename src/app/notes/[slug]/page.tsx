import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { promises as fs } from "fs";
import path from "path";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getBlogPosts } from "@/lib/blog";

const blogDir = path.join(process.cwd(), "content", "blog");

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

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
        {post.format === "html" ? (
          <HtmlContent slug={slug} />
        ) : (
          <MdxContent slug={slug} />
        )}
      </article>
    </div>
  );
}

async function MdxContent({ slug }: { slug: string }) {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  let PostContent: React.ComponentType;
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const evaluated = await evaluate(raw, {
      ...runtime,
      baseUrl: import.meta.url,
    });
    PostContent = evaluated.default;
  } catch {
    notFound();
  }
  return <PostContent />;
}

async function HtmlContent({ slug }: { slug: string }) {
  const filePath = path.join(blogDir, `${slug}.html`);
  let html: string;
  try {
    html = await fs.readFile(filePath, "utf-8");
  } catch {
    notFound();
  }

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const content = bodyMatch ? bodyMatch[1] : html;

  return (
    <div
      className="
        prose-headings:font-normal prose-headings:text-foreground prose-headings:tracking-[-0.02em]
        prose-p:text-fg-secondary prose-p:leading-[1.7]
        prose-a:text-fg-secondary prose-a:underline prose-a:hover:text-foreground
        prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[13px] prose-code:font-mono
        prose-pre:bg-surface prose-pre:text-[13px]
        prose-li:text-fg-secondary prose-li:leading-[1.7]
        prose-blockquote:border-l prose-blockquote:border-border prose-blockquote:text-fg-tertiary
        [&_img]:max-w-full
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
