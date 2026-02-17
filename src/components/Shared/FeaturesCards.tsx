import { CircleCheckBig } from "lucide-react";
import { motion } from "framer-motion";

import Zero from "../../assets/zero.png";
import Performance from "../../assets/per.png";
import Uptime from "../../assets/uptime.jpg";

const CARDS = [
  {
    title: "Stable uptime",
    description:
      "Built for everyday sites — steady performance with reliable uptime and resilient infrastructure.",
    tag: "99.9%",
    image: Zero,
    imageAlt: "Stable uptime",
  },
  {
    title: "Fast load times",
    description:
      "Optimized stack and modern hardware for fast page loads — great for portfolios, small businesses, and blogs.",
    tag: "Fast",
    image: Performance,
    imageAlt: "Fast performance",
  },
  {
    title: "Easy management",
    description:
      "SSL, email, and databases included — plus simple control panels so you can manage everything without stress.",
    tag: "Simple",
    image: Uptime,
    imageAlt: "Easy management",
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
