import Scene from "@/components/Scene";
import HeroSequence from "@/components/HeroSequence";
import Section from "@/components/Section"; // 共用的 sticky + 300 vh wrapper
import { Canvas } from "@react-three/fiber";
import PigsModel from "@/components/PigsModel";
import CameraLights from "@/components/CameraLights";

const Home: React.FC = () => {
  return (
    <>
      <Section id="picbot" pin>
        <Scene />
      </Section>

      <Section id="naughty-pigs" pin>
        <div className="w-full h-[60vh]">
          <Canvas shadows className="touch-none">
            {/* <ambientLight /> */}
            <CameraLights />
            <PigsModel />
          </Canvas>
        </div>
      </Section>

      <Section id="text-dom">
        <div className="border min-h-screen flex flex-col items-center justify-center gap-4">
          <h2 className="text-4xl font-bold">這塊DOM操控</h2>
          <p className="max-w-md text-center">上面模型使用2D圖轉3D模型AI。</p>
        </div>
      </Section>

      <Section id="hero" pin>
        <HeroSequence />
      </Section>
    </>
  );
};

export default Home;
