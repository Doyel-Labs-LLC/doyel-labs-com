import Link from "next/link";
import type { MouseEventHandler } from "react";
import { contactHref, type ProjectType } from "@/lib/contact";

export function ContactLink({
  label = "Start a conversation",
  variant = "primary",
  size = "regular",
  projectType,
  onClick,
}: {
  label?: string;
  variant?: "primary" | "ghost";
  size?: "regular" | "small";
  projectType?: ProjectType;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link
      href={contactHref(projectType)}
      onClick={onClick}
      className={`inline-flex min-h-11 max-w-full items-center justify-center gap-3 rounded-lg border font-medium transition-colors ${
        variant === "primary"
          ? "border-accent bg-accent text-bg hover:border-accentHi hover:bg-accentHi"
          : "border-line2 text-ink hover:border-accent hover:bg-surface"
      } ${size === "small" ? "px-4 py-2 text-sm" : "px-5 py-3 text-base"}`}
    >
      <span className="min-w-0">{label}</span>
      <span aria-hidden="true" className="shrink-0">↗</span>
    </Link>
  );
}
