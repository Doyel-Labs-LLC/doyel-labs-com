import { createElement, type ReactNode } from "react";

/** Keep older page wrappers without hiding content or requiring hydration. */
export function Reveal({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return createElement(as, { className }, children);
}
