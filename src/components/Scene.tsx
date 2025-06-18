import { ScrollControls, Scroll } from "@react-three/drei";
import CameraLights from "@/components/CameraLights";
import Model from "@/components/Model";
import ScrollText from "@/components/ScrollText";
import CameraRig from "@/components/CameraRig";
import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas shadows className="fixed inset-0 !w-screen !h-screen">
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
    </Canvas>
  );
}

// import { useRef, useLayoutEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import Model from "@/components/Model";
// import CameraLights from "@/components/CameraLights";
// import CameraRig from "@/components/CameraRig";
// import type * as THREE from "three";

// gsap.registerPlugin(ScrollTrigger);

// export default function Scene() {
//   const group = useRef<THREE.Group>(null!);

//   useLayoutEffect(() => {
//     gsap.to(group.current.rotation, {
//       y: Math.PI * 2,
//       scrollTrigger: {
//         trigger: "#picbot", // 你的 <Section pin id="picbot">
//         start: "top top",
//         end: "+=300%",
//         scrub: true,
//         pin: true,
//       },
//       ease: "none",
//     });
//   }, []);

//   return (
//     <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
//       <ambientLight intensity={0.8} />
//       <group ref={group}>
//         <Model />
//         <CameraLights />
//         <CameraRig />
//       </group>
//     </Canvas>
//   );
// }
