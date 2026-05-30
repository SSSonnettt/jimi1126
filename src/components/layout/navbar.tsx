import Link from "next/link";

const links = [
  { href: "/work", label: "WORK" },
  { href: "/notes", label: "NOTES" },
  { href: "/about", label: "ABOUT" },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <nav className="mx-auto flex h-14 max-w-[960px] items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="text-[12px] font-normal tracking-[0.15em] text-foreground"
        >
          JIMI1126
        </Link>
        <div className="flex items-center gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] font-normal tracking-[0.15em] text-fg-tertiary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
