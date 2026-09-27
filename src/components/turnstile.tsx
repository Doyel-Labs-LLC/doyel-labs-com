"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

/**
 * Cloudflare Turnstile widget wrapper.
 *
 * Renders an interaction-only challenge. On success it hands the token
 * to `onToken`. The parent can call `reset()` through the ref after a
 * failed submit — tokens are single-use, so a retry with a spent token
 * would fail server-side.
 *
 * If `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is unset (local dev), the parent
 * renders nothing here and the server, outside production, skips the
 * check. In production the server fails closed.
 */
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
          appearance?: "always" | "execute" | "interaction-only";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (err: string) => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export type TurnstileHandle = { reset: () => void };

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

export const Turnstile = forwardRef<TurnstileHandle, { sitekey: string; onToken: (token: string) => void }>(
  function Turnstile({ sitekey, onToken }, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | null>(null);
    const onTokenRef = useRef(onToken);
    onTokenRef.current = onToken;

    useImperativeHandle(ref, () => ({
      reset() {
        onTokenRef.current("");
        if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current);
      },
    }));

    useEffect(() => {
      if (!sitekey || typeof window === "undefined") return;
      let cancelled = false;
      let poll: ReturnType<typeof setInterval> | null = null;

      function render() {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey,
          theme: "dark",
          appearance: "interaction-only",
          callback: (token: string) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(""),
          "error-callback": () => onTokenRef.current(""),
        });
      }

      if (window.turnstile) {
        render();
      } else if (!document.getElementById(SCRIPT_ID)) {
        const s = document.createElement("script");
        s.id = SCRIPT_ID;
        s.src = SCRIPT_SRC;
        s.async = true;
        s.defer = true;
        s.onload = render;
        document.head.appendChild(s);
      } else {
        poll = setInterval(() => {
          if (window.turnstile) {
            if (poll) clearInterval(poll);
            render();
          }
        }, 100);
      }

      return () => {
        cancelled = true;
        if (poll) clearInterval(poll);
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      };
    }, [sitekey]);

    return <div ref={containerRef} className="mt-2" />;
  },
);
