import { useGLTF, PresentationControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

export default function PigsModel() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/naughty-pigs.glb");

  return (
    <PresentationControls
      global
      rotation={[0, 0, 0]}
      polar={[-Math.PI / 2, Math.PI / 2]}
      azimuth={[-Math.PI, Math.PI]}
    >
      <group ref={group} scale={5}>
        <primitive object={scene} />
      </group>
    </PresentationControls>
  );
}
