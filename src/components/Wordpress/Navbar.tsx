import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

import Logo from "../../assets/orange-servers-logo.png";

type NavLink = {
  label: string;
  href: string;
};

const Navbar = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    if (!isOpen) return;
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const links = useMemo<NavLink[]>(
    () => [
      { label: "Features", href: "#features" },
      { label: "Method", href: "#method" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Pricing", href: "#pricing" },
      { label: "Sponsors", href: "#sponsors" },
    ],
    [],
  );

  const easeOut = [0.16, 1, 0.3, 1] as const;

  return (
    <header className="nav_shell" data-scrolled={isScrolled ? "true" : "false"}>
      <div className="nav_backdrop" aria-hidden />

      <div className="nav_container">
        <a className="nav_brand" href="#top" aria-label="OrangeServers home">
          <img className="nav_logo" src={Logo} alt="OrangeServers" />
        </a>

        <nav className="nav_links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} className="nav_link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav_actions">
          <a className="nav_cta" href="#pricing">
            Get Started <ArrowUpRight size={16} />
          </a>

          <button
            type="button"
            className="nav_burger"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              className="nav_scrim"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="nav_mobile"
              initial={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.28, ease: easeOut }
              }
              role="dialog"
              aria-label="Mobile navigation"
            >
              <div className="nav_mobileInner">
                {links.map((l, idx) => (
                  <motion.a
                    key={l.href}
                    className="nav_mobileLink"
                    href={l.href}
                    onClick={() => setIsOpen(false)}
                    initial={
                      reduceMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.34,
                            ease: easeOut,
                            delay: 0.03 + idx * 0.04,
                          }
                    }
                  >
                    {l.label}
                  </motion.a>
                ))}

                <motion.a
                  className="nav_mobileCta"
                  href="#pricing"
                  onClick={() => setIsOpen(false)}
                  initial={
                    reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.34,
                          ease: easeOut,
                          delay: 0.06 + links.length * 0.04,
                        }
                  }
                >
                  Get Started <ArrowUpRight size={16} />
                </motion.a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
