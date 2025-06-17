import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsap(cb: (gsap: typeof import("gsap")) => () => void) {
  useLayoutEffect(() => {
    // @ts-ignore
    const ctx = gsap.context(() => cb(gsap));
    return () => ctx.revert(); // 元件卸載時自動 kill
  }, [cb]);
}
