interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  accentWord?: string
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered = true,
  accentWord,
}: SectionTitleProps) {
  const titleContent = accentWord
    ? title.split(accentWord).map((part, i, arr) =>
        i < arr.length - 1 ? (
          <span key={i}>
            {part}
            <span className="text-gradient">{accentWord}</span>
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )
    : title

  return (
    <div className={centered ? 'text-center' : ''}>
      {eyebrow && (
        <span className="mb-4 inline-block rounded-full border border-[#5BBF8A]/25 bg-[#5BBF8A]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#3a9e6c]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        {titleContent}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-5 h-0.5 w-16 rounded-full bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] ${centered ? 'mx-auto' : ''}`} />
    </div>
  )
}
