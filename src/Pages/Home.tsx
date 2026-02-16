import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import TextCarousel from "../components/Home/TextCarousel";
import Divider from "../components/Divider";
import TrustedBy from "../components/Home/TrustedBy";
import Dev from "../components/Home/Dev";
import PlatformImpact from "../components/Home/PlatformImpact";

const Home = () => {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bgEl = bgRef.current;
    if (!bgEl) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    gsap.set(bgEl, {
      backgroundPosition: "0% 0%",
      x: -8,
      y: -6,
      scale: 1.08,
      rotate: -0.25,
      transformOrigin: "50% 50%",
    });

    // NOTE: Gradients don't tile seamlessly, so wrapping background-position creates
    // a visible seam at the repeat point. Use a yoyo drift instead for an infinite,
    // seamless loop.
    const posTween = gsap.to(bgEl, {
      duration: 34,
      backgroundPositionX: "100%",
      backgroundPositionY: "70%",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    const driftTween = gsap.to(bgEl, {
      duration: 28,
      x: 10,
      y: 8,
      scale: 1.11,
      rotate: 0.25,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      posTween.kill();
      driftTween.kill();
      gsap.killTweensOf(bgEl);
    };
  }, []);

  return (
    <div className="home_container">
      <div className="min-h-screen w-full bg-[#f8fafc] relative overflow-hidden">
        {/* Soft Morning Mist Background */}
        <div
          className=" absolute inset-0 z-0 home_oceanicBg"
          ref={bgRef}
          style={{
            backgroundImage: `
linear-gradient(135deg, 
  rgba(255,245,240,1) 0%, 
  rgba(255,175,140,0.62) 26%, 
  rgba(255,135,85,0.58) 56%, 
  rgba(255,120,60,0.55) 100%
),

  radial-gradient(circle at 18% 24%, rgba(255,255,255,0.62) 0%, transparent 54%),
  radial-gradient(circle at 78% 68%, rgba(254,98,29,0.38) 0%, transparent 66%),
  radial-gradient(circle at 42% 82%, rgba(255,160,120,0.32) 0%, transparent 74%),
  radial-gradient(circle at 55% 18%, rgba(254,98,29,0.22) 0%, transparent 72%),
  radial-gradient(circle at 8% 78%, rgba(255,255,255,0.28) 0%, transparent 70%)
`,
          }}
        />
        <div className="pt-7 z-1 relative">
          <Navbar />
        </div>

        <div className="relative z-1 ">
          <Hero />
        </div>
        <div className="relative z-1 mt-20">
          <TextCarousel />
        </div>
        <Divider />
        <div className="relative z-1 ">
          <TrustedBy />
        </div>

        <div className="relative z-1 ">
          <Dev />
        </div>

        <div className="relative z-1 ">
          <PlatformImpact />
        </div>
      </div>
    </div>
  );
};

export default Home;
