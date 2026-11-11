import Reveal from "../components/Reveal";
import { principles, site } from "../content/site";
import { reduced, usePinnedSteps } from "../utils/motion";

const FIRST = "We build Nano Banana for anyone with an idea.";
const REST = "You describe it, the app makes it, and the prompt stays with the result so you can try again. No design tools. No settings to study.";

/** Sticky manifesto: words light up from dim to white as the page scrolls. */
function Manifesto() {
  const first = FIRST.split(" ");
  const rest = REST.split(" ");
  const { ref, active } = usePinnedSteps<HTMLElement>(rest.length + 1);
  const all = reduced();
  return (
    <section className="mani" ref={ref}>
      <div className="mani__stage">
        <h1 className="mani__text" aria-label={`${FIRST} ${REST}`}>
          <span aria-hidden="true">
            {first.map((w, i) => <span key={`f${i}`} className="mw is-lit">{w} </span>)}
            {rest.map((w, i) => <span key={`r${i}`} className={`mw${all || i < active ? " is-lit" : ""}`}>{w} </span>)}
          </span>
        </h1>
        <div className="mani__hint" aria-hidden="true">
          <div><i style={{ transform: `scaleX(${Math.max(0.08, active / rest.length)})` }} /></div>
          <span>Keep scrolling</span>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <Manifesto />
      <section className="container rows">
        {principles.map((p, i) => (
          <Reveal className="rows__row" key={p.title} delay={i * 80}>
            <h2 className="rows__title">{p.title}</h2>
            <p className="muted">{p.text}</p>
          </Reveal>
        ))}
        <Reveal className="maker">
          <h2 className="h-card">Who Makes It</h2>
          <p className="muted">
            Nano Banana is made by {site.operator}, an independent developer in Berlin, Germany. Questions and ideas go to{" "}
            <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <p className="small dim">{site.disclaimer}</p>
        </Reveal>
      </section>
    </>
  );
}
