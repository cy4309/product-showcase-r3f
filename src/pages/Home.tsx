import { Canvas } from "@react-three/fiber";
import Scene from "@/components/Scene";
import HeroSequence from "@/components/HeroSequence";

const Home: React.FC = () => {
  return (
    <>
      <div className="w-full h-[100dvh]">
        <Canvas shadows>
          {/* <color attach="background" args={["#fff"]} /> */}
          <Scene />
        </Canvas>

        <HeroSequence />
      </div>
    </>
  );
};

export default Home;
