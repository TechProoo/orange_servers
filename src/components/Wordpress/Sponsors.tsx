import Visa from "../../assets/visa.png";
import JCB from "../../assets/jcb.png";
import Master from "../../assets/master-card.png";
import Paypal from "../../assets/paypal.png";
import Monie from "../../assets/monie.jpg";
import Opay from "../../assets/opay.jpg";

const Sponsors = () => {
  const logos = [
    { src: Visa, alt: "Visa" },
    { src: Master, alt: "Mastercard" },
    { src: Paypal, alt: "PayPal" },
    { src: JCB, alt: "JCB" },
    { src: Monie, alt: "Monie" },
    { src: Opay, alt: "Opay" },
  ];

  return (
    <section id="sponsors" className="sponsors_section" aria-label="Sponsors">
      <div className="sponsors_container">
        <header className="sponsors_header">
          <p className="sponsors_kicker">Trusted payments</p>
          <h2 className="sponsors_title">Powered by Industry Leaders</h2>
          <p className="sponsors_subtitle">
            Secure, globally recognized providers your customers already trust.
          </p>
        </header>

        <div className="sponsors_strip" role="list" aria-label="Sponsor logos">
          <div className="sponsors_fade sponsors_fadeLeft" aria-hidden />
          <div className="sponsors_fade sponsors_fadeRight" aria-hidden />

          <div className="sponsors_marquee">
            <div className="sponsors_track">
              <div className="sponsors_group">
                {logos.map((logo) => (
                  <div className="sponsors_logo" role="listitem" key={logo.alt}>
                    <img src={logo.src} alt={logo.alt} loading="lazy" />
                  </div>
                ))}
              </div>

              <div className="sponsors_group" aria-hidden="true">
                {logos.map((logo) => (
                  <div
                    className="sponsors_logo"
                    role="listitem"
                    key={`${logo.alt}-dup`}
                  >
                    <img src={logo.src} alt={logo.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
