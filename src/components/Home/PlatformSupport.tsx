import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import MotionGraphic from "../../assets/motion-graphic-6993aa0f6d2bafd319b6b2f6.mp4";

type Props = {
  id?: string;
  variant?: "standalone" | "inImpact";
};

const PlatformSupport = ({ id, variant = "standalone" }: Props) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.playbackRate = 0.5;
    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Autoplay may be blocked in some contexts; ignore.
      });
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const mediaEl = el.querySelector<HTMLElement>("[data-support-media]");
    const contentEl = el.querySelector<HTMLElement>("[data-support-content]");

    if (reduceMotion) {
      // Ensure final state without motion.
      if (mediaEl) gsap.set(mediaEl, { clearProps: "all" });
      if (contentEl) gsap.set(contentEl, { clearProps: "all" });
      return;
    }

    if (contentEl) gsap.set(contentEl, { opacity: 0, y: 26 });
    if (mediaEl)
      gsap.set(mediaEl, {
        opacity: 0,
        x: 34,
        y: 10,
        rotate: 1.25,
        scale: 0.98,
      });

    tlRef.current?.kill();
    tlRef.current = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tlRef.current
      .to(contentEl, { opacity: 1, y: 0, duration: 0.9 }, 0)
      .to(
        mediaEl,
        { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 1.05 },
        0.1,
      );

    floatTweenRef.current?.kill();
    if (mediaEl) {
      floatTweenRef.current = gsap.to(mediaEl, {
        y: "-=10",
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    return () => {
      floatTweenRef.current?.kill();
      floatTweenRef.current = null;

      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, []);

  return (
    <div
      ref={(node) => {
        sectionRef.current = node;
      }}
      id={variant === "standalone" ? id : undefined}
      className={
        "support" + (variant === "inImpact" ? " support--inImpact" : "")
      }
      aria-label="Platform support"
    >
      <div className="support__inner">
        <div className="support__grid">
          <div className="support__content" data-support-content>
            <div className="support__badge">Platform Support</div>

            <h2 className="support__title">
              on-demand{" "}
              <span className="support__titleItalic text_style">support</span>
              <br />
              for always-on teams
            </h2>

            <p className="support__sub">
              Get real help from real humans—plus docs, migration guidance, and
              best-practice recommendations—so your sites stay fast, secure, and
              online.
            </p>

            <div className="support__rule" aria-hidden="true" />

            <blockquote className="support__quote">
              “With OrangeServers, we’re not just hosting websites—we’re giving
              our team the confidence to ship faster and stay protected.”
            </blockquote>

            <div className="support__byline text_style">
              OrangeServers Platform Team
            </div>

            <a className="support__button" href="#">
              <span>Meet your platform</span>
              <span className="support__buttonIcon" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          <div className="support__media" data-support-media aria-hidden="true">
            <div className="support__frame">
              <video
                ref={videoRef}
                className="support__frameVideo"
                src={MotionGraphic}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedMetadata={(e) => {
                  e.currentTarget.playbackRate = 0.5;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSupport;
