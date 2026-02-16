import { ChevronDown } from "lucide-react";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import Logo from "../../assets/orange-servers-logo.png";

type HomeNavItem = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

const Navbar = () => {
  const items: HomeNavItem[] = useMemo(
    () => [
      { label: "Product", href: "#", hasDropdown: true },
      { label: "Solutions", href: "#", hasDropdown: true },
      { label: "Trusted AI", href: "/trusted-by" },
      { label: "About", href: "#" },
    ],
    [],
  );

  const activeIndex = 0;
  const pillRef = useRef<HTMLUListElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const [highlight, setHighlight] = useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    o: 0,
  });

  const moveHighlightTo = (el: HTMLAnchorElement | null) => {
    const pill = pillRef.current;
    if (!pill || !el) return;

    const pillRect = pill.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setHighlight({
      x: elRect.left - pillRect.left,
      y: elRect.top - pillRect.top,
      w: elRect.width,
      h: elRect.height,
      o: 1,
    });
  };

  useLayoutEffect(() => {
    moveHighlightTo(linkRefs.current[activeIndex] ?? null);

    const handleResize = () => {
      moveHighlightTo(linkRefs.current[activeIndex] ?? null);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <div className="home_navbar z-5 flex justify-center">
      <nav className="flex justify-evenly items-center m-auto w-full">
        <div className="nav_logo">
          <img className="home_navLogo" src={Logo} alt="OrangeServers" />
        </div>
        <div className="hero_navlinks">
          <ul
            ref={pillRef}
            className="home_navPill"
            aria-label="Primary"
            onMouseLeave={() =>
              moveHighlightTo(linkRefs.current[activeIndex] ?? null)
            }
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                moveHighlightTo(linkRefs.current[activeIndex] ?? null);
              }
            }}
          >
            <span
              className="home_navPillHighlight"
              aria-hidden="true"
              style={{
                transform: `translate3d(${highlight.x}px, ${highlight.y}px, 0)`,
                width: `${highlight.w}px`,
                height: `${highlight.h}px`,
                opacity: highlight.o,
              }}
            />
            {items.map((item, idx) => {
              const isActive = idx === 0;
              return (
                <li key={item.label} className="home_navPillItem">
                  <a
                    ref={(el) => {
                      linkRefs.current[idx] = el;
                    }}
                    className={
                      "home_navPillLink" + (isActive ? " is_active" : "")
                    }
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onMouseEnter={(e) => moveHighlightTo(e.currentTarget)}
                    onFocus={(e) => moveHighlightTo(e.currentTarget)}
                  >
                    <span className="home_navPillText">{item.label}</span>
                    {item.hasDropdown ? (
                      <ChevronDown size={16} className="home_navPillIcon" />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div className="flex items-center hero_signin gap-1">
            <button className="">Login</button>
            <button className="">Register </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
