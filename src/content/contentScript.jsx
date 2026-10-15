import { createRoot } from "react-dom/client";
import PostBadge from "../overlay/PostBadge.jsx";
import { scorePost, getTipFor } from "../lib/heuristics.js";
import { addToHistory } from "../lib/storage.js";

const PROCESSED_ATTR = "data-mil-processed";

// Sélecteur générique : les posts du feed ont role="article".
// À ajuster si Facebook change sa structure.
const POST_SELECTOR = '[role="article"]';

function extractLinkUrl(postEl) {
  const link = postEl.querySelector('a[href^="http"]:not([href*="facebook.com"])');
  return link ? link.href : null;
}

function extractText(postEl) {
  return postEl.innerText?.slice(0, 2000) || "";
}

function injectBadge(postEl) {
  const text = extractText(postEl);
  if (!text) return;

  const linkUrl = extractLinkUrl(postEl);
  const result = scorePost({ text, linkUrl });
  const tip = getTipFor(result);

  addToHistory({
    score: result.score,
    domain: result.domain,
    excerpt: text.slice(0, 120)
  });

  const container = document.createElement("div");
  container.className = "mil-badge-container";
  postEl.prepend(container);

  const root = createRoot(container);
  root.render(<PostBadge score={result.score} tip={tip} signals={result.signals} />);
}

function scanFeed() {
  const posts = document.querySelectorAll(POST_SELECTOR);
  posts.forEach((post) => {
    if (post.getAttribute(PROCESSED_ATTR)) return;
    post.setAttribute(PROCESSED_ATTR, "true");
    injectBadge(post);
  });
}

// Le feed Facebook charge en continu -> on observe les mutations du DOM
const observer = new MutationObserver(() => {
  scanFeed();
});

observer.observe(document.body, { childList: true, subtree: true });

// Premier scan au chargement
scanFeed();
