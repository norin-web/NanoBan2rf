import Btn from "../components/Btn";
import { img } from "../utils/img";

export default function NotFound() {
  return (
    <section className="nf">
      <img className="nf__wave" src={img("/images/wave.svg")} alt="" aria-hidden="true" />
      <h1 className="h1">This Page Didn’t Generate</h1>
      <p className="lead">Error 404. The link may be old or mistyped.</p>
      <Btn to="/">Back to Home</Btn>
    </section>
  );
}
