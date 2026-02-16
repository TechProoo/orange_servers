import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import PlatformSupport from "./PlatformSupport";

type Metric = {
  value: string;
  description: string;
  sourceHref?: string;
};

const PlatformImpact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const el = sectionRef.current;
    if (!el) return;

    // Keep the primary mode active while the section is centered-ish in view.
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 65%",
      end: "bottom 35%",
      toggleClass: { targets: el, className: "is_primary" },
      // No need to pin/scrub; just stateful style change.
      anticipatePin: 1,
    });

    if (!reduceMotion) {
      ScrollTrigger.refresh();
    }

    return () => {
      st.kill();
    };
  }, []);

  const metrics: Metric[] = [
    {
      value: "99.9%",
      description: "uptime-focused infrastructure for always-on sites",
      sourceHref: "#",
    },
    {
      value: "1-click",
      description: "WordPress installs, SSL, and quick start workflows",
      sourceHref: "#",
    },
    {
      value: "24/7",
      description: "support when you need it — chat, ticket, and guidance",
      sourceHref: "#",
    },
  ];

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="impact"
      aria-label="Platform impact"
    >
      <div className="impact__inner">
        <div className="impact__badge" aria-label="Platform performance">
          Platform Performance
        </div>

        <h2 className="impact__title">
          support <span className="impact__titleItalic">every</span> team
          <br />
          to ship reliable websites
        </h2>

        <p className="impact__sub">
          From deploy to scale, OrangeServers helps you move faster with
          security, backups, and performance built in.
        </p>

        <div className="impact__metrics mt-40" aria-label="Platform metrics">
          {metrics.map((m) => (
            <div key={m.value} className="impact__metric">
              <div className="impact__metricValue">{m.value}</div>
              <div className="impact__metricDesc">{m.description}</div>
              <a className="impact__metricLink" href={m.sourceHref ?? "#"}>
                View source ↗
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-30">
        <PlatformSupport variant="inImpact" />
      </div>

      <div className="impact__ctaWrap" aria-label="Get started">
        <div className="impact__ctaInner">
          <h3 className="impact__ctaTitle">
            {/* After migrating, sites feel more */}
            <span className="impact__ctaItalic"> confident</span>
          </h3>

          <a className="impact__ctaButton" href="#">
            <span>Get started</span>
            <span className="impact__ctaIcon" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PlatformImpact;
