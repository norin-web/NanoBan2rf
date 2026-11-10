import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { nav, app, site } from "../content/site";
import { img } from "../utils/img";
import { useScrolled } from "../utils/motion";
import Btn from "./Btn";

/** Sticky header: always visible, gains a solid ground once the page scrolls. */
export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`header${scrolled || open ? " is-solid" : ""}`}>
        <Link to="/" className="logo" aria-label={`${site.brand} home`}>
          <img src={img("/images/app-icon.png")} alt="" width={32} height={32} />
          <span>{site.brand}</span>
        </Link>
        <nav className="header__nav" aria-label="Main">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"} className={({ isActive }) => `navlink${isActive ? " is-active" : ""}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <Btn href={app.url} variant="white" size="sm" className="header__cta">Download</Btn>
        <button
          className={`burger${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mmenu"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </header>
      <div id="mmenu" className={`mmenu${open ? " is-open" : ""}`} aria-hidden={!open}>
        {nav.map((n) => (
          <Link key={n.to} to={n.to} className="mmenu__link" tabIndex={open ? 0 : -1}>
            {n.label}
          </Link>
        ))}
        <Btn href={app.url}>Download on the App Store</Btn>
      </div>
    </>
  );
}
