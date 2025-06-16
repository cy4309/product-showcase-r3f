import { useThree, useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

/** 在 offset > 0.75 時把相機 Z 從 8 → 2，形成 zoom-in 效果 */
export default function CameraRig() {
  const { camera } = useThree();
  const scroll = useScroll();

  useFrame(() => {
    const t = scroll.offset; // 0 → 1
    const start = 0.85; // 何時開始 zoom
    const p = THREE.MathUtils.clamp((t - start) / (1 - start), 0, 1);

    camera.position.z = THREE.MathUtils.lerp(8, 2, p);
    camera.updateProjectionMatrix();
  });

  return null;
}
