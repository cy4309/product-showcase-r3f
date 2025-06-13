import { PerspectiveCamera } from "@react-three/drei";

export default function CameraLights() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={4} castShadow />
    </>
  );
}
