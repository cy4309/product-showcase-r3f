import { ScrollControls, Scroll } from "@react-three/drei";
import CameraLights from "@/components/CameraLights";
import Model from "@/components/Model";
import ScrollText from "@/components/ScrollText";
import CameraRig from "@/components/CameraRig";

export default function Scene() {
  return (
    <ScrollControls pages={5} damping={0.2}>
      <Scroll>
        <CameraLights />
        <Model />
        <CameraRig />
      </Scroll>

      <Scroll html>
        <ScrollText />
      </Scroll>
    </ScrollControls>
  );
}
