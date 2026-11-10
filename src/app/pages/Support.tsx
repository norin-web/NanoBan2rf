import { faq, site } from "../content/site";
import { reduced, scrollToStep, usePinnedSteps } from "../utils/motion";

/** Questions as a deck: scrolling slides the top card away and brings up the next. */
export default function Support() {
  const n = faq.length;
  const { ref, active } = usePinnedSteps<HTMLElement>(n);
  const plain = reduced();
  return (
    <section className={`deck${plain ? " deck--plain" : ""}`} ref={ref} style={{ ["--steps" as string]: n }}>
      <div className="deck__stage">
        <div className="deck__intro">
          <h1 className="h1 h1--sm">How Can We Help?</h1>
          <p className="lead">Scroll through the questions people ask most. Each card slides away to reveal the next one.</p>
          <div className="deck__count" aria-hidden={plain}>
            <b>{active + 1}</b>
            <span>of {n}</span>
          </div>
          <div className="deck__mail">
            <span className="small dim">Didn’t find it?</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
        <div className="deck__cards">
          {faq.map((f, i) => {
            const d = i - active;
            const state = d < 0 ? "is-gone" : d === 0 ? "is-top" : d <= 2 ? `is-back is-back-${d}` : "is-hidden";
            const next = faq[i + 1];
            return (
              <article key={f.q} className={`qcard ${plain ? "" : state}`} aria-hidden={!plain && d !== 0}>
                <div className="qcard__body">
                  <span className="qcard__tag">{f.tag}</span>
                  <h2 className="qcard__q">{f.q}</h2>
                  <p className="qcard__a">{f.a}</p>
                </div>
                {next && !plain && (
                  <button className="qcard__next" onClick={() => scrollToStep(ref.current, i + 1, n)} tabIndex={d === 0 ? 0 : -1}>
                    <span>Next: {next.q}</span>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
