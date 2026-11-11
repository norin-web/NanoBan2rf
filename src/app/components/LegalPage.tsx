import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { site } from "../content/site";
import { legalOperator, legalUpdated } from "../content/legal";
import { img } from "../utils/img";
import Split from "./Split";
import Btn from "./Btn";

type Doc = {
  title: string;
  current: "privacy" | "terms";
  body: string;
  glance: string;
  other: { to: string; label: string };
};

type Section = { id: string; title: string; blocks: string[] };

const pad = (n: number) => String(n).padStart(2, "0");

// Inline markup only: **bold** lead-ins, [text](url) links and plain email addresses.
// The words themselves are rendered exactly as written.
const linkify = (text: string) =>
  text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|\S+@\S+\.[a-z]{2,})/i).map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">{link[1]}</a>;
    if (/^\S+@\S+\.[a-z]{2,}$/i.test(part)) return <a key={i} href={`mailto:${part}`}>{part}</a>;
    return part;
  });

// "IN BRIEF" / "PLEASE NOTE" summaries in the documents sit in a quiet panel
const isNote = (text: string) => /^\*\*(IN BRIEF|PLEASE NOTE)\*\*/.test(text);

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Split the verbatim text into an intro and "## " sections; wording is never changed. */
function parse(body: string) {
  const intro: string[] = [];
  const sections: Section[] = [];
  for (const block of body.split(/\n{2,}/)) {
    if (block.startsWith("## ")) {
      const title = block.slice(3);
      sections.push({ id: slug(title), title, blocks: [] });
    } else if (sections.length) sections[sections.length - 1].blocks.push(block);
    else intro.push(block);
  }
  return { intro, sections };
}

function Block({ text }: { text: string }): ReactNode {
  if (text.startsWith("### ")) return <h3>{text.slice(4)}</h3>;
  if (text.startsWith("- "))
    return (
      <ul>
        {text.split("\n").map((li, j) => <li key={j}>{linkify(li.replace(/^- /, ""))}</li>)}
      </ul>
    );
  // all-caps legal clauses get a quiet panel so they don't shout across the page
  const caps = text.length > 40 && text === text.toUpperCase();
  return (
    <p className={caps ? "legal-caps" : isNote(text) ? "legal-note" : undefined}>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {linkify(line)}
        </Fragment>
      ))}
    </p>
  );
}

/** Split screen: the left half pins a giant number of the section being read. */
export default function LegalPage({ doc }: { doc: Doc }) {
  const { intro, sections } = useMemo(() => parse(doc.body), [doc.body]);
  const [active, setActive] = useState(0);

  // the active section is the last one whose heading passed 40% of the viewport
  useEffect(() => {
    const onScroll = () => {
      let cur = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < innerHeight * 0.4) cur = i;
      });
      setActive(cur);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [sections]);

  const cur = sections[active];
  const docs = [
    { key: "privacy", to: "/privacy", label: "Privacy Policy" },
    { key: "terms", to: "/terms", label: "Terms of Use" },
  ];
  const ordered = doc.current === "terms" ? [docs[1], docs[0]] : docs;

  return (
    <>
      <section className="lhero">
        <img className="lhero__wave" src={img("/images/wave.svg")} alt="" aria-hidden="true" />
        <span className="eyebrow">Legal</span>
        <Split as="h1" className="h1" parts={[[doc.title]]} />
        <dl className="lhero__meta">
          <div><dt>Effective date</dt><dd>{legalUpdated}</dd></div>
          <div><dt>Operator</dt><dd>{legalOperator}</dd></div>
          <div><dt>Sections</dt><dd>{sections.length}</dd></div>
          <div><dt>Questions</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
          <div><dt>Also read</dt><dd><Link to={doc.other.to} className="link">{doc.other.label}</Link></dd></div>
        </dl>
      </section>

      <section className="lsplit">
        <aside className="lsplit__pin">
          <nav className="seg" aria-label="Documents">
            {ordered.map((d) => (
              <Link key={d.key} to={d.to} className={d.key === doc.current ? "is-on" : ""} aria-current={d.key === doc.current ? "page" : undefined}>
                {d.label}
              </Link>
            ))}
          </nav>
          <div className="lsplit__now" aria-hidden="true">
            <span key={active} className="lsplit__n">{pad(active + 1)}</span>
            <span className="lsplit__t">{cur?.title}</span>
          </div>
          <div className="lsplit__progress" aria-hidden="true">
            <span>{pad(active + 1)}</span>
            <div><i style={{ transform: `scaleX(${(active + 1) / Math.max(1, sections.length)})` }} /></div>
            <span className="dim">{pad(sections.length)}</span>
          </div>
        </aside>

        <article className="lsplit__text">
          {doc.glance && (
            <div className="glance">
              <span className="label label--accent">At a glance</span>
              <p>{doc.glance}</p>
              <p className="small dim">A short summary for convenience. The full text below is what applies.</p>
            </div>
          )}
          {intro.map((t, i) => <p className={`lsec__intro${isNote(t) ? " legal-note" : ""}`} key={i}>{linkify(t)}</p>)}
          {sections.map((s, i) => (
            <section className="lsec" id={s.id} key={s.id}>
              <h2><span className="lsec__n">{pad(i + 1)}</span>{s.title}</h2>
              {s.blocks.map((b, j) => <Block key={j} text={b} />)}
            </section>
          ))}
          <div className="ask">
            <div>
              <h3 className="h-card">Questions?</h3>
              <a className="muted" href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <Btn to="/contact" variant="white">Contact us</Btn>
          </div>
        </article>
      </section>
    </>
  );
}
