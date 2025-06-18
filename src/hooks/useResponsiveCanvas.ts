import { useRef, useLayoutEffect } from "react";

export function useResponsiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const cvs = canvasRef.current!;

    /** 每當視窗尺寸或方向改變，就同步畫布解析度 */
    const update = () => {
      /* ❶ 不含捲動條的可視寬高 */
      const w = document.documentElement.clientWidth;
      const h = document.documentElement.clientHeight;

      /* ❷ 最多 2× DPR，避免 5K 螢幕爆顯存 */
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      /* ❸ 版面寬高——直接 100% 最安全 */
      cvs.style.width = "100%";
      cvs.style.height = "100%";

      /* ❹ 緩衝區像素 */
      cvs.width = w * dpr;
      cvs.height = h * dpr;
    };

    update(); // initial

    // ① 視窗大小改變
    window.addEventListener("resize", update, { passive: true });

    // ② 裝置方向改變（iOS Safari 有時僅觸發這個事件）
    window.addEventListener("orientationchange", update, { passive: true });

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return canvasRef;
}
