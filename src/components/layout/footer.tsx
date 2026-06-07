import { VisitCounter } from "@/components/shared/visit-counter";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[960px] flex-col md:flex-row items-center justify-between gap-3 md:gap-0 px-6 md:px-8 lg:px-12 py-6 text-[11px] text-fg-inactive">
        <a href="mailto:jimi1126_mid@163.com" className="hover:text-fg-tertiary">
          jimi1126_mid@163.com
        </a>
        <a href="https://github.com/SSSonnettt" target="_blank" rel="noopener noreferrer" className="hover:text-fg-tertiary">
          github.com/SSSonnettt
        </a>
        <VisitCounter />
      </div>
    </footer>
  );
}
