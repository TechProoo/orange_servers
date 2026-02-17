import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

type PricingCategoryKey = "shared" | "cloud" | "wp" | "dci" | "dedicated";

type SharedPlanCard = {
  title: string;
  priceMonthly: string;
  isFeatured?: boolean;
  topFeatures: string[];
  alsoIncludes: string[];
};

type CloudPlanCard = {
  title: string;
  priceMonthly: string;
  priceAnnually: string;
  features: string[];
  isFeatured?: boolean;
};

type WordpressPlanCard = {
  title: string;
  subtitle: string;
  priceMonthly: string;
  features: string[];
  isFeatured?: boolean;
};

type DciBillingPeriod = "monthly" | "yearly";

type DciPlanCard = {
  title: string;
  cpuLabel: string;
  cpuTech: string;
  ram: string;
  disk: string;
  bandwidth: string;
  priceMonthly: string;
  priceYearly: string;
  isFeatured?: boolean;
};

function SharedPlansGrid({ plans }: { plans: SharedPlanCard[] }) {
  const splitMoney = (label: string) => {
    if (!label.startsWith("$")) return { currency: "", amount: label };
    return { currency: "$", amount: label.slice(1) };
  };

  return (
    <div className="homePricing_cards" role="list" aria-label="Shared plans">
      {plans.map((plan) =>
        (() => {
          const { currency, amount } = splitMoney(plan.priceMonthly);

          return (
            <article
              key={plan.title}
              className={
                "homePricing_card" + (plan.isFeatured ? " isFeatured" : "")
              }
              role="listitem"
              aria-label={plan.title}
            >
              <div className="homePricing_cardTop">
                <h3 className="homePricing_cardTitle">{plan.title}</h3>
                {plan.isFeatured ? (
                  <div className="homePricing_badge">Most Popular</div>
                ) : null}
              </div>
              <div className="homePricing_priceRow">
                <div className="homePricing_price">
                  <span className="homePricing_priceCurrency">{currency}</span>
                  <span className="homePricing_priceAmount">{amount}</span>
                </div>
                <div className="homePricing_priceUnit">per month</div>
              </div>
              <div className="homePricing_priceSub">When Paid Annually</div>

              <div className="homePricing_cardCols">
                <div>
                  <div className="homePricing_listTitle">Top Features</div>
                  <ul className="homePricing_list">
                    {plan.topFeatures.map((item) => (
                      <li key={item} className="homePricing_listItem">
                        <span className="homePricing_bullet" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="homePricing_listTitle">Also Includes</div>
                  <ul className="homePricing_list">
                    {plan.alsoIncludes.map((item) => (
                      <li key={item} className="homePricing_listItem">
                        <span className="homePricing_bullet" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button type="button" className="homePricing_cta">
                Get Monthly Plan
              </button>
              <div className="homePricing_ctaHint">
                Auto renew at regular rate
              </div>
            </article>
          );
        })(),
      )}
    </div>
  );
}

function CloudPlansGrid({ plans }: { plans: CloudPlanCard[] }) {
  const splitMoney = (label: string) => {
    if (!label.startsWith("$")) return { currency: "", amount: label };
    return { currency: "$", amount: label.slice(1) };
  };

  return (
    <div
      className="homePricing_cards"
      role="list"
      aria-label="Cloud server plans"
    >
      {plans.map((plan) => {
        const { currency, amount } = splitMoney(plan.priceMonthly);
        return (
          <article
            key={plan.title}
            className={
              "homePricing_card" + (plan.isFeatured ? " isFeatured" : "")
            }
            role="listitem"
            aria-label={plan.title}
          >
            <div className="homePricing_cardTop">
              <h3 className="homePricing_cardTitle">{plan.title}</h3>
              {plan.isFeatured ? (
                <div className="homePricing_badge">Most Popular</div>
              ) : null}
            </div>

            <div className="homePricing_priceRow">
              <div className="homePricing_price">
                <span className="homePricing_priceCurrency">{currency}</span>
                <span className="homePricing_priceAmount">{amount}</span>
              </div>
              <div className="homePricing_priceUnit">per month</div>
            </div>

            <div className="homePricing_priceSub">
              Annually {plan.priceAnnually}
            </div>

            <div className="homePricing_cardCols homePricing_cardColsOne">
              <div>
                <div className="homePricing_listTitle">Features</div>
                <ul className="homePricing_list">
                  {plan.features.map((item) => (
                    <li key={item} className="homePricing_listItem">
                      <span className="homePricing_bullet" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button type="button" className="homePricing_cta">
              Get Monthly Plan
            </button>
            <div className="homePricing_ctaHint">
              Auto renew at regular rate
            </div>
          </article>
        );
      })}
    </div>
  );
}

function WordpressPlansGrid({ plans }: { plans: WordpressPlanCard[] }) {
  const splitMoney = (label: string) => {
    const trimmed = label.trim();
    if (!trimmed.startsWith("$")) return { currency: "", amount: trimmed };
    return { currency: "$", amount: trimmed.slice(1).trim() };
  };

  return (
    <div
      className="homePricing_cards"
      role="list"
      aria-label="WordPress hosting plans"
    >
      {plans.map((plan) => {
        const { currency, amount } = splitMoney(plan.priceMonthly);
        return (
          <article
            key={plan.title}
            className={
              "homePricing_card" + (plan.isFeatured ? " isFeatured" : "")
            }
            role="listitem"
            aria-label={plan.title}
          >
            <div className="homePricing_cardTop">
              <h3 className="homePricing_cardTitle">{plan.title}</h3>
              {plan.isFeatured ? (
                <div className="homePricing_badge">Most Popular</div>
              ) : null}
            </div>

            <div className="homePricing_cardSubtitle">{plan.subtitle}</div>

            <div className="homePricing_priceRow">
              <div className="homePricing_price">
                <span className="homePricing_priceCurrency">{currency}</span>
                <span className="homePricing_priceAmount">{amount}</span>
              </div>
              <div className="homePricing_priceUnit">per month</div>
            </div>

            <div className="homePricing_cardCols homePricing_cardColsOne">
              <div>
                <div className="homePricing_listTitle">Features</div>
                <ul className="homePricing_list">
                  {plan.features.map((item) => (
                    <li key={item} className="homePricing_listItem">
                      <span className="homePricing_bullet" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button type="button" className="homePricing_cta">
              Purchase Plan
            </button>
          </article>
        );
      })}
    </div>
  );
}

function DciPlansGrid({
  plans,
  period,
  onPeriodChange,
  reduceMotion,
}: {
  plans: DciPlanCard[];
  period: DciBillingPeriod;
  onPeriodChange: (period: DciBillingPeriod) => void;
  reduceMotion: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const el = wrapRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".homePricing_priceSub",
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );
    }, el);

    return () => ctx.revert();
  }, [period, reduceMotion]);

  return (
    <div
      className="homePricing_dciWrap"
      aria-label="Dedicated cloud infrastructure"
      ref={wrapRef}
    >
      <div
        className="homePricing_dciToggle"
        role="tablist"
        aria-label="Billing period"
      >
        <button
          type="button"
          className={
            "homePricing_dciToggleBtn" +
            (period === "monthly" ? " isActive" : "")
          }
          role="tab"
          aria-selected={period === "monthly"}
          onClick={(e) => {
            onPeriodChange("monthly");
            if (!reduceMotion) {
              gsap.fromTo(
                e.currentTarget,
                { scale: 0.985 },
                { scale: 1, duration: 0.28, ease: "power3.out" },
              );
            }
          }}
        >
          Monthly
        </button>
        <button
          type="button"
          className={
            "homePricing_dciToggleBtn" +
            (period === "yearly" ? " isActive" : "")
          }
          role="tab"
          aria-selected={period === "yearly"}
          onClick={(e) => {
            onPeriodChange("yearly");
            if (!reduceMotion) {
              gsap.fromTo(
                e.currentTarget,
                { scale: 0.985 },
                { scale: 1, duration: 0.28, ease: "power3.out" },
              );
            }
          }}
        >
          Yearly
        </button>
      </div>

      <div className="homePricing_cards" role="list" aria-label="DCI plans">
        {plans.map((plan) => (
          <article
            key={plan.title}
            className={
              "homePricing_card" + (plan.isFeatured ? " isFeatured" : "")
            }
            role="listitem"
            aria-label={plan.title}
          >
            <div className="homePricing_cardTop">
              <h3 className="homePricing_cardTitle">{plan.title}</h3>
              {plan.isFeatured ? (
                <div className="homePricing_badge">Most Popular</div>
              ) : null}
            </div>

            <div className="homePricing_cardCols homePricing_cardColsOne">
              <div>
                <div className="homePricing_listTitle">CPU</div>
                <ul className="homePricing_list">
                  <li className="homePricing_listItem">
                    <span className="homePricing_bullet" aria-hidden />
                    {plan.cpuTech}
                  </li>
                  <li className="homePricing_listItem">
                    <span className="homePricing_bullet" aria-hidden />
                    {plan.cpuLabel}
                  </li>
                </ul>
              </div>
            </div>

            <div className="homePricing_cardCols homePricing_cardColsOne">
              <div>
                <div className="homePricing_listTitle">Ram</div>
                <div className="homePricing_cardValue">{plan.ram}</div>
              </div>
              <div>
                <div className="homePricing_listTitle">Disk</div>
                <div className="homePricing_cardValue">{plan.disk}</div>
              </div>
              <div>
                <div className="homePricing_listTitle">Bandwith</div>
                <div className="homePricing_cardValue">{plan.bandwidth}</div>
              </div>
            </div>

            <div className="homePricing_priceSub">
              {period === "monthly" ? (
                <span>{plan.priceMonthly} monthly</span>
              ) : (
                <span>{plan.priceYearly} yearly</span>
              )}
            </div>

            <button type="button" className="homePricing_cta">
              Order Now
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

const Pricing = () => {
  const navigate = useNavigate();
  const reduceMotion =
    typeof window === "undefined"
      ? true
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [activeCategory, setActiveCategory] =
    useState<PricingCategoryKey>("cloud");

  const [dciPeriod, setDciPeriod] = useState<DciBillingPeriod>("monthly");

  const sectionRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef(new Map<PricingCategoryKey, HTMLButtonElement>());

  const categories = useMemo(
    () =>
      [
        { key: "shared" as const, label: "SHARED" },
        { key: "cloud" as const, label: "CLOUD SERVER" },
        { key: "wp" as const, label: "WORDPRESS HOSTING" },
        {
          key: "dci" as const,
          label: "DEDICATED CLOUD INFRASTRUCTURE",
        },
        { key: "dedicated" as const, label: "DEDICATED" },
      ] as const,
    [],
  );

  const sharedPlans = useMemo<SharedPlanCard[]>(
    () => [
      {
        title: "Beginner",
        priceMonthly: "$1.00",
        topFeatures: [
          "3GB Webspace",
          "10GB Bandwidth",
          "4 Sub Domains",
          "1 Hosted Addon Domain",
          "2 Parked Domain",
        ],
        alsoIncludes: [
          "SSL Certificate",
          "Unlimited E-mails",
          "Unlimited Database",
          "99.99% Uptime SLA",
          "Powered by cPanel® & Direct Admin",
        ],
      },
      {
        title: "Intermediate",
        priceMonthly: "$1.50",
        isFeatured: true,
        topFeatures: [
          "7GB Webspace",
          "30GB Bandwidth",
          "10 Sub Domains",
          "2 Hosted Addon Domain",
          "2 Parked Domain",
        ],
        alsoIncludes: [
          "SSL Certificate",
          "Unlimited E-mails",
          "Unlimited Database",
          "99.99% Uptime SLA",
          "Powered by cPanel® & Direct Admin",
        ],
      },
      {
        title: "Advance",
        priceMonthly: "$3.00",
        topFeatures: [
          "15GB Webspace",
          "50GB Bandwidth",
          "15 Sub Domains",
          "3 Hosted Addon Domain",
          "3 Parked Domain",
        ],
        alsoIncludes: [
          "SSL Certificate",
          "Unlimited E-mails",
          "Unlimited Database",
          "99.99% Uptime SLA",
          "Powered by cPanel®",
        ],
      },
      {
        title: "Agency",
        priceMonthly: "$5.00",
        topFeatures: [
          "Unlimited Webspace",
          "Unlimited Bandwidth",
          "Unlimited Sub Domains",
          "Unlimited Addon Domain",
          "Unlimited Parked Domain",
        ],
        alsoIncludes: [
          "SSL Certificate",
          "Unlimited E-mails",
          "Unlimited Database",
          "99.99% Uptime SLA",
          "Powered by cPanel®",
        ],
      },
    ],
    [],
  );

  const cloudPlans = useMemo<CloudPlanCard[]>(
    () => [
      {
        title: "V-Twin Windows",
        priceMonthly: "$7.99",
        priceAnnually: "$70.99",
        features: [
          "2GB RAM",
          "2 CPU Cores",
          "60GB SSD",
          "50Mbps Unmetered Bandwidth",
          "Once per Four Weeks VHD Backup",
          "1 Dedicated IP",
          "Windows License Included",
        ],
      },
      {
        title: "V-Twin Linux",
        priceMonthly: "$4.99",
        priceAnnually: "$40.99",
        features: [
          "2GB RAM",
          "2 CPU Cores",
          "60GB SSD",
          "50Mbps Unmetered Bandwidth",
          "Once per Four Weeks VHD Backup",
          "1 Dedicated IP",
          "License Included",
        ],
      },
      {
        title: "Turbocharged Windows",
        priceMonthly: "$14.99",
        priceAnnually: "$149.99",
        features: [
          "4GB RAM",
          "3 CPU Cores",
          "100GB SSD",
          "100Mbps Unmetered Bandwidth",
          "Once per Four Weeks VHD Backup",
          "1 Dedicated IP",
          "Windows License Included",
        ],
      },
      {
        title: "Turbocharged Linux",
        priceMonthly: "$8.99",
        priceAnnually: "$80.99",
        features: [
          "4GB RAM",
          "3 CPU Cores",
          "100GB SSD",
          "100Mbps Unmetered Bandwidth",
          "Once per Four Weeks VHD Backup",
          "1 Dedicated IP",
          "License Included",
        ],
      },
      {
        title: "Turbo-fan Jet Windows",
        priceMonthly: "$27.99",
        priceAnnually: "$270.99",
        features: [
          "8GB RAM",
          "4 CPU Cores",
          "160GB SSD",
          "150Mbps Unmetered Bandwidth",
          "Once per Four Weeks VHD Backup",
          "1 Dedicated IP",
          "Windows License Included",
        ],
      },
      {
        title: "Turbo-fan Jet Linux",
        priceMonthly: "$15.99",
        priceAnnually: "$150.99",
        features: [
          "8GB RAM",
          "4 CPU Cores",
          "160GB SSD",
          "150Mbps Unmetered Bandwidth",
          "Once per Four Weeks VHD Backup",
          "1 Dedicated IP",
          "License Included",
        ],
      },
      {
        title: "Main-Engine Windows",
        priceMonthly: "$51.99",
        priceAnnually: "$510.99",
        features: [
          "16GB RAM",
          "6 CPU Cores",
          "240GB SSD",
          "200Mbps Unmetered Bandwidth",
          "Once per Four Weeks VHD Backup",
          "1 Dedicated IP",
          "License Included",
        ],
      },
      {
        title: "Main-Engine Linux",
        priceMonthly: "$31.99",
        priceAnnually: "$310.99",
        features: [
          "16GB RAM",
          "6 CPU Cores",
          "240GB SSD",
          "200Mbps Unmetered Bandwidth",
          "Once per Four Weeks VHD Backup",
          "1 Dedicated IP",
          "License Included",
        ],
      },
    ],
    [],
  );

  const wordpressPlans = useMemo<WordpressPlanCard[]>(
    () => [
      {
        title: "Single Home",
        subtitle: "For starter sites",
        priceMonthly: "$25",
        features: [
          "1 WordPress Install",
          "30,000 Visits",
          "Security update",
          "20GB Storage",
          "Free Site Migrations",
          "247 Expert support",
          "Professional Email",
        ],
      },
      {
        title: "Semi Detached",
        subtitle: "For multiple sites",
        priceMonthly: "$45",
        isFeatured: true,
        features: [
          "3 WordPress Install",
          "50,000 Visits",
          "Security update",
          "25GB Storage",
          "Free Site Migrations",
          "247 Expert support",
          "Professional Email",
        ],
      },
      {
        title: "Multi Family",
        subtitle: "For complex sites",
        priceMonthly: "$90",
        features: [
          "10 WordPress Install",
          "150,000 Visits",
          "Security update",
          "30GB Storage",
          "Free Site Migrations",
          "247 Expert support",
          "Professional Email",
        ],
      },
      {
        title: "Town Homes",
        subtitle: "For larger sites",
        priceMonthly: "$155",
        features: [
          "20 WordPress Install",
          "400,000 Visits",
          "Security update",
          "50GB Storage",
          "Free Site Migrations",
          "247 Expert support",
          "Professional Email",
        ],
      },
    ],
    [],
  );

  const dciPlans = useMemo<DciPlanCard[]>(
    () => [
      {
        title: "DCI 01",
        cpuTech: "Simultaneous Threading",
        cpuLabel: "6 Core",
        ram: "32 GB",
        disk: "500 GB SATA",
        bandwidth: "1 GBPS unmetered",
        priceMonthly: "$380",
        priceYearly: "$3800",
      },
      {
        title: "DCI 10",
        cpuTech: "Simultaneous Threading",
        cpuLabel: "10 Core",
        ram: "64 GB",
        disk: "1 TB NVMe",
        bandwidth: "1 GBPS unmetered",
        priceMonthly: "$450",
        priceYearly: "$4500",
        isFeatured: true,
      },
      {
        title: "DCI 20",
        cpuTech: "Simultaneous Threading",
        cpuLabel: "16 Core",
        ram: "64 GB",
        disk: "1 TB NVMe",
        bandwidth: "1 GBPS unmetered",
        priceMonthly: "$550",
        priceYearly: "$5500",
      },
      {
        title: "DCI 30",
        cpuTech: "Hyper Threading",
        cpuLabel: "32 Core",
        ram: "128 GB",
        disk: "3 TB NVMe",
        bandwidth: "1 GBPS unmetered",
        priceMonthly: "$850",
        priceYearly: "$8500",
      },
      {
        title: "DCI 40",
        cpuTech: "Hyper Threading",
        cpuLabel: "96 Core",
        ram: "192 GB",
        disk: "3 TB NVMe",
        bandwidth: "1 GBPS unmetered",
        priceMonthly: "$1050",
        priceYearly: "$10500",
      },
    ],
    [],
  );

  const updateIndicator = (animate: boolean) => {
    const toggleEl = toggleRef.current;
    const indicatorEl = indicatorRef.current;
    const activePill = pillRefs.current.get(activeCategory);
    if (!toggleEl || !indicatorEl || !activePill) return;

    const toggleRect = toggleEl.getBoundingClientRect();
    const pillRect = activePill.getBoundingClientRect();

    const x = pillRect.left - toggleRect.left;
    const y = pillRect.top - toggleRect.top;
    const width = pillRect.width;
    const height = pillRect.height;

    if (reduceMotion || !animate) {
      gsap.set(indicatorEl, { x, y, width, height });
      return;
    }

    gsap.to(indicatorEl, {
      x,
      y,
      width,
      height,
      duration: 0.38,
      ease: "power3.out",
    });
  };

  useLayoutEffect(() => {
    updateIndicator(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateIndicator(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onResize = () => updateIndicator(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".homePricing_header",
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
      );

      gsap.fromTo(
        ".homePricing_toggle",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.1 },
      );

      gsap.fromTo(
        ".homePricing_plan",
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".homePricing_content",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" },
      );

      gsap.fromTo(
        ".homePricing_card",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.06,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [activeCategory, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="home-pricing"
      className="homePricing_section bg-(--background)"
      aria-label="Pricing"
    >
      <div className="homePricing_container">
        <header className="homePricing_header">
          <h2 className="homePricing_title">
            Pay once, <span className="text_style">Use</span> forever
          </h2>
          <p className="homePricing_subtitle">
            Select From best Plan, ensuring a perfect match. Need more or less?
            Customize your subscription for a seamless fit!
          </p>
        </header>

        <div
          className="homePricing_toggle"
          role="tablist"
          aria-label="Pricing categories"
          ref={toggleRef}
        >
          <div
            className="homePricing_toggleIndicator"
            aria-hidden
            ref={indicatorRef}
          />
          {categories.map((category) => {
            const isActive = category.key === activeCategory;
            return (
              <button
                key={category.key}
                type="button"
                className={
                  "homePricing_toggleBtn" + (isActive ? " isActive" : "")
                }
                role="tab"
                aria-selected={isActive}
                onClick={(e) => {
                  setActiveCategory(category.key);
                  if (!reduceMotion) {
                    gsap.fromTo(
                      e.currentTarget,
                      { scale: 0.985 },
                      { scale: 1, duration: 0.35, ease: "power3.out" },
                    );
                  }
                }}
                ref={(el) => {
                  if (!el) return;
                  pillRefs.current.set(category.key, el);
                }}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="homePricing_content">
          {activeCategory === "shared" ? (
            <SharedPlansGrid plans={sharedPlans} />
          ) : activeCategory === "cloud" ? (
            <CloudPlansGrid plans={cloudPlans} />
          ) : activeCategory === "wp" ? (
            <WordpressPlansGrid plans={wordpressPlans} />
          ) : activeCategory === "dci" ? (
            <DciPlansGrid
              plans={dciPlans}
              period={dciPeriod}
              onPeriodChange={setDciPeriod}
              reduceMotion={reduceMotion}
            />
          ) : activeCategory === "dedicated" ? (
            <div
              className="homePricing_plan homePricing_dedicatedNotice"
              role="note"
            >
              <div className="homePricing_planTagline">
                Contact us for your Dedicated
              </div>
              <div className="homePricing_planName">
                support@orangeservers.net
              </div>
            </div>
          ) : null}

          {activeCategory === "shared" ||
          activeCategory === "cloud" ||
          activeCategory === "wp" ? (
            <div className="homePricing_moreDetailsWrap">
              <button
                type="button"
                className="homePricing_moreDetailsBtn"
                onClick={() => {
                  const path =
                    activeCategory === "shared"
                      ? "/shared"
                      : activeCategory === "cloud"
                        ? "/cloud"
                        : "/wordpress";

                  navigate(path);
                  setTimeout(() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                  }, 0);
                }}
              >
                More details
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
export default Pricing;
