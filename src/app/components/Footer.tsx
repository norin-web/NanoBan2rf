import { Link } from "react-router";
import { app, nav, site } from "../content/site";
import { img } from "../utils/img";
import Btn from "./Btn";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <Link to="/" className="logo logo--lg">
            <img src={img("/images/app-icon.png")} alt="" width={56} height={56} />
            <span>{site.brand}</span>
          </Link>
          <p className="muted">AI images, photo edits and short videos from a single prompt, on iPhone.</p>
          <Btn href={app.url} variant="white">Download on the App Store</Btn>
        </div>
        <div className="footer__cols">
          <div>
            <span className="label">Pages</span>
            <ul>
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <span className="label">Help</span>
            <ul>
              <li><Link to="/feedback">Feedback</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Use</Link></li>
            </ul>
          </div>
          <div>
            <span className="label">Contact</span>
            <ul>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={app.url} target="_blank" rel="noopener noreferrer">App Store</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>
          © {site.year} {site.operator || site.brand}.{site.disclaimer && ` ${site.disclaimer}`}
        </span>
        <button onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
      </div>
    </footer>
  );
}
