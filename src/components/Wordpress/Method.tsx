import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type MethodItem = {
  key: string;
  leftLabel: string;
  title: string;
  description: ReactNode;
  phaseIndex?: number; // 0..3 for See/Think/Do/Care
};

const Method = () => {
  const reduceMotion = useReducedMotion();

  const easeOut = [0.16, 1, 0.3, 1] as const;
  const easeInOut = [0.45, 0, 0.55, 1] as const;

  const panelStagger = reduceMotion ? 0 : 0.08;
  const baseTransition = reduceMotion
    ? ({ duration: 0 } as const)
    : ({ duration: 0.65, ease: easeOut } as const);

  const panelContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: panelStagger,
        delayChildren: reduceMotion ? 0 : 0.04,
      },
    },
  } as const;

  const panelItem = {
    hidden: reduceMotion
      ? ({ opacity: 1, y: 0 } as const)
      : ({ opacity: 0, y: 18 } as const),
    show: {
      opacity: 1,
      y: 0,
      transition: baseTransition,
    },
  } as const;

  const mediaItem = {
    hidden: reduceMotion
      ? ({ opacity: 1, y: 0, scale: 1 } as const)
      : ({ opacity: 0, y: 16, scale: 0.985 } as const),
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reduceMotion
        ? ({ duration: 0 } as const)
        : ({ duration: 0.7, ease: easeOut } as const),
    },
  } as const;

  const items = useMemo<MethodItem[]>(
    () => [
      {
        key: "intro",
        leftLabel: "Our method",
        title: "See, Think, Do, Care",
        description: (
          <>
            <span className="text-(--primary) font-extrabold">
              OrangeServers
            </span>
            {
              " keeps your WordPress site fast, secure, and online — with proactive monitoring, performance tuning, and reliable infrastructure. Here’s how we guide you from first visit to long-term stability."
            }
          </>
        ),
      },
      {
        key: "see",
        leftLabel: "See",
        title: "The See phase",
        description: (
          <>
            {"You discover "}
            <span className="text-(--primary) font-extrabold">
              OrangeServers
            </span>
            {
              " and what we stand for: near‑zero downtime, fast page loads, and peace of mind. We highlight the outcomes you care about — stability, speed, and security — without the technical headaches."
            }
          </>
        ),
        phaseIndex: 0,
      },
      {
        key: "think",
        leftLabel: "Think",
        title: "The Think phase",
        description:
          "You evaluate if we’re the right fit. We review your current setup, identify performance bottlenecks, and map risks (plugins, theme, hosting limits). You get a clear plan for optimization and reliability before you commit.",
        phaseIndex: 1,
      },
      {
        key: "do",
        leftLabel: "Do",
        title: "The Do phase",
        description:
          "We execute: migration/onboarding, caching + CDN setup, database tuning, and hardening. Launches are handled with careful change management so updates and releases don’t take your site offline.",
        phaseIndex: 2,
      },
      {
        key: "care",
        leftLabel: "Care",
        title: "The Care phase",
        description:
          "After go‑live, we keep it healthy: 24/7 monitoring, backups, security updates, and proactive fixes. You get ongoing performance improvements and fast support when you need it — so your business can keep growing.",
        phaseIndex: 3,
      },
    ],
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const elements = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );

        if (visible.length === 0) return;

        const idx = elements.findIndex((el) => el === visible[0].target);
        if (idx >= 0) setActiveIndex(idx);
      },
      {
        // Bias towards the section centered in the viewport.
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  const active = items[activeIndex];
  const activePhase = active?.phaseIndex;

  const bars = [
    { width: 220, height: 36 },
    { width: 160, height: 30 },
    { width: 110, height: 26 },
    { width: 55, height: 22 },
  ] as const;

  return (
    <section id="method" className="method_section" aria-label="Our method">
      <div className="method_container">
        <div className="method_left">
          <div className="method_leftSticky">
            <div className="method_leftRow">
              <div className="method_leftLabel sm:flex items-start justify-between gap-7">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active.key}
                    initial={
                      reduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      reduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: -10 }
                    }
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.35, ease: easeInOut }
                    }
                  >
                    {active.leftLabel}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="method_bars flex flex-col gap-4 pt-6" aria-hidden>
                {bars.map((bar, idx) => {
                  const isActive =
                    typeof activePhase === "number" && idx === activePhase;

                  const barStyle = reduceMotion
                    ? ({ width: bar.width, height: bar.height } as const)
                    : ({
                        width: bar.width,
                        height: bar.height,
                        transformOrigin: "left",
                      } as const);

                  return (
                    <motion.div
                      key={idx}
                      className={"method_bar" + (isActive ? " isActive" : "")}
                      style={barStyle}
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: isActive ? 1 : 0.65,
                              scaleX: isActive ? 1 : 0.92,
                            }
                      }
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.35, ease: easeInOut }
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="method_right">
          {items.map((item, idx) => (
            <motion.section
              key={item.key}
              ref={(el) => {
                sectionRefs.current[idx] = el;
              }}
              className="method_panel"
              aria-label={item.title}
              initial={"hidden"}
              whileInView={"show"}
              viewport={{ once: true, amount: 0.35 }}
              variants={panelContainer}
            >
              <motion.h2 className="method_title" variants={panelItem}>
                {item.title}
              </motion.h2>
              <motion.p className="method_desc" variants={panelItem}>
                {item.description}
              </motion.p>

              {/* Visual placeholder blocks (swap with real images later) */}
              {item.key !== "intro" ? (
                <motion.div
                  className="method_media"
                  aria-hidden
                  variants={mediaItem}
                >
                  <div className="method_mediaMain" />
                  <div className="method_mediaSide" />
                </motion.div>
              ) : null}
            </motion.section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Method;
