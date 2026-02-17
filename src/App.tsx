import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Wordpress from "./Pages/Wordpress";
import Home from "./Pages/Home";
import TrustedByPage from "./Pages/TrustedBy";
import Shared from "./Pages/Shared";
import Cloud from "./Pages/Cloud";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      // gsap gives seconds, Lenis expects ms
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wordpress" element={<Wordpress />} />
      <Route path="/shared" element={<Shared />} />
      <Route path="/cloud" element={<Cloud />} />
      <Route path="/trusted-by" element={<TrustedByPage />} />
    </Routes>
  );
}

export default App;
