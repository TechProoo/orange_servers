import { useMemo } from "react";

const TrustedBy = () => {
  const logos = useMemo(
    () => ["VISA", "MASTERCARD", "OPAY", "PAYSTACK", "MONIEPOINT"],
    [],
  );

  return (
    <section id="trusted-by" className="trustedBy" aria-label="Trusted by">
      <div className="trustedBy__inner">
        <h2 className="trustedBy__title">
          loved by
          <span className="trustedBy__titleItalic"> leaders </span> <br /> and{" "}
          <span className="trustedBy__titleItalic">trusted</span>
          <br />
          <span className="trustedBy__titleStrong">
            by
            <span className="trustedBy__titleItalic"> modern </span>
            <br /> teams
          </span>
        </h2>

        <p className="trustedBy__sub">
          Built for reliable performance and peace of mind from deploy to scale.
        </p>

        <div className="trustedBy__logos" aria-label="Trusted by logos">
          <div className="trustedBy__logosTrack">
            <div className="trustedBy__logosGroup">
              {logos.map((name) => (
                <div key={name} className="trustedBy__logo" aria-label={name}>
                  {name}
                </div>
              ))}
            </div>
            <div className="trustedBy__logosGroup" aria-hidden="true">
              {logos.map((name) => (
                <div
                  key={`${name}-dup`}
                  className="trustedBy__logo"
                  aria-label={name}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
