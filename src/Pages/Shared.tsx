import Navbar from "../components/Wordpress/Navbar";
import Footer from "../components/Wordpress/Footer";

import Hero from "../components/Shared/Hero";
import Features from "../components/Shared/Features";
import Method from "../components/Shared/Method";
import Testimonial from "../components/Shared/Testimonial";
import Sponsors from "../components/Shared/Sponsors";

type SharedPlanCard = {
  title: string;
  priceMonthly: string;
  isFeatured?: boolean;
  topFeatures: string[];
  alsoIncludes: string[];
};

function SharedPlansGrid({ plans }: { plans: SharedPlanCard[] }) {
  const splitMoney = (label: string) => {
    if (!label.startsWith("$")) return { currency: "", amount: label };
    return { currency: "$", amount: label.slice(1) };
  };

  return (
    <div className="homePricing_cards" role="list" aria-label="Shared plans">
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
      })}
    </div>
  );
}

const sharedPlans: SharedPlanCard[] = [
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
];

function Shared() {
  return (
    <div id="top" className="sharedPage">
      <Navbar />

      <Hero />
      <Features />
      <Method />
      <Testimonial />

      <section
        id="pricing"
        className="homePricing_section bg-(--background)"
        aria-label="Shared hosting plans"
      >
        <div className="homePricing_container">
          <header className="homePricing_header">
            <h2 className="homePricing_title">Shared Hosting</h2>
            <p className="homePricing_subtitle">
              Simple, reliable{" "}
              <span className="text_style">hosting with the essentials</span>{" "}
              —pick a plan and scale up anytime.
            </p>
          </header>

          <div className="homePricing_content">
            <SharedPlansGrid plans={sharedPlans} />
          </div>
        </div>
      </section>

      <div id="sponsors">
        <Sponsors />
      </div>
      <Footer />
    </div>
  );
}

export default Shared;
