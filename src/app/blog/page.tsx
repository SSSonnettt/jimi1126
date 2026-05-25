import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollStagger, ScrollStaggerItem } from "@/components/shared/scroll-animate";
import { getBlogPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <SectionHeading label="Blog" title="博客" description="技术分享与个人思考" />
      <ScrollStagger className="mt-12 space-y-6">
        {posts.map((post) => (
          <ScrollStaggerItem key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <Card className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground">{post.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <time className="text-sm text-muted-foreground">{post.date}</time>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </ScrollStaggerItem>
        ))}
      </ScrollStagger>
      {posts.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">还没有文章，敬请期待。</p>
      )}
    </div>
  );
}
