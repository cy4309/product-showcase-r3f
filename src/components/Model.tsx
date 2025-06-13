import { useGLTF, useScroll } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Model() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Robot_To_C_250415_02_noGlass.glb");
  const scroll = useScroll();

  useFrame(() => {
    const y = scroll.offset;
    if (group.current) {
      group.current.rotation.y = y * Math.PI * 2;
      group.current.position.z = THREE.MathUtils.lerp(5, 0, y);
      group.current.position.y = THREE.MathUtils.lerp(-1, 0, y);
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.2} />
    </group>
  );
}
