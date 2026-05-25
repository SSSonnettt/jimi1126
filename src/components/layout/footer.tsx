import Link from "next/link";
import { ExternalLink, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/services", label: "服务" },
  { href: "/projects", label: "作品" },
  { href: "/blog", label: "博客" },
  { href: "/contact", label: "联系" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">JIMI1126</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              前端开发工程师与开源建设者，为企业和个人提供软件开发与咨询服务。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">导航</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">社交</h3>
            <div className="flex gap-2">
              <a href="https://github.com/Jimi1126" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
              <a href="mailto:jimi1126_mid@163.com">
                <Button variant="ghost" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </a>
              <a href="https://weibo.com/jisheng189504559" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs text-muted-foreground">
          Copyright &copy; {new Date().getFullYear()} JIMI1126. All rights reserved.
        </p>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          桂ICP备2024026330号-1
        </a>
      </div>
    </footer>
  );
}
