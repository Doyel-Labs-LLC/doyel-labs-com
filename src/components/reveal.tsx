"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-triggered reveal wrapper.
 *
 * Fades and lifts children into view when they cross the viewport
 * threshold. Uses IntersectionObserver so it works on every modern
 * browser without a runtime dependency.
 *
 * Automatically respects `prefers-reduced-motion` — in that case the
 * children render at full opacity from the start, with no transform.
 *
 * Usage:
 *   <Reveal><Section .../></Reveal>
 *   <Reveal delay={80}><Card .../></Reveal>
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  /** Milliseconds to wait after entering the viewport. */
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion — skip the animation entirely.
    if (typeof window !== "undefined" && window.matchMedia) {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mql.matches) {
        setReduced(true);
        setVisible(true);
        return;
      }
    }

    const el = ref.current;
    if (!el) return;

    // If the element is already in view when we mount, reveal immediately
    // (avoids flash-of-hidden-content for above-the-fold bands).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = reduced
    ? undefined
    : ({
        transitionDelay: `${delay}ms`,
      } as React.CSSProperties);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref as never}
      style={style}
      className={`reveal ${visible ? "reveal--in" : ""} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
