import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
// import { motion } from "framer-motion";

export default function ScrollText() {
  const scroll = useScroll();
  const ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    const r = scroll.offset;
    const sections = ref.current?.children;
    if (!sections) return;

    [...sections].forEach((section, i) => {
      const el = section as HTMLDivElement;
      const start = i / 3;
      const end = (i + 1) / 3;
      const progress = (r - start) / (end - start);
      const clamped = Math.max(0, Math.min(1, progress));

      el.style.opacity = `${clamped}`;
      el.style.transform = `translateY(${50 * (1 - clamped)}px)`;
    });
  });

  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 w-screen h-[300vh] pointer-events-none"
    >
      <div className="h-screen flex items-center justify-center text-4xl font-bold transition-opacity duration-300">
        我是皮爸！
      </div>
      <div className="h-screen flex items-center justify-center text-4xl font-bold transition-opacity duration-300">
        這是一段描述，
      </div>
      <div className="h-screen flex items-center justify-center text-4xl font-bold transition-opacity duration-300">
        出現在模型滑動後。
      </div>
    </div>
  );
}
