import type { MDXComponents } from "mdx/types";

export function useMDXComponents(): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-[24px] font-normal tracking-[-0.02em] leading-[1.15] text-foreground">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-[18px] font-normal text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-[16px] font-normal text-foreground">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="my-4 text-[14px] md:text-[15px] leading-[1.7] text-fg-secondary">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-fg-secondary underline underline-offset-4 hover:text-foreground"
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 text-[13px] font-mono text-fg-secondary">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto bg-surface p-4 text-[13px] font-mono text-fg-secondary leading-relaxed">
        {children}
      </pre>
    ),
    ul: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-1 text-[14px] leading-[1.7] text-fg-secondary">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-1 text-[14px] leading-[1.7] text-fg-secondary">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-[1.7]">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l border-border pl-4 text-fg-tertiary text-[14px]">
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        className="my-6 w-full max-w-[720px] h-auto"
      />
    ),
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto">
        <table className="w-full text-[14px] text-fg-secondary border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-border">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr className="border-b border-border">{children}</tr>,
    th: ({ children }) => (
      <th className="px-3 py-2 text-left font-normal text-fg-tertiary text-[12px]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2">{children}</td>
    ),
    del: ({ children }) => (
      <del className="opacity-50">{children}</del>
    ),
    input: ({ type, checked, disabled }) => (
      <input
        type={type}
        checked={checked}
        disabled={disabled}
        className="mr-2 accent-foreground"
        readOnly
      />
    ),
  };
}
