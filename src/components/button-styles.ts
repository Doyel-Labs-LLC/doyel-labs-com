/**
 * Shared button styles. One source so the header pill, the modal trigger,
 * the form submit, and every link CTA look and behave the same.
 *
 * Primary: solid teal, white text (5.6:1 on teal). Hover darkens, so the
 * hover state always raises contrast. Secondary: ivory with a hairline.
 */
const base =
  "inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-full font-semibold leading-none transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-soft active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "border border-accent bg-accent text-white shadow-button hover:border-accentInk hover:bg-accentInk",
  secondary: "border border-line2 bg-surface text-ink shadow-[0_1px_2px_rgba(60,44,20,0.06)] hover:border-ink/40 hover:bg-surface2",
} as const;

const sizes = {
  regular: "h-12 px-6 text-[16px]",
  small: "h-10 px-5 text-[15px]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "regular"): string {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

/** Inline text link inside body copy. */
export const textLink =
  "font-medium text-accent underline decoration-accent/35 decoration-1 underline-offset-[5px] transition-colors hover:text-accentInk hover:decoration-accentInk";
