import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type ScrollDir = "up" | "down";

const TextCarousel = () => {
  const topItems = useMemo(
    () => [
      "Instant deploys",
      "NVMe SSD storage",
      "Free SSL",
      "DDoS protection",
      "Auto backups",
      "One‑click WordPress",
      "Global edge network",
      "99.9% uptime",
      "24/7 support",
    ],
    [],
  );

  const bottomItems = useMemo(
    () => [
      "Managed hosting",
      "Staging environments",
      "Server monitoring",
      "Easy migrations",
      "Team access",
      "Resource scaling",
      "SLA-ready infrastructure",
      "Secure by default",
      "Real-time analytics",
    ],
    [],
  );

  const [scrollDir, setScrollDir] = useState<ScrollDir>("down");
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  const topTrackRef = useRef<HTMLDivElement | null>(null);
  const bottomTrackRef = useRef<HTMLDivElement | null>(null);
  const topAnimRef = useRef<Animation | null>(null);
  const bottomAnimRef = useRef<Animation | null>(null);
  const rateRafRef = useRef<number | null>(null);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollYRef.current;

        if (Math.abs(delta) > 2) {
          setScrollDir(delta > 0 ? "down" : "up");
          lastScrollYRef.current = currentY;
        }

        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const topEl = topTrackRef.current;
    const bottomEl = bottomTrackRef.current;
    if (!topEl || !bottomEl) return;

    topAnimRef.current?.cancel();
    bottomAnimRef.current?.cancel();

    const createMarquee = (el: HTMLDivElement, durationMs: number) => {
      const anim = el.animate(
        [
          { transform: "translate3d(0,0,0)" },
          { transform: "translate3d(-50%,0,0)" },
        ],
        {
          duration: durationMs,
          iterations: Infinity,
          easing: "linear",
        },
      );
      anim.play();
      return anim;
    };

    topAnimRef.current = createMarquee(topEl, 28000);
    bottomAnimRef.current = createMarquee(bottomEl, 32000);

    // Start with down-scroll behavior.
    topAnimRef.current.playbackRate = 1;
    bottomAnimRef.current.playbackRate = -1;

    return () => {
      topAnimRef.current?.cancel();
      bottomAnimRef.current?.cancel();
      topAnimRef.current = null;
      bottomAnimRef.current = null;
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const top = topAnimRef.current;
    const bottom = bottomAnimRef.current;
    if (!top || !bottom) return;

    const targetTop = scrollDir === "down" ? 1 : -1;
    const targetBottom = scrollDir === "down" ? -1 : 1;

    if (rateRafRef.current) {
      window.cancelAnimationFrame(rateRafRef.current);
      rateRafRef.current = null;
    }

    const startTop = top.playbackRate || 0;
    const startBottom = bottom.playbackRate || 0;
    const duration = 220;
    const start = performance.now();

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const e = easeOut(p);
      top.playbackRate = startTop + (targetTop - startTop) * e;
      bottom.playbackRate = startBottom + (targetBottom - startBottom) * e;

      if (p < 1) {
        rateRafRef.current = window.requestAnimationFrame(step);
      } else {
        rateRafRef.current = null;
      }
    };

    rateRafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rateRafRef.current) {
        window.cancelAnimationFrame(rateRafRef.current);
        rateRafRef.current = null;
      }
    };
  }, [scrollDir]);

  const renderRow = (
    items: string[],
    trackRef: (el: HTMLDivElement | null) => void,
  ) => {
    return (
      <div className="platform-carousel__row">
        <div
          className="platform-carousel__track"
          ref={trackRef}
          style={{} as CSSProperties}
        >
          <div
            className="platform-carousel__group"
            aria-label="Platform highlights"
          >
            {items.map((label) => (
              <span key={label} className="platform-carousel__pill">
                {label}
              </span>
            ))}
          </div>
          <div className="platform-carousel__group" aria-hidden="true">
            {items.map((label) => (
              <span key={`${label}-dup`} className="platform-carousel__pill">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="platform"
      className="platform-carousel"
      aria-label="Platform feature carousel"
    >
      {renderRow(topItems, (el) => {
        topTrackRef.current = el;
      })}
      {renderRow(bottomItems, (el) => {
        bottomTrackRef.current = el;
      })}
    </section>
  );
};

export default TextCarousel;
