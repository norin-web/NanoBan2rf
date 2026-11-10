// Every brand / app fact lives here so names, IDs and emails are never duplicated.
// Facts come from the app's own screens (Figma "Nano Banana v2": Home, Create,
// Edit, Video, AI Chat, History, Choose Style, paywall). Nothing is claimed beyond them.
// PLACEHOLDER values wait for the owner's documents / the App Store release.

export const site = {
  brand: "Nano Banana",
  email: "sophia@baumgartnerapp.click",
  year: new Date().getFullYear(),
  // PLACEHOLDER — operator name and the brand disclaimer come from the owner's
  // Privacy Policy / Terms. Until then the footer shows the brand only.
  operator: "",
  disclaimer: "",
  url: "https://nanobananagen.skin/",
};

export const app = {
  id: "6827201844",
  url: "https://apps.apple.com/app/id6827201844",
  // App isn't live yet (iTunes lookup returns 0 results, 2026-11-10).
  // After release refresh minIOS / category / size / languages from
  // https://itunes.apple.com/lookup?id=6827201844 and add them to `specs`.
  minIOS: "",
  category: "AI image & video creator",
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/app", label: "App" },
  { to: "/about", label: "About" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
];

/** "Free to download · In-app purchases · iOS 17+" (iOS appears once known). */
export const storeLine = ["Free to download", "In-app purchases", app.minIOS && `iOS ${app.minIOS.split(".")[0]}+`]
  .filter(Boolean)
  .join(" · ");

// Paywall wording, verbatim.
export const facts = [
  "Unlimited image generations.",
  "Text and image to video.",
  "Edit any photo with a prompt.",
  "All styles, HD quality, no ads.",
];

export const reel = [
  { img: "/images/phone-styles.webp", title: "Create Image", text: "Write a prompt, pick a format and a style, tap Generate." },
  { img: "/images/phone-video.webp", title: "Create Video", text: "Start from text or from a photo and get a short clip." },
  { img: "/images/phone-edit-image.webp", title: "Edit Image", text: "Upload a photo and describe the change you want." },
];

export const formats = ["1:1", "2:3", "3:4", "4:3"];

export const styles = [
  "Realistic", "3D", "Cartoon", "Illustration", "Watercolor", "Surreal", "Pixel Art",
  "Minimalist", "Retro", "Fantasy", "Cyberpunk", "Sketch", "Comic",
].map((name) => ({ name, img: `/images/styles/style-${name.toLowerCase().replace(/\s+/g, "-")}.webp` }));

export const studio = {
  tabs: [
    { id: "image", label: "Image", img: "/images/results/portrait.webp", alt: "A generated portrait of a woman at sunset" },
    { id: "video", label: "Video", img: "/images/phone-video.webp", alt: "Video result screen in Nano Banana", phone: true },
    { id: "edit", label: "Edit", img: "/images/phone-edit-image.webp", alt: "Edit Image screen in Nano Banana", phone: true },
  ],
  labels: [
    { title: "Format", text: `${formats.slice(0, -1).join(", ")} or ${formats[formats.length - 1]} for posts, stories and wallpapers.` },
    { title: "Style", text: `${styles.length} looks, from Realistic and 3D to Watercolor and Pixel Art.` },
    { title: "Prompt", text: "Copy it from any result, tweak a word and generate again." },
    { title: "Save", text: "Keep the result on your iPhone or find it later in History." },
  ],
};

export const steps = [
  { title: "Get the App", text: "Download Nano Banana from the App Store on your iPhone.", icon: true },
  { title: "Describe or Upload", text: "Type what you want to see, or add a photo you want to change." },
  { title: "Generate and Save", text: "Tap Generate, then save the result or open it later in History." },
];

export const scenarios = [
  { img: "/images/results/neon-girl.webp", title: "Avatars", text: "A profile picture in any style you like." },
  { img: "/images/results/diver.webp", title: "Stories", text: "Covers and scenes for posts and reels." },
  { img: "/images/results/cyber-moto.webp", title: "Wallpapers", text: "A lock screen nobody else has." },
  { img: "/images/results/hedgehog.webp", title: "Cards & Gifts", text: "A one-off picture for a birthday note." },
];

/** App page: the pinned phone walks through these one by one. */
export const appFeatures = [
  { title: "Create Image", img: "/images/phone-create-image.webp", text: "Type a prompt, choose a format and a style. The result opens as soon as it is ready, with the prompt below it.", chips: formats },
  { title: "Edit Image", img: "/images/phone-edit-image.webp", text: "Add your photo and say what to change: background, light, outfit, mood. Generate, then save the edit.", chips: ["Add photo", "Describe the change"] },
  { title: "Create Video", img: "/images/phone-video.webp", text: "Start from a sentence or from a photo. Pick the format, length and quality, then tap Generate and watch the clip play.", chips: ["Text to Video", "Image to Video"] },
  { title: "AI Chat", img: "/images/phone-chat.webp", text: "Ask anything, attach a picture and keep every conversation in one list.", chips: ["Attach an image", "Chat history"] },
  { title: "History", img: "/images/phone-history.webp", text: "Every image and video you made, with its prompt. Filter by type and keep favorites.", chips: ["All", "Image", "Video", "Favorites"] },
];

export const specs: [string, string][] = [
  ["Price", "Free, offers in-app purchases"],
  ["Subscription", "Weekly $5.99 · Monthly $29.99"],
  ["Platform", app.minIOS ? `iPhone · iOS ${app.minIOS} or later` : "iPhone"],
  ["Create", "Image · Edit Image · Text to Video · Image to Video"],
  ["Styles", `${styles.length} styles`],
  ["Formats", formats.join(" · ")],
];

export const principles = [
  { title: "Plain Words", text: "No settings to study. If you can describe it, you can make it." },
  { title: "Your Results", text: "Save, share or delete any generation whenever you want." },
  { title: "No Ads", text: "The full app comes without ads, as listed on the subscription screen." },
];

// Answers follow the app's screens; subscription answers follow Apple's rules.
export const faq = [
  { tag: "Getting started", q: "How do I create my first image?", a: "Open Create image on the Home screen, describe what you want to see and tap Generate. You can pick a format and a style under the prompt before you start." },
  { tag: "Editing", q: "Can I change a photo I already have?", a: "Yes. Tap Edit image mode on the Home screen, add a photo, describe the change you want and tap Generate." },
  { tag: "Video", q: "How do I turn a photo into a video?", a: "Open Create video, switch to Image to Video, add a photo and write a prompt. Set the format, length and quality, then tap Generate." },
  { tag: "History", q: "Where can I find my past results?", a: "Open the History tab. Filter by All, Image, Video or Favorites, and tap any item to open it with its prompt." },
  { tag: "History", q: "How do I delete a generation?", a: "Open the result, tap the menu and choose Delete. The generation is permanently deleted and can't be recovered." },
  { tag: "Subscription", q: "How do I cancel my subscription?", a: "Subscriptions are billed through your Apple ID. Open iPhone Settings → your name → Subscriptions → Nano Banana → Cancel. Deleting the app doesn't cancel an active subscription." },
  { tag: "Subscription", q: "How do I restore a purchase on a new iPhone?", a: "Open the subscription screen in the app and tap Restore while signed in with the same Apple ID you used to buy." },
  { tag: "Troubleshooting", q: "A generation failed. What should I do?", a: "Check your internet connection, adjust the prompt and try again. If it keeps failing, write to us and describe what you were creating." },
];

export const topics = ["Feedback", "Bug report", "Subscription", "Idea"];
