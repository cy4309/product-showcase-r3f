import Scene from "@/components/Scene";
import HeroSequence from "@/components/HeroSequence";
import Section from "@/components/Section"; // 共用的 sticky + 300 vh wrapper

const Home: React.FC = () => {
  return (
    <>
      <Section id="picbot" pin>
        <Scene />
      </Section>

      <Section id="text-dom">
        <div className="border min-h-screen flex flex-col items-center justify-center gap-4">
          <h2 className="text-4xl font-bold">純 DOM 區塊</h2>
          <p className="max-w-md text-center">
            這裡完全用 Tailwind RWD，手機直排、平板雙欄、桌機三欄都好調。
          </p>
        </div>
      </Section>

      <Section id="hero" pin>
        <HeroSequence />
      </Section>
    </>
  );
};

export default Home;
