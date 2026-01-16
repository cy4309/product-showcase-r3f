import Scene from "@/components/Scene";
import HeroSequence from "@/components/HeroSequence";
import Section from "@/components/Section"; // 共用的 sticky + 300 vh wrapper
import { Canvas } from "@react-three/fiber";
import PigsModel from "@/components/PigsModel";
import CameraLights from "@/components/CameraLights";
import { useEffect, useRef, useState } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "gsap";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

const macbookVariants = [
  {
    key: "2",
    label: "尺寸",
    // title: "14 吋機型",
    desc: "尺寸。 14 吋機型可配備 M5、M4 Pro 或 M4 Max 晶片；16 吋機型可配備 M4 Pro 或 M4 Max 晶片。",
    image: "/assets/mbp-2.jpg",
  },
  {
    key: "3",
    label: "顏色",
    // title: "顏色",
    desc: "顏色。 備有兩款亮眼外觀。現在展示的是銀色 MacBook Pro。",
    image: "/assets/mbp-3.jpg",
  },
  {
    key: "4",
    label: "顯示器",
    // title: "顯示器",
    desc: "顯示器。 明亮出色的 Liquid Retina XDR 顯示器，最高可達 1600 尼特 HDR 峰值亮度與 1,000,000:1 對比度，呈現令人驚豔的視覺效果，暗部黑得深邃，亮部鮮亮搶眼。",
    image: "/assets/mbp-4.webp",
  },
];

const Home: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  /* ---------- variants state ---------- */
  const [activeIndex, setActiveIndex] = useState(0);
  // const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [uiIndex, setUiIndex] = useState<number | null>(null);
  const isAnimatingRef = useRef(false);
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === macbookVariants.length - 1;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const STOP_TIME = 1.85; // ← 你之後會微調這個

    video.currentTime = 0;
    video.play();

    const onTimeUpdate = () => {
      if (video.currentTime >= STOP_TIME) {
        video.pause();
        video.currentTime = STOP_TIME;
        video.removeEventListener("timeupdate", onTimeUpdate);
        setVideoReady(true);
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  useGsap(
    (gsap) => {
      // ① 一開始就 set 狀態（只跑一次）
      gsap.set(".macbook-text", {
        opacity: 0,
        y: 24,
      });

      if (!videoReady) return;

      // ② 影片完成後才 animate
      gsap.to(".macbook-text", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
      });
    },
    [videoReady]
  );

  /* ---------- core animation (Apple style overlap) ---------- */
  const animateToIndex = (nextIndex: number) => {
    if (isAnimatingRef.current) return;
    if (nextIndex === activeIndex) return;

    isAnimatingRef.current = true;
    setUiIndex(nextIndex); // 🔥 立刻更新 UI
    setIncomingIndex(nextIndex);

    const direction = nextIndex > activeIndex ? 1 : -1;

    // incoming 起始位置
    gsap.set(".variant-media-incoming", {
      x: 24 * direction,
      opacity: 1,
      // x: 0,
      // scale: 1, // ← 滑進來同時回到正常尺寸
      // duration: 0.35,
      // ease: "power2.out",
    });
    gsap.set(".variant-copy-incoming", {
      x: 16 * direction,
      opacity: 1,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setActiveIndex(nextIndex);
        setIncomingIndex(null);
        isAnimatingRef.current = false;
      },
    });

    // current 退場
    tl.to(
      ".variant-media-current",
      {
        x: -24 * direction,
        opacity: 0,
        duration: 0.35,
      },
      0
    );

    tl.to(
      ".variant-copy-current",
      {
        x: -16 * direction,
        opacity: 0,
        duration: 0.3,
      },
      0.02
    );

    // incoming 提前進場（交疊）
    tl.to(
      ".variant-media-incoming",
      {
        x: 0,
        opacity: 1,
        duration: 0.35,
      },
      0.08
    );

    tl.to(
      ".variant-copy-incoming",
      {
        x: 0,
        opacity: 1,
        duration: 0.3,
      },
      0.12
    );
  };

  const handleNext = () => {
    if (!isLast) animateToIndex(activeIndex + 1);
  };

  const handlePrev = () => {
    if (!isFirst) animateToIndex(activeIndex - 1);
  };

  /* ---------- button styles ---------- */
  const idleBtn =
    "px-4 py-2 rounded-full text-sm font-medium " +
    "border border-white/40 text-white/70 " +
    "scale-90 opacity-80 transition-all duration-200";

  const activeBtn =
    "px-5 py-2.5 rounded-full text-sm font-semibold " +
    "bg-white text-black scale-100 cursor-default max-w-[250px]";

  return (
    <>
      <Section id="macbook" className="min-h-dvh bg-black">
        <div className="relative mx-auto aspect-[16/9] w-full max-w-screen-xl md:aspect-[16/9] sm:aspect-[4/3] hero">
          <video
            ref={videoRef}
            src="/assets/macbook.mp4"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
        <p className="macbook-text text-xl font-bold text-white">MacBook Pro</p>
        <p className="macbook-text text-6xl font-bold text-mask">14 吋機型，</p>
        <p className="macbook-text text-6xl font-bold text-mask">
          超強驅動現來自 M5。
        </p>
      </Section>

      <Section id="macbook-variants" className="bg-black text-white min-h-dvh">
        <div className="variant-stage flex flex-col items-center relative">
          {/* media */}
          <div className="variant-media relative max-w-screen-lg aspect-[4/3] min-h-[640px] overflow-hidden">
            {/* current */}
            <img
              // src={macbookVariants[activeIndex].image}
              src={
                uiIndex === null
                  ? "/assets/mbp-1.jpg"
                  : macbookVariants[activeIndex].image
              }
              className="variant-media-current w-full h-full object-contain absolute inset-0 z-10"
              draggable={false}
            />

            {/* incoming（永遠存在，只是平常是隱藏的） */}
            <img
              src={
                incomingIndex !== null
                  ? macbookVariants[incomingIndex].image
                  : macbookVariants[activeIndex].image
              }
              className="
                variant-media-incoming
                absolute inset-0 w-full h-full object-contain
                pointer-events-none
                opacity-0 z-10
              "
              draggable={false}
            />
          </div>

          {/* copy */}
          <div className="variant-copy relative text-center mt-6 min-h-[64px]">
            {/* current */}
            <div className="variant-copy-current">
              {/* <h3 className="text-2xl font-semibold">
                {macbookVariants[activeIndex].title}
              </h3> */}
            </div>

            {/* incoming 永遠存在 */}
            <div className="variant-copy-incoming absolute inset-0 pointer-events-none opacity-0">
              {/* <h3 className="text-2xl font-semibold">
                {incomingIndex !== null
                  ? macbookVariants[incomingIndex].title
                  : macbookVariants[activeIndex].title}
              </h3> */}
            </div>
          </div>

          {/* controls */}
          <div className="variant-controls flex items-end gap-3 mt-8 absolute bottom-0">
            {/* {!isFirst && ( */}
            {uiIndex !== null && uiIndex > 0 && (
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-lg active:scale-90"
              >
                ←
              </button>
            )}
            {/* 中間 */}
            {uiIndex === null ? (
              // 尚未選擇 → 顯示所有尺寸
              macbookVariants.map((v, i) => (
                <button
                  key={v.key}
                  onClick={() => animateToIndex(i)}
                  className={idleBtn}
                >
                  {v.label}
                </button>
              ))
            ) : (
              // 已選擇 → 只顯示當前那顆
              <button className={activeBtn}>
                {macbookVariants[uiIndex].desc}
              </button>
            )}
            {/* {!isLast && ( */}
            {uiIndex !== null && uiIndex < macbookVariants.length - 1 && (
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-lg active:scale-90"
              >
                →
              </button>
            )}
          </div>
        </div>
      </Section>

      {/* <Section
        id="macbook-swiper"
        className="w-full min-h-dvh bg-black text-white"
      >
        <div className="px-4 pt-10 pb-14">
          <Swiper
            modules={[Pagination]}
            slidesPerView={2}
            spaceBetween={14}
            centeredSlides
            grabCursor
            resistanceRatio={0.85} // 手感更像「有阻尼」
            speed={450}
            pagination={{ clickable: true }}
          >
            {macbookSlides.map((s, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center gap-6">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full object-contain"
                    draggable={false}
                  />

                  <div className="text-center space-y-2 pb-6">
                    <h3 className="text-2xl font-semibold">{s.title}</h3>
                    <p className="text-sm text-white/70">{s.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style>
          {`
            #macbook-swiper .swiper-pagination-bullet {
              background: rgba(255,255,255,0.35);
              opacity: 1;
            }
            #macbook-swiper .swiper-pagination-bullet-active {
              background: rgba(255,255,255,0.85);
            }
          `}
        </style>
      </Section> */}

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
