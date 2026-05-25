interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {label && (
        <span className="text-xs font-medium tracking-widest text-primary uppercase">
          {label}
        </span>
      )}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
