import { useEffect, useLayoutEffect, useRef, useState } from "react";

// No smooth / inertia scroll on this site (native scrolling only).
export const reduced = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Runs `fn` on scroll/resize, batched to one frame; updates directly while the tab is hidden (rAF is throttled there). */
function onScrollFrame(fn: () => void) {
  let raf = 0;
  const run = () => {
    raf = 0;
    fn();
  };
  const on = () => {
    if (document.hidden) run();
    else if (!raf) raf = requestAnimationFrame(run);
  };
  fn();
  addEventListener("scroll", on, { passive: true });
  addEventListener("resize", on);
  return () => {
    removeEventListener("scroll", on);
    removeEventListener("resize", on);
    cancelAnimationFrame(raf);
  };
}

/**
 * Writes the element's scroll progress to the CSS variable --p:
 * 0 when its top meets the viewport bottom, 1 when its bottom meets the viewport top.
 * With reduced motion --p is never written and CSS falls back to the resting state.
 */
export function useScrollVar<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    return onScrollFrame(() => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)));
      el.style.setProperty("--p", p.toFixed(4));
    });
  }, []);
  return ref;
}

/**
 * Progress through a pinned (sticky) scene: 0 when the tall wrapper's top hits the
 * viewport top, 1 when its bottom hits the viewport bottom. Returns the active
 * step for `steps` items and writes --sp (0..1) to the wrapper for CSS.
 */
export function usePinnedSteps<T extends HTMLElement>(steps: number) {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onScrollFrame(() => {
      const r = el.getBoundingClientRect();
      const span = r.height - innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      el.style.setProperty("--sp", p.toFixed(4));
      setActive(Math.min(steps - 1, Math.floor(p * steps)));
    });
  }, [steps]);
  return { ref, active };
}

/** Scroll so that step `i` of a pinned scene becomes active. */
export function scrollToStep(el: HTMLElement | null, i: number, steps: number) {
  if (!el) return;
  const span = el.offsetHeight - innerHeight;
  const top = el.getBoundingClientRect().top + scrollY + (span * (i + 0.5)) / steps;
  scrollTo({ top, behavior: reduced() ? "auto" : "smooth" });
}

/** True after the page has been scrolled past `y` px. */
export function useScrolled(y = 8) {
  const [s, setS] = useState(false);
  useEffect(() => onScrollFrame(() => setS(scrollY > y)), [y]);
  return s;
}
