import { ScrollControls, Scroll } from "@react-three/drei";
import CameraLights from "@/components/CameraLights";
import Model from "@/components/Model";

export default function Scene() {
  return (
    <ScrollControls pages={2} damping={0.2}>
      <Scroll>
        <CameraLights />
        <Model />
      </Scroll>

      <Scroll html>
        <section className="absolute top-[100vh] w-screen px-10 text-3xl">
          <h1>我是皮爸</h1>
          <p className="text-lg">這是一段描述，出現在模型滑動後。</p>
        </section>
      </Scroll>
    </ScrollControls>
  );
}
