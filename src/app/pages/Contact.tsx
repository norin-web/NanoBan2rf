import { useState } from "react";
import Btn from "../components/Btn";
import { site, topics } from "../content/site";
import { img } from "../utils/img";

/** The address is the page: pick a topic, open the mail app or copy the address. */
export default function Contact() {
  const [topic, setTopic] = useState(topics[0]);
  const [copied, setCopied] = useState(false);
  const [user, domain] = site.email.split("@");
  const dot = domain.lastIndexOf(".");
  const mailto =`mailto:${site.email}?subject=${encodeURIComponent(`${site.brand}: ${topic}`)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      location.href = mailto;
    }
  };

  return (
    <section className="mail">
      <img className="mail__wave" src={img("/images/wave.svg")} alt="" aria-hidden="true" />
      <h1 className="mail__address">
        <a href={mailto}>
          {user}@<wbr />{domain.slice(0, dot)}<wbr />{domain.slice(dot)}
        </a>
      </h1>
      <p className="lead">Ideas, bugs, a style you miss or a question about your subscription. Pick a topic and your mail app opens with it filled in.</p>
      <div className="mail__topics" role="radiogroup" aria-label="Topic">
        {topics.map((t) => (
          <button key={t} role="radio" aria-checked={topic === t} className={`chip chip--btn${topic === t ? " is-on" : ""}`} onClick={() => setTopic(t)}>
            {t}
          </button>
        ))}
      </div>
      <div className="mail__actions">
        <Btn href={mailto}>Write an email</Btn>
        <Btn variant="outline" onClick={copy}>{copied ? "Copied" : "Copy address"}</Btn>
      </div>
      <span className="sr" role="status">{copied ? "Email address copied" : ""}</span>
    </section>
  );
}
