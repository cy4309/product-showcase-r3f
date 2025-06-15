import { ScrollControls, Scroll } from "@react-three/drei";
import CameraLights from "@/components/CameraLights";
import Model from "@/components/Model";
import ScrollText from "@/components/ScrollText";

export default function Scene() {
  return (
    <ScrollControls pages={3} damping={0.2}>
      <Scroll>
        <CameraLights />
        <Model />
      </Scroll>

      <Scroll html>
        <ScrollText />
      </Scroll>
    </ScrollControls>
  );
}
