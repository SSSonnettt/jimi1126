export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    slug: "frontend-stack",
    title: "FrontEnd Stack",
    description: "前端开发知识体系与开发工具整理",
    image: "https://r2.jimi1126.cn/hotlink-ok/img/2024/09/5a07b3ba8c068e56eafc2e03d1d3f379.jpg",
    link: "https://front-end-stack.pages.dev/",
    tags: ["Vue", "知识库"],
  },
  {
    slug: "jimi-blog",
    title: "Jimi Blog",
    description: "基于 Nuxt 的个人博客，集成 SEO 和自动发布",
    image: "https://r2.jimi1126.cn/hotlink-ok/img/2024/09/05f59acacb734550b7786e16d89fdad2.jpg",
    link: "https://blog.jimi1126.cn",
    tags: ["Nuxt", "博客"],
  },
  {
    slug: "markdown-processor",
    title: "Markdown Processor",
    description: "通过插件方式实现 Markdown 编辑与 HTML 转换",
    image: "https://r2.jimi1126.cn/hotlink-ok/img/2024/09/a121447b3ba241938e5454b9fec52c87.jpg",
    link: "https://md.jimi1126.cn",
    tags: ["Markdown", "工具"],
  },
];
