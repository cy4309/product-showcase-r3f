// import { useFrame } from "@react-three/fiber";
// import { useScroll } from "@react-three/drei";
import { useRef } from "react";
// import { motion } from "framer-motion";

export default function ScrollText() {
  const ref = useRef<HTMLDivElement>(null);
  // const scroll = useScroll();

  // useFrame(() => {
  //   const r = scroll.offset;
  //   const sections = ref.current?.children;
  //   if (!sections) return;

  //   [...sections].forEach((section, i) => {
  //     const el = section as HTMLDivElement;
  //     const start = i / 3;
  //     const end = (i + 1) / 3;
  //     const progress = (r - start) / (end - start);
  //     const clamped = Math.max(0, Math.min(1, progress));

  //     el.style.opacity = `${clamped}`;
  //     el.style.transform = `translateY(${50 * (1 - clamped)}px)`;
  //   });
  // });

  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 w-screen h-[500dvh] pointer-events-none"
    >
      <div className="border h-[100dvh] flex items-center justify-center text-4xl font-bold transition-opacity duration-300">
        開始嚕
      </div>
      <div className="border h-[100dvh] flex items-center justify-center text-4xl font-bold transition-opacity duration-300"></div>
      <div className="border h-[100dvh] flex items-center justify-center text-4xl font-bold transition-opacity duration-300"></div>
      <div className="border h-[100dvh] flex items-center justify-center text-4xl font-bold transition-opacity duration-300"></div>
      <div className="border h-[100dvh] flex items-center justify-center text-4xl font-bold transition-opacity duration-300">
        我是皮爸，我很皮嘿嘿
      </div>
    </div>
  );
}
