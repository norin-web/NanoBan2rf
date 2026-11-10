import Btn from "../components/Btn";
import Reveal from "../components/Reveal";
import Split from "../components/Split";
import { app, appFeatures, specs } from "../content/site";
import { img } from "../utils/img";
import { scrollToStep, usePinnedSteps } from "../utils/motion";

/** One phone stays pinned in the middle while the features scroll past it. */
function Pinned() {
  const n = appFeatures.length;
  const { ref, active } = usePinnedSteps<HTMLElement>(n);
  const f = appFeatures[active];
  return (
    <section className="pin" ref={ref} style={{ ["--steps" as string]: n }} aria-label="Inside the app">
      <div className="pin__stage">
        <ol className="pin__track">
          {appFeatures.map((x, i) => (
            <li key={x.title} className={i === active ? "is-on" : Math.abs(i - active) === 1 ? "is-near" : ""}>
              <button onClick={() => scrollToStep(ref.current, i, n)} aria-current={i === active ? "step" : undefined}>
                <i aria-hidden="true" />
                {x.title}
              </button>
            </li>
          ))}
        </ol>
        <div className="pin__phone">
          {appFeatures.map((x, i) => (
            <img key={x.title} src={img(x.img)} alt={i === active ? `${x.title} screen` : ""} aria-hidden={i !== active} className={i === active ? "is-on" : ""} width={340} height={717} loading={i ? "lazy" : undefined} />
          ))}
        </div>
        <div className="pin__detail" aria-live="polite">
          <span className="pin__count">{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
          <h2 className="pin__mtitle h-card">{f.title}</h2>
          <p key={f.title} className="pin__text">{f.text}</p>
          <ul className="chips">
            {f.chips.map((c) => <li key={c} className="chip">{c}</li>)}
          </ul>
        </div>
        <div className="pin__bar" aria-hidden="true"><i /></div>
      </div>
    </section>
  );
}

export default function OurApp() {
  return (
    <>
      <section className="phero">
        <img className="phero__wave" src={img("/images/wave.svg")} alt="" aria-hidden="true" />
        <Reveal as="span" className="eyebrow">The app</Reveal>
        <Split as="h1" className="h1" parts={[["One Prompt Box, Four Ways to Create"]]} />
        <Reveal as="p" className="lead" delay={300}>
          Create Image, Edit Image, Text to Video and Image to Video, plus an AI Chat and a History of everything you made.
        </Reveal>
        <Reveal className="phero__cta" delay={420}><Btn href={app.url}>Download on the App Store</Btn></Reveal>
        <div className="strip">
          {[1, 2, 3, 4].map((i) => (
            <Reveal key={i} delay={i * 90}>
              <img src={img(`/images/aso/aso-${i}.webp`)} alt={`App Store screenshot ${i}`} width={270} height={587} loading="lazy" />
            </Reveal>
          ))}
        </div>
      </section>

      <Pinned />

      <section className="section container specs">
        <div className="specs__head">
          <h2 className="h2 h2--sm">Details</h2>
          <p className="muted">Facts from the app and its subscription screen.</p>
        </div>
        <dl className="specs__table">
          {specs.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
