import Image from "next/image";

/**
 * A small inline client badge — logo + name + link. Used everywhere a
 * real client is credited on the site. Grayscale by default, cyan on
 * hover, so it doesn't compete with the Doyel Labs brand.
 *
 * Requires explicit permission from the client to display their logo.
 * SteadFast Transportation Inc. is the owner's own company and has
 * granted permission on the record.
 */
export function ClientBadge({
  name,
  logo,
  url,
  size = 32,
}: {
  name: string;
  logo: string;
  url: string;
  size?: number;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 border border-line px-3 py-2 transition-colors duration-200 ease-soft hover:border-accentDim"
      aria-label={`${name} — visit their website`}
    >
      <Image
        src={logo}
        alt=""
        width={size}
        height={size}
        className="shrink-0"
      />
      <span className="text-[13px] font-medium text-ink group-hover:text-accentHi">
        {name}
      </span>
      <span
        className="text-accent transition-transform duration-200 ease-soft group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        ↗
      </span>
    </a>
  );
}
