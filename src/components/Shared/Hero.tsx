import { ArrowRight } from "lucide-react";
import Hand from "../../assets/hand.png";

const Hero = () => {
  return (
    <section className="home_hero sharedHero relative" aria-label="Shared hero">
      <img className="sharedHero_deco" src={Hand} alt="" aria-hidden />

      <div className="home_heroInner">
        <div className="home_heroKicker">Shared Hosting</div>

        <h1 className="home_heroTitle">
          Fast launches. Stable uptime.{" "}
          <span className="home_heroAccent">No fuss</span>.
        </h1>

        <p className="home_heroSub">
          Everything you need to get online — SSL, email, and databases
          included.
        </p>

        <p className="home_heroBody">
          Pick a plan, publish your site, and grow at your own pace.
          OrangeServers Shared Hosting is built for everyday websites that still
          deserve premium reliability.
        </p>

        <div className="home_heroCtas" aria-label="Primary actions">
          <a className="home_heroCtaPrimary" href="#pricing">
            <span className="home_heroCtaPrimaryText">See Plans</span>
            <span className="home_heroCtaPrimaryIcon" aria-hidden="true">
              <ArrowRight size={18} />
            </span>
          </a>
          <a className="home_heroCtaSecondary" href="#features">
            What’s Included
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
