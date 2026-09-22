import Image from "next/image";
import Link from "next/link";
import { StageBadge } from "@/components/chrome";
import { products } from "@/lib/products";

export function ProductCards({ headingLevel: Heading = "h3" }: { headingLevel?: "h2" | "h3" }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {products.map((product) => (
        <Link key={product.key} href={product.href} className="group overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-accentDim">
          <div className="flex h-40 items-center justify-center border-b border-line bg-bg/50 p-4">
            <Image {...product.image} alt={`${product.name} product artwork`} sizes="(min-width: 768px) 360px, 90vw" className="h-full w-full object-contain" />
          </div>
          <div className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Heading className="min-w-0 max-w-full break-words text-xl font-semibold text-ink">{product.name}</Heading>
              <StageBadge stage={product.stage} />
            </div>
            <p className="mt-3 text-base leading-relaxed text-mute">{product.tagline}</p>
            <span className="mt-4 inline-flex items-center gap-3 text-sm font-medium text-accent group-hover:text-accentHi">
              Explore <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
