import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="home_hero" aria-label="Hero">
      <div className="home_heroInner">
        <h1 className="home_heroTitle">
          Swift & <span className="home_heroAccent">Affordable</span> Hosting
        </h1>

        <p className="home_heroSub">
          Selecting the ideal web hosting provider can become overwhelming.
        </p>

        <p className="home_heroBody">
          Yes, I agree. There are many different web hosting providers to choose
          from, and it can be difficult to know which one is right for you.
          That&apos;s why we&apos;re here to help.
        </p>

        <div className="home_heroCtas" aria-label="Primary actions">
          <a className="home_heroCtaPrimary" href="#">
            <span className="home_heroCtaPrimaryText">Hosting Plans</span>
            <span className="home_heroCtaPrimaryIcon" aria-hidden="true">
              <ArrowRight size={18} />
            </span>
          </a>
          <a className="home_heroCtaSecondary" href="#">
            Support/Ticket
          </a>
        </div>

        <div className="home_heroPyramid" aria-hidden="true">
          <span className="home_heroPyramidLayer is_back" />
          <span className="home_heroPyramidLayer is_mid" />
          <span className="home_heroPyramidLayer is_front" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
