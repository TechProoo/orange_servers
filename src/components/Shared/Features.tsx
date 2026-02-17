const Features = () => {
  return (
    <section
      id="features"
      className="homePricing_section"
      aria-label="Features"
    >
      <div className="homePricing_container">
        <header className="homePricing_header">
          <h2 className="homePricing_title">
            What <span className="text_style">you get</span>
          </h2>
          <p className="homePricing_subtitle">
            A clean baseline for real websites — the essentials are included,
            and the experience stays simple.
          </p>
        </header>

        <div
          className="homePricing_grid"
          role="list"
          aria-label="Included features"
        >
          <article className="homePricing_plan" role="listitem">
            <div className="homePricing_planTop">
              <div className="homePricing_planName">Security included</div>
              <div className="homePricing_badge">SSL</div>
            </div>
            <p className="homePricing_planTagline">
              HTTPS-ready out of the box with the basics handled.
            </p>
            <ul className="homePricing_planFeatures">
              <li className="homePricing_planFeature">
                <span className="homePricing_check" aria-hidden />
                SSL certificate included
              </li>
              <li className="homePricing_planFeature">
                <span className="homePricing_check" aria-hidden />
                Malware-aware monitoring
              </li>
              <li className="homePricing_planFeature">
                <span className="homePricing_check" aria-hidden />
                Reliable updates and maintenance
              </li>
            </ul>
          </article>

          <article className="homePricing_plan" role="listitem">
            <div className="homePricing_planTop">
              <div className="homePricing_planName">Email + databases</div>
              <div className="homePricing_badge">Included</div>
            </div>
            <p className="homePricing_planTagline">
              Everything you need for forms, mail, and data.
            </p>
            <ul className="homePricing_planFeatures">
              <li className="homePricing_planFeature">
                <span className="homePricing_check" aria-hidden />
                Unlimited emails
              </li>
              <li className="homePricing_planFeature">
                <span className="homePricing_check" aria-hidden />
                Unlimited databases
              </li>
              <li className="homePricing_planFeature">
                <span className="homePricing_check" aria-hidden />
                Works great for CMS + apps
              </li>
            </ul>
          </article>

          <article className="homePricing_plan" role="listitem">
            <div className="homePricing_planTop">
              <div className="homePricing_planName">Simple control</div>
              <div className="homePricing_badge">cPanel</div>
            </div>
            <p className="homePricing_planTagline">
              Manage domains, files, email, and backups without the headache.
            </p>
            <ul className="homePricing_planFeatures">
              <li className="homePricing_planFeature">
                <span className="homePricing_check" aria-hidden />
                cPanel® / DirectAdmin options
              </li>
              <li className="homePricing_planFeature">
                <span className="homePricing_check" aria-hidden />
                One-click workflows
              </li>
              <li className="homePricing_planFeature">
                <span className="homePricing_check" aria-hidden />
                Support when you need it
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Features;
