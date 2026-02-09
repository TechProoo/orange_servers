import Zero from "../../assets/zero.png";
import Performance from "../../assets/per.png";
import Uptime from "../../assets/uptime.jpg";
import { CircleCheckBig } from "lucide-react";
import { motion } from "framer-motion";

const CARDS = [
  {
    title: "Almost Zero Downtime",
    description:
      "Our advanced infrastructure ensures your WordPress site stays online 99.9% of the time, with instant failover and redundancy built-in.",
    tag: "99.9%",
    image: Zero,
    imageAlt: "Zero downtime",
  },
  {
    title: "Performance Optimization",
    description:
      "Lightning-fast page loads with our optimization stack including caching, CDN integration, and database tuning for peak performance.",
    tag: "Fast",
    image: Performance,
    imageAlt: "Performance optimization",
  },
  {
    title: "Traffic Optimization & Insights",
    description:
      "Track, analyze, and optimize your website traffic with real-time insights that help you attract more visitors and improve performance.",
    tag: "Traffic",
    image: Uptime,
    imageAlt: "Website traffic analytics",
  },
] as const;

const FeaturesCards = () => {
  const easeOut = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="fe_cards sm:flex justify-center gap-11.5 relative">
      {CARDS.map((card, index) => (
        <motion.article
          key={card.title}
          className="fe_cardWrap"
          aria-label={card.title}
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: easeOut, delay: index * 0.12 }}
        >
          <div className="fe_card" aria-hidden>
            <div className="cd_img" aria-hidden>
              <img src={card.image} alt={card.imageAlt} />
            </div>

            <div className="cd_ic">
              <CircleCheckBig size={100} color="#ff6933" />
            </div>

            <div className="fe_card__screen">
              <div className="fe_card__abstract" />
              <div className="fe_card__glare" />
              <div className="fe_card__dots" />
            </div>
          </div>

          <div className="fe_card__content">
            <div className="fe_card__tag">{card.tag}</div>
            <h3 className="fe_card__title">{card.title}</h3>
            <p className="fe_card__desc">{card.description}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
};

export default FeaturesCards;
