import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const Testimonial = () => {
  const reduceMotion = useReducedMotion();

  const easeOut = [0.16, 1, 0.3, 1] as const;
  const easeInOut = [0.45, 0, 0.55, 1] as const;

  type TestimonialItem = {
    name: string;
    role: string;
    quote: string;
    rating: 1 | 2 | 3 | 4 | 5;
    avatarBg: string;
  };

  const headerVariants = useMemo(
    () =>
      ({
        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: reduceMotion
            ? { duration: 0 }
            : { duration: 0.7, ease: easeOut },
        },
      }) as const,
    [reduceMotion],
  );

  const stageVariants = useMemo(
    () =>
      ({
        hidden: reduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 18, scale: 0.99 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: reduceMotion
            ? { duration: 0 }
            : { duration: 0.75, ease: easeOut },
        },
      }) as const,
    [reduceMotion],
  );

  const cardSwapVariants = useMemo(
    () =>
      ({
        initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
        animate: {
          opacity: 1,
          y: 0,
          transition: reduceMotion
            ? { duration: 0 }
            : { duration: 0.28, ease: easeInOut },
        },
        exit: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 },
      }) as const,
    [reduceMotion],
  );

  const testimonials: TestimonialItem[] = [
    {
      name: "Becky Nelson",
      role: "Founder",
      quote:
        "From the first week, our uptime improved and updates became painless. Support is fast and actually helpful.",
      rating: 5,
      avatarBg:
        "linear-gradient(135deg, color-mix(in oklab, var(--primary) 55%, white), color-mix(in oklab, var(--orange-light) 80%, white))",
    },
    {
      name: "Jordan Kim",
      role: "CTO",
      quote:
        "Deployments are smoother, backups are reliable, and the monitoring caught issues before our customers did.",
      rating: 5,
      avatarBg:
        "linear-gradient(135deg, rgba(0,0,0,0.08), color-mix(in oklab, var(--orange-light) 70%, white))",
    },
    {
      name: "Priya Shah",
      role: "Product Lead",
      quote:
        "Performance gains were immediate. Our team now focuses on shipping features, not firefighting servers.",
      rating: 5,
      avatarBg:
        "linear-gradient(135deg, color-mix(in oklab, var(--peach-glow) 55%, white), rgba(255,255,255,0.9))",
    },
    {
      name: "Alex Rivera",
      role: "Agency Owner",
      quote:
        "The workflow is simple and consistent across client sites. It’s the first host our team genuinely likes.",
      rating: 4,
      avatarBg:
        "linear-gradient(135deg, color-mix(in oklab, var(--primary) 25%, white), rgba(0,0,0,0.06))",
    },
    {
      name: "Sam Patel",
      role: "Operations",
      quote:
        "We went from constant alert fatigue to predictable operations. The reporting is clean and actionable.",
      rating: 5,
      avatarBg: "linear-gradient(135deg, rgba(0,0,0,0.06), rgba(0,0,0,0.02))",
    },
    {
      name: "Mina Park",
      role: "Marketing",
      quote:
        "No more slowdowns during campaigns. Everything stays responsive even when traffic spikes.",
      rating: 5,
      avatarBg:
        "linear-gradient(135deg, color-mix(in oklab, var(--orange-glow) 25%, white), rgba(255,255,255,0.9))",
    },
  ];

  const positions = [
    { top: "16%", left: "8%", size: 44 },
    { top: "30%", left: "20%", size: 58 },
    { top: "20%", left: "72%", size: 46 },
    { top: "55%", left: "12%", size: 36 },
    { top: "62%", left: "84%", size: 40 },
    { top: "42%", left: "88%", size: 54 },
  ] as const;

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);

  const defaultActiveIndex = 0;
  const activeIndex = pinnedIndex ?? hoverIndex ?? defaultActiveIndex;
  const active = activeIndex !== null ? testimonials[activeIndex] : null;

  function initials(name: string) {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("");
  }

  return (
    <motion.section
      id="testimonials"
      className="testimonials_section"
      onMouseLeave={() => {
        if (pinnedIndex === null) setHoverIndex(null);
      }}
      initial={"hidden"}
      whileInView={"show"}
      viewport={{ once: true, amount: 0.25 }}
      variants={headerVariants}
    >
      <div className="testimonials_container">
        <header className="testimonials_header">
          <h2 className="testimonials_title">
            What Our Clients{" "}
            <span className="testimonials_titleAccent">Say</span>
          </h2>
          <p className="testimonials_subtitle">
            Our clients send us a bunch of smiles with our services and we love
            them.
          </p>
        </header>

        <motion.div
          className="testimonials_stage"
          aria-label="Testimonials"
          variants={stageVariants}
        >
          {testimonials.map((t, index) => {
            const pos = positions[index] ?? positions[0];
            const isActive = activeIndex === index;

            return (
              <motion.button
                key={t.name}
                type="button"
                className={
                  "testimonials_avatarButton" + (isActive ? " is_active" : "")
                }
                style={{
                  top: pos.top,
                  left: pos.left,
                  width: pos.size,
                  height: pos.size,
                }}
                initial={
                  reduceMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.85 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.55, ease: easeOut, delay: index * 0.06 }
                }
                onMouseEnter={() => setHoverIndex(index)}
                onFocus={() => setHoverIndex(index)}
                onBlur={() => {
                  if (pinnedIndex === null) setHoverIndex(null);
                }}
                onClick={() => {
                  setPinnedIndex((prev) => (prev === index ? null : index));
                  setHoverIndex(index);
                }}
                aria-label={`Show testimonial from ${t.name}`}
                aria-pressed={pinnedIndex === index}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className="testimonials_avatar"
                  style={{ background: t.avatarBg }}
                >
                  {initials(t.name)}
                </span>

                {isActive ? (
                  <span className="testimonials_activeDot" aria-hidden />
                ) : null}
              </motion.button>
            );
          })}

          <motion.div
            className={"testimonials_card" + (active ? " is_visible" : "")}
            role="group"
            aria-label="Selected testimonial"
            initial={
              reduceMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 14, scale: 0.99 }
            }
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.7, ease: easeOut, delay: 0.15 }
            }
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active?.name ?? "none"}
                variants={cardSwapVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="testimonials_cardAvatar" aria-hidden>
                  <div
                    className="testimonials_cardAvatarInner"
                    style={{ background: active?.avatarBg ?? undefined }}
                  >
                    {active ? initials(active.name) : ""}
                  </div>
                </div>

                <div className="testimonials_quoteMark" aria-hidden>
                  “
                </div>
                <p className="testimonials_quote">{active?.quote ?? ""}</p>

                <div className="testimonials_nameRow">
                  <div className="testimonials_name">{active?.name ?? ""}</div>
                  <div className="testimonials_role">{active?.role ?? ""}</div>
                </div>

                <div className="testimonials_stars" aria-label="Rating">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const filled = (active?.rating ?? 0) > i;
                    return (
                      <span
                        key={i}
                        className={
                          "testimonials_star" + (filled ? " is_filled" : "")
                        }
                        aria-hidden
                      />
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
export default Testimonial;
