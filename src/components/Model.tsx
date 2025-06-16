import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useScroll, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { useClipController } from "@/utils/useClipController";
import type { ClipSection } from "@/types/enum";

/* 只改這裡就能重新編排動畫段落（0~1 為完整卷動長度） */
const CLIP_SECTIONS: ClipSection[] = [
  { name: "Default", start: 0.0, end: 0.1, bgColor: "#ffffff" },
  { name: "Bored", start: 0.1, end: 0.3, bgColor: "#a855f7" },
  { name: "Thinking", start: 0.3, end: 0.5, bgColor: "#4ade80" },
  { name: "Sad", start: 0.5, end: 0.75, bgColor: "#60a5fa" },
  { name: "Dance", start: 0.75, end: 1.0, bgColor: "#fb923c" },
];

export default function Model() {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const { scene, animations } = useGLTF(
    "/models/Robot_To_C_250415_02_noGlass.glb"
  );
  const { actions } = useAnimations(animations, group);

  /* ---------------- 背景色控制 ---------------- */
  const { scene: threeScene } = useThree();
  const bgColor = useRef(new THREE.Color("#ffffff"));
  const targetColor = useRef(new THREE.Color("#ffffff"));

  // 換段落時更新目標色
  useClipController(
    CLIP_SECTIONS,
    Object.fromEntries(
      Object.entries(actions).map(([k, v]) => [k, v ?? undefined])
    ),
    scroll,
    (sec) => {
      targetColor.current.set(sec.bgColor);
    }
  );

  useFrame(() => {
    const y = scroll.offset;
    if (group.current) {
      group.current.rotation.y = y * Math.PI * 2;
      group.current.position.z = THREE.MathUtils.lerp(0, 5, y);
      group.current.position.y = THREE.MathUtils.lerp(0, -1, y);

      /* 👉 額外：直接用 scale 讓大小差距更明顯 */
      const s = THREE.MathUtils.lerp(0.8, 1.8, y); // 也可以改成 0.5~2 之類
      group.current.scale.setScalar(s);

      /* 背景顏色 lerp */
      bgColor.current.lerp(targetColor.current, 0.05); // 0.05 = 平滑係數
      threeScene.background = bgColor.current;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}
