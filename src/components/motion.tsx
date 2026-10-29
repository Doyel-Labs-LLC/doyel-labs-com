"use client";

import { useEffect } from "react";

/**
 * Progressive motion for the marketing pages: scroll "paper folds", a
 * magnetic/tactile pointer, a 3D tilt on the hero photo, and dismissing
 * the branded preloader.
 *
 * All of it is enhancement. The page is fully visible and usable with no
 * JavaScript and with reduced motion — styles here are only ever set at
 * runtime (never server-rendered), so no public page emits a style
 * attribute and the strict CSP is untouched.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const preloader = document.getElementById("preloader");
    const lift = () => preloader?.classList.add("lift");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      lift();
      return;
    }

    const cleanups: Array<() => void> = [];

    // Lift the preloader shortly after load; a timer is the safety net.
    const onLoad = () => window.setTimeout(lift, 800);
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
    const safety = window.setTimeout(lift, 3000);
    cleanups.push(() => window.clearTimeout(safety));

    // Scroll folds.
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((el) => io.observe(el));
    const foldFallback = window.setTimeout(
      () => reveals.forEach((el) => el.classList.add("in")),
      2600,
    );
    cleanups.push(() => {
      io.disconnect();
      window.clearTimeout(foldFallback);
    });

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (fine) {
      // Magnetic controls.
      const magnets = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
      for (const el of magnets) {
        const move = (event: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = event.clientX - r.left - r.width / 2;
          const y = event.clientY - r.top - r.height / 2;
          el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
        };
        const leave = () => {
          el.style.transform = "";
        };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      }

      // Hero photo 3D tilt.
      const tilt = document.querySelector<HTMLElement>(".tilt");
      const scene = tilt?.parentElement;
      if (tilt && scene) {
        const move = (event: MouseEvent) => {
          const r = scene.getBoundingClientRect();
          const px = (event.clientX - r.left) / r.width - 0.5;
          const py = (event.clientY - r.top) / r.height - 0.5;
          tilt.style.transform = `rotateY(${(px * 7).toFixed(2)}deg) rotateX(${(-py * 7).toFixed(2)}deg)`;
        };
        const leave = () => {
          tilt.style.transform = "";
        };
        scene.addEventListener("mousemove", move);
        scene.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          scene.removeEventListener("mousemove", move);
          scene.removeEventListener("mouseleave", leave);
        });
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
