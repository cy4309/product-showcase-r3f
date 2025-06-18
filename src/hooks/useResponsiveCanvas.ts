import { useRef, useLayoutEffect } from "react";

export function useResponsiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const cvs = canvasRef.current!;
    const update = () => {
      const { innerWidth: w, innerHeight: h, devicePixelRatio: dpr } = window;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
    };

    update(); // initial
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return canvasRef;
}
