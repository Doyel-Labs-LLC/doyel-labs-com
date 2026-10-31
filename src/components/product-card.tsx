import type { Product } from "@/lib/products";

/**
 * The rich own-brand product card: a screenshot, a status pill, name,
 * tagline, and a short meta line. Shared by the homepage lineup and the
 * /work/ "in the lab" band so they stay identical.
 */
export function ProductCard({ p }: { p: Product }) {
  const pill = p.status === "Early Access" ? "bg-accent/10 text-accentDeep" : "bg-warmSoft text-care";
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${p.name} — open ${p.url.replace(/^https?:\/\//, "")}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-7 shadow-card transition-transform duration-300 ease-soft hover:-translate-y-1.5 hover:shadow-cardHover"
    >
      <div className={`prod-shot mb-6 ${p.contain ? "prod-shot--contain" : ""}`}>
        <img src={p.img} alt={p.alt} width={p.w} height={p.h} decoding="async" />
      </div>
      <span
        className={`mb-4 self-start rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-wide ${pill}`}
      >
        {p.status}
      </span>
      <h3 className="font-display text-[22px] font-medium leading-snug text-ink transition-colors group-hover:text-accentDeep">{p.name}</h3>
      <p className="mt-2 text-small text-mute">{p.tagline}</p>
      <p className="mt-auto pt-5 text-[13px] text-muted">{p.meta}</p>
    </a>
  );
}
