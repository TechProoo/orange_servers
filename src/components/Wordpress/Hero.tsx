import { useEffect, useState } from "react";
import Wheel from "../../assets/cloud_wheel.png";
import Hand from "../../assets/ChatGPT Image Feb 4, 2026, 01_33_43 PM.png";
import Button from "./Button";
import { motion } from "framer-motion";

const Hero = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Framer Motion variants (match your HTML layout order) ---
  const easeOut = [0.22, 1, 0.36, 1] as const;
  const easeInOut = [0.65, 0, 0.35, 1] as const;

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  const wheelIn = {
    hidden: { opacity: 0, scale: 0.9, rotate: -8, filter: "blur(8px)" },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: easeOut },
    },
  };

  const wheelFloat = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 2, 0],
      transition: { duration: 3.5, repeat: Infinity, ease: easeInOut },
    },
  };

  const handIn = {
    hidden: { opacity: 0, y: 26, scale: 0.98, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: easeOut },
    },
  };

  const handFloat = {
    animate: {
      y: [0, -8, 0],
      rotate: [0, -1.2, 0],
      transition: { duration: 4, repeat: Infinity, ease: easeInOut },
    },
  };

  return (
    <div className="">
      <motion.div
        className="hero_container w-full relative"
        style={{
          padding: isScrolled ? 0 : 40,
          transition: "0.5s ease",
          background: isScrolled ? "#fe621d" : "transparent",
        }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Grid background fades in softly */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: easeOut }}
          style={{
            backgroundImage: isScrolled
              ? "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)"
              : "linear-gradient(to right, #ff69336c 1px, transparent 1px), linear-gradient(to bottom, #ff69336c 1px, transparent 1px)",
            backgroundSize: "20px 30px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          }}
        />

        {/* Headline + copy + CTA (middle) */}
        <div
          style={{ margin: "70px 0 30px 0" }}
          className="h-100 w-full flex justify-center"
        >
          <motion.div
            className="md:w-11/12 m-auto text-center"
            variants={container}
          >
            <motion.h1
              className="sm:text-6xl text-3xl leading-tight m-auto text-center text-(--foreground) font-extrabold"
              variants={fadeUp}
            >
              Expert WordPress Management with{" "}
              <motion.span
                className={`${isScrolled ? "text-white" : "text-[#fe621d]"} inline-block text_style`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: easeOut, delay: 0.25 }}
              >
                Near-Zero Downtime
              </motion.span>
            </motion.h1>

            <motion.p className="" variants={fadeUp}>
              Let us manage your published WordPress site and keep your downtime
              close to zero. <br />
              Focus on growing your business while we handle the technical
              complexities.
            </motion.p>

            <motion.div
              style={{ margin: "20px 0" }}
              className="flex justify-center items-center"
              variants={fadeUp}
            >
              <Button />
            </motion.div>
          </motion.div>
        </div>

        {/* Visual block (bottom) */}
        <div className="sm:flex hidden des_cover justify-center items-center relative">
          <div>
            {/* Wheel: enters, then floats */}
            <motion.div
              className="cld_wheel"
              variants={wheelIn}
              {...wheelFloat}
              style={{ transformOrigin: "center" }}
            >
              <img src={Wheel} className="w-70" alt="" />
            </motion.div>

            {/* Hand: enters, then floats slightly slower */}
            <motion.div
              className="cld_hand"
              variants={handIn}
              {...handFloat}
              style={{ transformOrigin: "center" }}
            >
              <img src={Hand} className="w-150" alt="" />
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-2"
          style={{
            height: 140,
            background:
              "linear-gradient(to bottom, transparent, var(--background))",
            zIndex: 0,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
