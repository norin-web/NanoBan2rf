import { useState } from "react";
import Btn from "../components/Btn";
import Reveal from "../components/Reveal";
import Split from "../components/Split";
import { app, facts, reel, scenarios, steps, storeLine, studio, styles } from "../content/site";
import { img } from "../utils/img";
import { useScrollVar } from "../utils/motion";

const Icon = {
  heart: <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />,
  recreate: <><path d="M20 12a8 8 0 1 1-2.3-5.6" /><path d="M20 4v5h-5" /></>,
  edit: <><path d="M4 20h4L19 9l-4-4L4 16v4z" /><path d="M13.5 6.5l4 4" /></>,
  share: <><path d="M12 15V3" /><path d="M8 7l4-4 4 4" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" /></>,
  remove: <><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></>,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" /></>,
};
const Svg = ({ d, size = 22 }: { d: JSX.Element; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);

function Hero() {
  return (
    <section className="hero">
      <img className="hero__wave" src={img("/images/wave.svg")} alt="" aria-hidden="true" />
      <div className="hero__copy">
        <Reveal as="span" className="eyebrow">AI image &amp; video creator for iPhone</Reveal>
        <Split as="h1" className="h-hero" parts={[["Describe It."], ["\n"], ["Watch It Appear."]]} />
        <Reveal as="p" className="lead hero__lead" delay={300}>
          Nano Banana turns a short prompt into an image or a video, and edits any photo with plain words.
        </Reveal>
        <Reveal className="hero__cta" delay={450}>
          <Btn href={app.url}>Download on the App Store</Btn>
          <span className="small dim">{storeLine}</span>
        </Reveal>
      </div>
      <Reveal className="hero__phone rise" delay={250}>
        <img src={img("/images/phone-home.webp")} alt="Nano Banana Home screen with styles, Edit image mode, Create image and Create video" width={340} height={717} />
      </Reveal>
    </section>
  );
}

function Reel() {
  return (
    <section className="reel section">
      <div className="reel__row">
        {reel.map((r, i) => (
          <Reveal className="reel__item" key={r.title} delay={i * 120}>
            <img src={img(r.img)} alt={`${r.title} screen`} width={300} height={632} loading="lazy" />
            <h3 className="h-card">{r.title}</h3>
            <p className="muted">{r.text}</p>
          </Reveal>
        ))}
      </div>
      <Btn to="/app" variant="outline">Explore the app</Btn>
    </section>
  );
}

function Facts() {
  const ref = useScrollVar<HTMLElement>();
  return (
    <section className="facts" ref={ref}>
      <svg className="facts__arc" viewBox="0 0 700 700" aria-hidden="true">
        <defs>
          <linearGradient id="arc" x1="350" y1="0" x2="350" y2="700" gradientUnits="userSpaceOnUse">
            <stop stopColor="#277EFF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#277EFF" />
            <stop offset="1" stopColor="#277EFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M350 2 A348 348 0 0 1 350 698" stroke="url(#arc)" strokeWidth="3" fill="none" />
      </svg>
      <ul>
        {facts.map((f, i) => (
          <li key={f} style={{ ["--i" as string]: i }}>{f}</li>
        ))}
      </ul>
    </section>
  );
}

function Bento() {
  return (
    <section className="section container">
      <div className="head head--center">
        <h2 className="h2">Everything in One App</h2>
        <p className="lead">Images, edits, videos and a chat assistant, all built around the same simple prompt box.</p>
      </div>
      <div className="bento">
        <Reveal className="tile tile--accent tile--s">
          <h3 className="h-card">Create Image</h3>
          <p>Describe what you want to see. Choose 1:1, 2:3, 3:4 or 4:3 and one of {styles.length} styles, then tap Generate.</p>
        </Reveal>
        <Reveal className="tile tile--m" delay={80}>
          <h3 className="h-card">Create Video</h3>
          <p className="muted">Text to Video or Image to Video, with length and quality settings.</p>
          <img className="tile__phone tile__phone--r" src={img("/images/phone-create-video.webp")} alt="Create Video screen" loading="lazy" />
        </Reveal>
        <Reveal className="tile tile--l" delay={160}>
          <h3 className="h-card">Edit Image</h3>
          <p className="muted">Add your photo and say what to change: background, light, outfit, mood.</p>
          <img className="tile__phone tile__phone--r" src={img("/images/phone-edit-image.webp")} alt="Edit Image screen" loading="lazy" />
        </Reveal>
        <Reveal className="tile tile--half tile--bottom">
          <img className="tile__phone tile__phone--top tile__phone--right" src={img("/images/phone-chat.webp")} alt="AI Chat screen" loading="lazy" />
          <h3 className="h-card">AI Chat</h3>
          <p className="muted">Ask anything, attach a picture, keep every conversation in one list.</p>
        </Reveal>
        <Reveal className="tile tile--half tile--bottom tile--end" delay={80}>
          <img className="tile__phone tile__phone--top tile__phone--left" src={img("/images/phone-history.webp")} alt="History screen" loading="lazy" />
          <h3 className="h-card">History</h3>
          <p className="muted">Every image and video in one place. Filter by type and keep favorites.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Studio() {
  const [tab, setTab] = useState(0);
  const t = studio.tabs[tab];
  const [l1, l2, l3, l4] = studio.labels;
  const Label = ({ l, side }: { l: (typeof studio.labels)[number]; side: "l" | "r" }) => (
    <div className={`studio__label studio__label--${side}`}>
      <h3 className="h-card">{l.title}</h3>
      <p className="muted">{l.text}</p>
    </div>
  );
  return (
    <section className="section studio">
      <div className="head head--center container">
        <h2 className="h2">Fine-Tune Every Result</h2>
        <p className="lead">Format, style and length sit right under the prompt, so you change them before you generate.</p>
        <div className="seg" role="tablist" aria-label="Result type">
          {studio.tabs.map((s, i) => (
            <button key={s.id} role="tab" aria-selected={tab === i} className={tab === i ? "is-on" : ""} onClick={() => setTab(i)}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="studio__stage">
        <div className="studio__side">
          <Label l={l1} side="l" />
          <Label l={l2} side="l" />
        </div>
        <div className={`studio__media${t.phone ? " is-phone" : ""}`}>
          {studio.tabs.map((s, i) => (
            <img key={s.id} src={img(s.img)} alt={i === tab ? s.alt : ""} aria-hidden={i !== tab} className={`${s.phone ? "phone" : "photo"}${i === tab ? " is-on" : ""}`} loading="lazy" />
          ))}
        </div>
        <div className="studio__side">
          <Label l={l3} side="r" />
          <Label l={l4} side="r" />
        </div>
      </div>
    </section>
  );
}

function Control() {
  const ring: [keyof typeof Icon, string][] = [["recreate", "Recreate"], ["edit", "Edit the prompt"], ["share", "Share"], ["remove", "Delete"], ["copy", "Copy the prompt"]];
  return (
    <section className="control">
      <div className="control__rail" aria-hidden="true" />
      <div className="control__core" aria-hidden="true"><Svg d={Icon.heart} size={30} /></div>
      <Reveal className="control__text">
        <h2 className="h2 h2--sm">Every Result in Your Hands</h2>
        <p className="lead lead--wide">Recreate it, edit the prompt, share it, mark it as a favorite or delete it. One menu on every result, and History keeps the rest.</p>
        <ul className="control__ring" aria-label="Result actions">
          {ring.map(([k, label], i) => (
            <li key={k} className={`ring ring--${i}`} title={label}>
              <Svg d={Icon[k]} />
              <span className="sr">{label}</span>
            </li>
          ))}
        </ul>
        <Btn to="/app" variant="white">See all features</Btn>
      </Reveal>
    </section>
  );
}

function Steps() {
  return (
    <section className="section steps">
      <svg className="steps__curve" viewBox="0 0 1440 360" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="cv" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#277EFF" stopOpacity="0" />
            <stop offset="0.3" stopColor="#277EFF" />
            <stop offset="0.7" stopColor="#277EFF" />
            <stop offset="1" stopColor="#277EFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cvf" x1="0" y1="80" x2="0" y2="360" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0946B9" stopOpacity="0.35" />
            <stop offset="1" stopColor="#0946B9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 250 C 300 250 420 300 640 230 C 860 160 1000 60 1440 80 L1440 360 L0 360 Z" fill="url(#cvf)" />
        <path className="steps__line" d="M0 250 C 300 250 420 300 640 230 C 860 160 1000 60 1440 80" stroke="url(#cv)" strokeWidth="2.5" fill="none" />
      </svg>
      <div className="container">
        <div className="head head--center">
          <h2 className="h2">Start in Three Steps</h2>
          <p className="lead">From the App Store to your first picture, no setup needed.</p>
        </div>
        <ol className="steps__row">
          {steps.map((s, i) => (
            <Reveal as="li" className="step" key={s.title} delay={i * 120}>
              {s.icon && <img src={img("/images/app-icon.png")} alt="" width={64} height={64} className="step__icon" />}
              <div className="step__text">
                <span className="step__n">Step {i + 1}</span>
                <h3 className="h-card">{s.title}</h3>
                <p className="muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Styles() {
  return (
    <section className="section">
      <div className="head head--center container">
        <h2 className="h2">{styles.length} Styles, One Tap</h2>
        <p className="lead">Pick a look before you generate, or leave it off and let the prompt decide.</p>
      </div>
      <div className="styles">
        <ul className="styles__grid">
          {styles.map((s) => (
            <li key={s.name} className="style">
              <img src={img(s.img)} alt={`${s.name} style example`} width={144} height={144} loading="lazy" />
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Scenarios() {
  return (
    <section className="section container">
      <div className="head head--center">
        <h2 className="h2">Made for Everyday Ideas</h2>
        <p className="lead">A new avatar, a story cover, a wallpaper or a gift card, all from one sentence.</p>
      </div>
      <div className="scen">
        {scenarios.slice(0, 2).map((s) => <Scene key={s.title} {...s} />)}
        <Reveal className="scen__fact">
          <b>4</b>
          <span>ways to create: Create Image, Edit Image, Text to Video and Image to Video.</span>
        </Reveal>
        {scenarios.slice(2).map((s) => <Scene key={s.title} {...s} />)}
      </div>
    </section>
  );
}
const Scene = ({ img: src, title, text }: { img: string; title: string; text: string }) => (
  <Reveal className="scene">
    <img src={img(src)} alt="" loading="lazy" />
    <div>
      <h3 className="h-card">{title}</h3>
      <p>{text}</p>
    </div>
  </Reveal>
);

function Cta() {
  return (
    <section className="cta section">
      <div className="cta__copy">
        <h2 className="h2">Your Next Idea Starts Here</h2>
        <p className="lead">Download Nano Banana and turn the first thing on your mind into a picture.</p>
        <Btn href={app.url}>Download on the App Store</Btn>
      </div>
      <Reveal className="cta__phone">
        <img src={img("/images/phone-create-image.webp")} alt="A finished result with its prompt and a Save button" width={340} height={717} loading="lazy" />
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Reel />
      <Facts />
      <Bento />
      <Studio />
      <Control />
      <Steps />
      <Styles />
      <Scenarios />
      <Cta />
    </>
  );
}
