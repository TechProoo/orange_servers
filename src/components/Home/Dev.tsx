import { gsap } from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Hand from "../../assets/ChatGPT Image Feb 4, 2026, 01_33_43 PM.png";
import Portrait from "../../assets/per.png";

type ScrambleChars = "lowerCase" | "upperCase" | string;

type ScrambleStep = {
  id: string;
  text: string;
  chars: ScrambleChars;
  durationSeconds: number;
  speed?: number;
};

const getCharSet = (chars: ScrambleChars) => {
  if (chars === "lowerCase") return "abcdefghijklmnopqrstuvwxyz";
  if (chars === "upperCase") return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return chars;
};

const Dev = () => {
  const steps = useMemo<ScrambleStep[]>(
    () => [
      {
        id: "scramble-text-1",
        text: "Deploy sites in seconds.",
        chars: "lowerCase",
        durationSeconds: 2,
      },
      {
        id: "scramble-text-2",
        text: "Fast NVMe SSD + global edge",
        chars: "XO",
        durationSeconds: 2,
        speed: 0.4,
      },
      {
        id: "scramble-text-3",
        text: "Free SSL, DDoS protection,",
        chars: "0123456789",
        durationSeconds: 2,
      },
      {
        id: "scramble-text-4",
        text: "AUTOMATED BACKUPS",
        chars: "upperCase",
        durationSeconds: 1,
        speed: 0.3,
      },
      {
        id: "scramble-text-5",
        text: "and 24/7 expert support.",
        chars: "lowerCase",
        durationSeconds: 1.5,
        speed: 0.3,
      },
    ],
    [],
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const runIdRef = useRef(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [lines, setLines] = useState<string[]>(() => steps.map(() => ""));
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(false);

  const scrambleTo = (
    lineIndex: number,
    text: string,
    chars: ScrambleChars,
    durationMs: number,
    speed: number,
    runId: number,
  ) => {
    const charSet = getCharSet(chars);
    const start = performance.now();
    const length = text.length;

    const pick = () =>
      charSet[Math.floor(Math.random() * charSet.length)] ?? "";

    const frame = (now: number) => {
      if (runIdRef.current !== runId) return;

      const t = Math.min(1, (now - start) / durationMs);
      const reveal = Math.floor(t * length);

      let out = "";
      for (let i = 0; i < length; i++) {
        const target = text[i] ?? "";
        if (target === " ") {
          out += " ";
          continue;
        }

        if (i < reveal) {
          // Add a small residual scramble near the reveal edge.
          const jitterBand = Math.max(1, Math.floor(length * 0.12));
          const jitter = i > reveal - jitterBand;
          const jitterChance = Math.max(0.05, Math.min(0.35, speed));
          out += jitter && Math.random() < jitterChance ? pick() : target;
        } else {
          out += pick();
        }
      }

      setLines((prev) => {
        const next = prev.slice();
        next[lineIndex] = out;
        return next;
      });

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        setLines((prev) => {
          const next = prev.slice();
          next[lineIndex] = text;
          return next;
        });
      }
    };

    requestAnimationFrame(frame);
  };

  const restart = () => {
    runIdRef.current += 1;
    const runId = runIdRef.current;

    setLines(steps.map(() => ""));
    setActiveIndex(0);
    setShowCursor(false);

    tlRef.current?.kill();
    const tl = gsap.timeline({
      id: "text-scramble",
      defaults: { ease: "none" },
    });

    steps.forEach((step, idx) => {
      tl.to(
        {},
        {
          duration: step.durationSeconds,
          onStart: () => {
            setActiveIndex(idx);
            scrambleTo(
              idx,
              step.text,
              step.chars,
              Math.max(200, step.durationSeconds * 1000),
              step.speed ?? 0.3,
              runId,
            );
          },
        },
      );
    });

    tl.to(
      {},
      {
        duration: 0,
        onComplete: () => {
          setShowCursor(true);
        },
      },
    );

    tlRef.current = tl;
    tl.play(0);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setLines(steps.map((s) => s.text));
      setActiveIndex(steps.length - 1);
      setShowCursor(false);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    scrollTriggerRef.current?.kill();
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      onEnter: () => restart(),
      onEnterBack: () => restart(),
    });

    return () => {
      runIdRef.current += 1;
      scrollTriggerRef.current?.kill();
      scrollTriggerRef.current = null;
      tlRef.current?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  return (
    <section
      id="developers"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="dev relative"
      aria-label="Dev section"
    >
      <div className="dev__inner">
        <div className="dev__media p-10" aria-hidden="true">
          <div className="dev__imageShell">
            <img className="dev__image" src={Portrait} alt="" />
          </div>
        </div>

        {/* <img src={Hand} className="absolute -z-1 w-200 top-20 left-0" alt="" /> */}

        <div className="dev__content">
          <div className="dev__scramble" aria-label="Scramble text">
            {steps.map((step, idx) => (
              <div key={step.id} className="dev__line">
                <span id={step.id} className="dev__lineText">
                  {lines[idx]}
                </span>
                {idx === activeIndex ? (
                  <span
                    id="scramble-cursor"
                    className={"dev__cursor" + (showCursor ? " is_blink" : "")}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            ))}
          </div>

          <div className="dev__meta">
            <div className="dev__name">Orange Servers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dev;
