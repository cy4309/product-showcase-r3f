import { Canvas } from "@react-three/fiber";
import Scene from "@/components/Scene";

const Home: React.FC = () => {
  return (
    <>
      <div className="w-full h-[100dvh]">
        <Canvas shadows>
          <color attach="background" args={["#fff"]} />
          <Scene />
        </Canvas>
      </div>
    </>
  );
};

export default Home;
