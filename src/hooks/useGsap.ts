import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// @ts-ignore
export function useGsap(cb: (gsap: typeof gsap) => void, deps: any[] = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => cb(gsap));
    return () => ctx.revert(); // 元件卸載時自動 kill
  }, deps);
}
