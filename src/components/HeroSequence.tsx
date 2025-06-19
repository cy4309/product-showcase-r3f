import { useRef, useEffect, useState, useCallback } from "react";
import { useGsap } from "@/hooks/useGsap";
import { useResponsiveCanvas } from "@/hooks/useResponsiveCanvas";

const FRAME_COUNT = 65; // 0000‒0064

export default function HeroSequence() {
  const cvs = useResponsiveCanvas();
  const imgPool = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);
  const title1Ref = useRef<HTMLHeadingElement>(null); // AirPods Pro
  const title2Ref = useRef<HTMLHeadingElement>(null); // Ground breaking sound.
  const videoRef = useRef<HTMLVideoElement>(null);
  const linesWrapRef = useRef<HTMLDivElement>(null);

  /* ---------- 2-1. 預載所有圖片 ---------- */
  useEffect(() => {
    let loaded = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/sequence/${String(i).padStart(4, "0")}.png`;
      img.onload = () => {
        loaded++;
        if (loaded === FRAME_COUNT) setReady(true);
      };
      imgPool.current[i] = img;
    }
  }, []);

  /* ---------- 2-2. 把某一幀畫到 Canvas ---------- */
  const draw = useCallback((frame: number) => {
    // const cvs = canvasRef.current!;
    const ctx = cvs.current!.getContext("2d")!;
    const img = imgPool.current[frame];
    // const { width: vw, height: vh } = cvs.current!;
    // const scale = Math.max(vw / img.width, vh / img.height);
    // const dx = (vw - img.width * scale) / 2;
    // const dy = (vh - img.height * scale) / 2;
    // ctx.clearRect(0, 0, vw, vh);
    // ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale);
    ctx.clearRect(0, 0, cvs.current!.width, cvs.current!.height);
    ctx.drawImage(img, 0, 0, cvs.current!.width, cvs.current!.height);
  }, []);

  // const draw = useCallback(
  //   (frame: number) => {
  //     const ctx = cvs.current!.getContext("2d")!;
  //     const img = imgPool.current[frame];
  //     /* 用像素緩衝區大小（width / height）計算比例 */
  //     const vw = cvs.current!.width; // =>  CSS寬 × DPR
  //     const vh = cvs.current!.height; // =>  CSS高 × DPR
  //     // const scale = Math.max(vw / img.width, vh / img.height); // cover 效果
  //     const scale = Math.max(vw / img.width, vh / img.height) / 2; // cover 效果
  //     const dx = (vw - img.width * scale) / 2; // 置中
  //     const dy = (vh - img.height * scale) / 2;
  //     ctx.clearRect(0, 0, vw, vh);
  //     ctx.drawImage(img, dx, dy, img.width * scale, img.height * scale);
  //   },
  //   [cvs]
  // );

  /* ---------- 2-3. GSAP ScrollTrigger ---------- */
  useGsap(
    (gsap) => {
      if (!ready) return () => {};

      const playhead = { frame: 0 };
      // @ts-ignore
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cvs.current,
          start: "top top",
          end: `+=${window.innerHeight * 2}`,
          scrub: 0.5, // 慢半拍減少抖動
          pin: true,
        },
      });

      /* ② 影格播放 */
      tl.to(playhead, {
        frame: FRAME_COUNT - 1,
        snap: "frame", // 自動四捨五入成整數
        ease: "none",
        onUpdate: () => draw(playhead.frame),
      });

      /* ③ 標題切換
           – 前 40%：AirPods Pro
           – 後 40%：Groundbreaking sound. */
      tl.to(
        title1Ref.current,
        { opacity: 0, z: -40, duration: 0.2 },
        0.2 // 時間線進度 20%
      ).fromTo(
        title2Ref.current,
        { opacity: 0, z: 40 },
        { opacity: 1, z: 0, duration: 0.2 },
        0.4 // 時間線進度 40% 開始
      );

      tl.to(
        title2Ref.current, // ① Groundbreaking sound. 淡出
        { opacity: 0, z: -40, duration: 0.2 },
        0.7 // 時間線 70 % 開始
      ).fromTo(
        videoRef.current, // ② 影片淡入
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onStart: () => videoRef.current?.play(), // 自動播放
        },
        0.72 // 同步、稍微重疊
      );

      /* -- ① 文字依序滑入 (影片淡入後接續) -- */
      tl.from(
        // @ts-ignore
        gsap.utils.toArray<HTMLParagraphElement>(
          linesWrapRef.current!.querySelectorAll(".line")
        ),
        {
          opacity: 0,
          y: 50,
          stagger: 0.25, // 每行相隔 0.25 進場
          duration: 0.4,
          ease: "power3.out",
        },
        0.8 // 影片開始後不久
      );

      const onResize = () => draw(playhead.frame);
      window.addEventListener("resize", onResize);

      draw(0); // 先畫第一張

      return () => {
        tl.kill();
        // window.removeEventListener("resize", setCanvasSize);
        window.removeEventListener("resize", onResize);
      };
    },
    // @ts-ignore
    [ready, draw, cvs]
  );

  return (
    <>
      {/* Canvas：背景序列 */}
      <canvas ref={cvs} />

      {/* 文字層：絕對置中，pointer-events-none 免干擾滑動 */}
      <div className="-z-10 w-full pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center bg-black text-white">
        <h1
          ref={title1Ref}
          className="font-plex text-6xl md:text-9xl font-semibold"
        >
          AirPods Pro
        </h1>

        <h1
          ref={title2Ref}
          className="font-sans text-6xl md:text-8xl font-semibold tracking-tight opacity-0 absolute"
        >
          Ground breaking
          <br className="hidden sm:block" />
          sound.
        </h1>
      </div>

      {/* 影片層：起始透明 */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-0"
        src="/assets/large.mp4"
        playsInline
        muted
        preload="auto"
      />

      {/* ----- 文字層：新增 ----- */}
      <div
        ref={linesWrapRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-start"
      >
        <div className="space-y-6 max-w-xl px-6 text-left text-white">
          {[
            "Up to 2× more Active Noise Cancellation.", // 1
            "Adaptive Audio that tailors noise control to your environment.", // 2
            "Personalized Spatial Audio that immerses you in sound.", // 3
            "And a new end-to-end experience to test, aid, and help protect your hearing.", // 4
          ].map((txt, i) => (
            <p
              key={i}
              className="line text-xl md:text-3xl leading-snug font-medium"
            >
              {txt}
              <sup className="align-super text-xs opacity-60">{i + 1}</sup>
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
