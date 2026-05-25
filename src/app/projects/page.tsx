import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollStagger, ScrollStaggerItem } from "@/components/shared/scroll-animate";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
      <SectionHeading label="Projects" title="作品集" description="我参与和主导的项目" />
      <ScrollStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ScrollStaggerItem key={project.slug}>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="aspect-video overflow-hidden rounded-t-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-5 pt-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          </ScrollStaggerItem>
        ))}
      </ScrollStagger>
    </div>
  );
}
