import { ScrollControls, Scroll } from "@react-three/drei";
import CameraLights from "@/components/CameraLights";
import Model from "@/components/Model";
import ScrollText from "@/components/ScrollText";
import CameraRig from "@/components/CameraRig";
import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas shadows className="fixed inset-0 !w-screen !h-[100dvh]">
      {/* <color attach="background" args={["#fff"]} /> */}
      <ScrollControls
        pages={5}
        damping={0.2}
        // @ts-ignore
        scrollArea={document.body}
        // style={{
        //   overflow: "visible",
        // }}
      >
        <Scroll>
          <CameraLights />
          <Model />
          <CameraRig />
        </Scroll>

        <Scroll html>
          <ScrollText />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
