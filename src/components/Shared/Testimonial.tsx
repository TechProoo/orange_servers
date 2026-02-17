const Testimonial = () => {
  return (
    <section
      id="testimonials"
      className="homePricing_section"
      aria-label="Testimonials"
    >
      <div className="homePricing_container">
        <header className="homePricing_header">
          <h2 className="homePricing_title">
            Loved by <span className="text_style">everyday</span> builders
          </h2>
          <p className="homePricing_subtitle">
            Clean setup, steady performance, and support that doesn’t waste your
            time.
          </p>
        </header>

        <div
          className="homePricing_grid"
          role="list"
          aria-label="Customer quotes"
        >
          <article className="homePricing_plan" role="listitem">
            <div className="homePricing_planTop">
              <div className="homePricing_planName">Aisha</div>
              <div className="homePricing_badge">Business</div>
            </div>
            <p className="homePricing_planTagline">
              “Moved my site to OrangeServers and it just works — SSL, email,
              and the control panel were all ready to go.”
            </p>
          </article>

          <article className="homePricing_plan" role="listitem">
            <div className="homePricing_planTop">
              <div className="homePricing_planName">Daniel</div>
              <div className="homePricing_badge">Developer</div>
            </div>
            <p className="homePricing_planTagline">
              “Fast setup and consistent performance. Perfect shared hosting for
              client sites that don’t need a full VPS.”
            </p>
          </article>

          <article className="homePricing_plan" role="listitem">
            <div className="homePricing_planTop">
              <div className="homePricing_planName">Mariam</div>
              <div className="homePricing_badge">Creator</div>
            </div>
            <p className="homePricing_planTagline">
              “Support was quick and clear when I needed help with DNS. Great
              value for the price.”
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
