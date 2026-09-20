"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget wrapper.
 *
 * Renders as an invisible / minimal-friction CAPTCHA. On successful
 * challenge, the widget posts a token to a hidden `cf-turnstile-response`
 * form field that the server then verifies with Turnstile's siteverify
 * endpoint.
 *
 * If `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is unset (e.g. local development),
 * the component renders nothing and the form still works — the server
 * simply skips token verification when neither the client nor the
 * secret are configured.
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
          "callback"?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (err: string) => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

export function Turnstile({
  sitekey,
  onToken,
}: {
  sitekey: string;
  onToken: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!sitekey || typeof window === "undefined") return;

    let cancelled = false;

    function render() {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey,
        theme: "dark",
        appearance: "interaction-only",
        callback: (token: string) => {
          onTokenRef.current(token);
        },
        "expired-callback": () => {
          onTokenRef.current("");
        },
        "error-callback": () => {
          onTokenRef.current("");
        },
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
      // Script is loading — wait for it.
      const t = setInterval(() => {
        if (window.turnstile) {
          clearInterval(t);
          render();
        }
      }, 100);
      return () => {
        cancelled = true;
        clearInterval(t);
      };
    }

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [sitekey]);

  return <div ref={containerRef} className="mt-2" aria-hidden="false" />;
}
