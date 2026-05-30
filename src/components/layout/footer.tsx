export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[960px] items-center justify-between px-6 md:px-12 py-6 text-[11px] text-fg-inactive">
        <a href="mailto:jimi1126_mid@163.com" className="hover:text-fg-tertiary">
          jimi1126_mid@163.com
        </a>
        <a href="https://github.com/Jimi1126" target="_blank" rel="noopener noreferrer" className="hover:text-fg-tertiary">
          github.com/Jimi1126
        </a>
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-fg-tertiary">
          桂ICP备2024026330号-1
        </a>
      </div>
    </footer>
  );
}
