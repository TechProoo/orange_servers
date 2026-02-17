import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

import Navbar from "../components/Wordpress/Navbar";
import Footer from "../components/Wordpress/Footer";
import Sponsors from "../components/Wordpress/Sponsors";

import MotionGraphic from "../assets/motion-graphic-6993aa0f6d2bafd319b6b2f6.mp4";

import Architecture from "../components/Cloud/Architecture";
import Testimonial from "../components/Wordpress/Testimonial";

type CloudPlanCard = {
  title: string;
  priceMonthly: string;
  priceAnnually: string;
  features: string[];
  isFeatured?: boolean;
};

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
                <div className="homePricing_listTitle">Specs</div>
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
              Deploy this server
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

const cloudPlans: CloudPlanCard[] = [
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
    isFeatured: true,
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
];

function Cloud() {
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

  return (
    <div className="cloudPage">
      <Navbar />

      <header className="cloudHero" aria-label="Cloud hero">
        <div className="cloudContainer cloudHero_layout">
          <div className="cloudHero_copy">
            <div className="cloudHero_kicker">Cloud servers</div>
            <h1 className="cloudHero_title">
              Cloud engineering, <span className="text_style">without</span> the
              noise.
            </h1>
            <p className="cloudHero_lead">
              Predictable resources, unmetered bandwidth tiers, and backups
              built into the workflow — for builders who care about uptime.
            </p>

            <div className="cloudHero_actions">
              <a className="cloudBtn cloudBtn_primary" href="#pricing">
                Browse plans
                <ArrowRight className="cloudBtn_arrow" size={18} aria-hidden />
              </a>
              <a className="cloudBtn cloudBtn_ghost" href="#method">
                View architecture
              </a>
            </div>

            <div
              className="cloudHero_pills"
              role="list"
              aria-label="Highlights"
            >
              <div className="cloudPill" role="listitem">
                Linux / Windows
              </div>
              <div className="cloudPill" role="listitem">
                VHD backups
              </div>
              <div className="cloudPill" role="listitem">
                Unmetered bandwidth tiers
              </div>
            </div>
          </div>

          <div className="cloudHero_visual" aria-label="Cloud motion graphics">
            <div
              className="support__frame cloudHero_videoFrame"
              aria-label="Motion graphics"
            >
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

        <div className="cloudHero_glow" aria-hidden="true" />
      </header>

      <section className="cloudLogos" aria-label="Trusted by">
        <div className="cloudContainer cloudLogos_row">
          <div className="cloudLogos_label">
            Trusted by teams shipping daily
          </div>
          <div className="cloudLogos_list" role="list" aria-label="Logo strip">
            <div className="cloudLogo" role="listitem">
              EdgeOps
            </div>
            <div className="cloudLogo" role="listitem">
              DeployLab
            </div>
            <div className="cloudLogo" role="listitem">
              MetricsHQ
            </div>
            <div className="cloudLogo" role="listitem">
              Shipwright
            </div>
            <div className="cloudLogo" role="listitem">
              Nightwatch
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="cloudSection" aria-label="Features">
        <div className="cloudContainer">
          <header className="cloudSection_head">
            <h2 className="cloudSection_title">
              Built for <span className="text_style">operators</span>
            </h2>
            <p className="cloudSection_subtitle">
              The stuff engineers care about — clean specs,{" "}
              <span className="text_style"> steady performance</span>, and
              operations-first thinking.
            </p>
          </header>

          <div
            className="cloudFeatureGrid"
            role="list"
            aria-label="Cloud features"
          >
            <article className="cloudFeatureCard" role="listitem">
              <div className="cloudFeature_top">
                <div className="cloudFeature_kicker">OS</div>
                <h3 className="cloudFeature_title">Linux + Windows</h3>
              </div>
              <p className="cloudFeature_body">
                Choose your stack: Linux for speed, Windows for compatibility.
              </p>
            </article>

            <article className="cloudFeatureCard" role="listitem">
              <div className="cloudFeature_top">
                <div className="cloudFeature_kicker">SRE</div>
                <h3 className="cloudFeature_title">Ops‑ready defaults</h3>
              </div>
              <p className="cloudFeature_body">
                Built for uptime, troubleshooting, and smooth recovery.
              </p>
            </article>

            <article className="cloudFeatureCard" role="listitem">
              <div className="cloudFeature_top">
                <div className="cloudFeature_kicker">Edge</div>
                <h3 className="cloudFeature_title">Networking tiers</h3>
              </div>
              <p className="cloudFeature_body">
                Push traffic confidently with unmetered bandwidth options.
              </p>
            </article>

            <article className="cloudFeatureCard" role="listitem">
              <div className="cloudFeature_top">
                <div className="cloudFeature_kicker">Backups</div>
                <h3 className="cloudFeature_title">VHD snapshots</h3>
              </div>
              <p className="cloudFeature_body">
                Backup workflow included so recovery planning stays simple.
              </p>
            </article>
          </div>
        </div>
      </section>

      <Architecture />

      <section id="pricing" className="cloudSection" aria-label="Cloud pricing">
        <div className="cloudContainer">
          <header className="cloudSection_head">
            <h2 className="cloudSection_title">
              Cloud <span className="text_style">server plans</span>
            </h2>
            <p className="cloudSection_subtitle">
              Choose your resources. Pick Linux or Windows. Scale when you’re
              ready.
            </p>
          </header>

          <div className="cloudPricing_wrap">
            <CloudPlansGrid plans={cloudPlans} />
          </div>
        </div>
      </section>

      <div id="testimonials">
        <Testimonial />
      </div>

      <div id="sponsors">
        <Sponsors />
      </div>

      <Footer />
    </div>
  );
}

export default Cloud;
