import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import Logo from "../../assets/orange-servers-logo.png";

const Footer = () => {
  return (
    <footer className="footer_section" aria-label="Footer">
      <div className="footer_glow" aria-hidden />
      <div className="footer_container">
        <div className="footer_top">
          <div className="footer_brand">
            <div className="footer_logoRow">
              <img className="footer_logo" src={Logo} alt="Orange Servers" />
              <span className="footer_brandName">Orange Servers</span>
            </div>
            <p className="footer_tagline">
              Expert WordPress management with near-zero downtime.
            </p>

            <div className="footer_trust">
              <ShieldCheck size={18} className="footer_trustIcon" />
              <span>Secure operations, reliable uptime, fast support.</span>
            </div>
          </div>

          <nav className="footer_links" aria-label="Footer links">
            <div className="footer_col">
              <div className="footer_colTitle">Product</div>
              <a className="footer_link" href="#features">
                Features <ArrowUpRight size={14} />
              </a>
              <a className="footer_link" href="#pricing">
                Pricing <ArrowUpRight size={14} />
              </a>
              <a className="footer_link" href="#testimonials">
                Testimonials <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="footer_col">
              <div className="footer_colTitle">Company</div>
              <a className="footer_link" href="#">
                About <ArrowUpRight size={14} />
              </a>
              <a className="footer_link" href="#">
                Contact <ArrowUpRight size={14} />
              </a>
              <a className="footer_link" href="#">
                Status <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="footer_col">
              <div className="footer_colTitle">Legal</div>
              <a className="footer_link" href="#">
                Privacy <ArrowUpRight size={14} />
              </a>
              <a className="footer_link" href="#">
                Terms <ArrowUpRight size={14} />
              </a>
              <a className="footer_link" href="#">
                Cookies <ArrowUpRight size={14} />
              </a>
            </div>
          </nav>

          <div className="footer_newsletter">
            <div className="footer_colTitle">Get updates</div>
            <p className="footer_newsDesc">
              Monthly tips for uptime, performance, and WordPress security.
            </p>

            <form
              className="footer_form"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label className="footer_field">
                <Mail size={18} className="footer_fieldIcon" />
                <input
                  className="footer_input"
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </label>
              <button className="footer_submit" type="submit">
                Subscribe
              </button>
            </form>

            <div className="footer_note">No spam. Unsubscribe anytime.</div>
          </div>
        </div>

        <div className="footer_divider" aria-hidden />

        <div className="footer_bottom">
          <div className="footer_copy">
            © {new Date().getFullYear()} Orange Servers. All rights reserved.
          </div>

          <div className="footer_actions">
            <a className="footer_social" href="#" aria-label="Twitter">
              X
            </a>
            <a className="footer_social" href="#" aria-label="GitHub">
              GitHub
            </a>
            <a className="footer_social" href="#" aria-label="LinkedIn">
              LinkedIn
            </a>

            <a className="footer_toTop" href="#top" aria-label="Back to top">
              Back to top <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
