// Legal texts are supplied by the owner and must be reproduced VERBATIM.
// Only markup may change: section headings become "## " lines, bullets "- ".
// PLACEHOLDER — the owner's Privacy Policy and Terms have not arrived yet
// (2026-11-10). Replace `body` with the full text and set `legalUpdated`.

export const legalUpdated = "";

const pending = (doc: string) =>
  `The full ${doc} for Nano Banana will be published on this page before the app is released.\n\n## Questions\n\nUntil then, write to sophia@baumgartnerapp.click with any question about the ${doc}.`;

type Doc = {
  title: string;
  current: "privacy" | "terms";
  body: string;
  // "At a glance" is a site summary, not part of the document. Fill it in once the text arrives.
  glance: string;
  other: { to: string; label: string };
};

export const privacy: Doc = {
  title: "Privacy Policy",
  current: "privacy",
  body: pending("Privacy Policy"),
  glance: "",
  other: { to: "/terms", label: "Terms of Use" },
};

export const terms: Doc = {
  title: "Terms of Use",
  current: "terms",
  body: pending("Terms of Use"),
  glance: "",
  other: { to: "/privacy", label: "Privacy Policy" },
};
