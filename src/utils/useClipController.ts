import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { AnimationAction } from "three";
import { useEffect, useRef } from "react";
import type { ClipSection } from "@/types/enum";

/**
 * 通用的「offset → clip cross-fade」控制器
 */
export function useClipController(
  sections: ClipSection[],
  actions: Record<string, AnimationAction | undefined>,
  scroll: ReturnType<typeof useScroll>,
  onChange?: (sec: ClipSection) => void
) {
  const current = useRef<number>(-1);

  /* 先把所有 clip 啟動並設成 0 權重 */
  useEffect(() => {
    Object.values(actions).forEach((a) => {
      if (!a) return;
      a.play();
      a.enabled = true;
      a.setEffectiveWeight(0);
    });
  }, [actions]);

  useFrame(() => {
    const t = scroll.offset; // 0-1

    /* 找到屬於哪一段 */
    const idx = sections.findIndex((s) => t >= s.start && t < s.end);
    if (idx === -1 || idx === current.current) return;

    /* cross-fade 權重切換 */
    sections.forEach((s, i) => {
      const action = actions[s.name];
      if (!action) return;
      const targetWeight = i === idx ? 1 : 0;
      action.crossFadeTo(action, 0.5, false); // 自 crossFade 調整權重
      action.setEffectiveWeight(targetWeight);
    });
    current.current = idx;
    onChange?.(sections[idx]); // ← 通知外部
  });
}
