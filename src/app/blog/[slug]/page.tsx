import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { promises as fs } from "fs";
import path from "path";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8 py-20">
      <Link
        className={cn(buttonVariants({ variant: "ghost" }), "mb-8 -ml-3")}
        href="/blog"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> 返回博客
      </Link>
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <time className="text-sm text-muted-foreground">{post.date}</time>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </header>
        <div>
          <PostContent />
        </div>
      </article>
    </div>
  );
}
