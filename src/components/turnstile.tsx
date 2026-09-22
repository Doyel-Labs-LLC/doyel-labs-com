"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        theme: "dark";
        size: "compact";
        appearance: "interaction-only";
        callback: (token: string) => void;
        "expired-callback": () => void;
        "error-callback": () => void;
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export type TurnstileHandle = { reset: () => void };

let scriptLoad: Promise<void> | undefined;

function loadScript() {
  if (window.turnstile) return Promise.resolve();
  if (scriptLoad) return scriptLoad;
  scriptLoad = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    const timeout = window.setTimeout(fail, 15000);
    function fail() {
      clearTimeout(timeout);
      script.remove();
      scriptLoad = undefined;
      reject(new Error("Verification could not load."));
    }
    script.onload = () => {
      clearTimeout(timeout);
      if (window.turnstile) resolve();
      else fail();
    };
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return scriptLoad;
}

export function Turnstile({ sitekey, onToken, ref }: {
  sitekey: string;
  onToken: (token: string) => void;
  ref?: Ref<TurnstileHandle>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<string | null>(null);
  const tokenCallback = useRef(onToken);
  const [error, setError] = useState(false);

  useEffect(() => { tokenCallback.current = onToken; }, [onToken]);

  // Tokens are single-use, even when the email request fails after verification.
  useImperativeHandle(ref, () => ({
    reset() {
      tokenCallback.current("");
      if (widgetRef.current !== null) window.turnstile?.reset(widgetRef.current);
    },
  }), []);

  useEffect(() => {
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      widgetRef.current = window.turnstile.render(containerRef.current, {
        sitekey,
        theme: "dark",
        size: "compact",
        appearance: "interaction-only",
        callback: (token) => { setError(false); tokenCallback.current(token); },
        "expired-callback": () => tokenCallback.current(""),
        "error-callback": () => { tokenCallback.current(""); setError(true); },
      });
    }).catch(() => {
      if (!cancelled) { tokenCallback.current(""); setError(true); }
    });
    return () => {
      cancelled = true;
      if (widgetRef.current !== null) {
        window.turnstile?.remove(widgetRef.current);
        widgetRef.current = null;
      }
    };
  }, [sitekey]);

  return (
    <div>
      <div ref={containerRef} />
      {error && <p role="alert" className="mt-2 text-sm text-fall">Verification could not complete. Refresh this page or use the direct email or phone option.</p>}
    </div>
  );
}
