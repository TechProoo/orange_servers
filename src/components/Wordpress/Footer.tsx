import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer_section" aria-label="Footer">
      <div className="footer_glow" aria-hidden />
      <div className="footer_container">
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
