import Reveal from "reveal.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown.esm.js";

const deck = new Reveal({
  plugins: [RevealMarkdown],
  hash: true,
  controls: false,
  progress: false,
  // center: false,
  transition: "none",
  margin: 0.15,
  width: 1200,
});

deck.initialize();

/**
 * Immediately reveal every fragment that has `[auto-load]`.
 * Not that his only works if there are no non-auto load fragments
 * in between.
 */
deck.addEventListener("slidechanged", (e) => {
  if (
    deck
      .getCurrentSlide()
      .querySelectorAll(`.fragment[data-autoload][data-fragment-index="0"]`)
      .length
  ) {
    deck.nextFragment();
  }
});

/**
 * If there are fragments that have an autoload,
 * transition to the previous slide if the fragment is hidden.
 */
deck.addEventListener("fragmenthidden", (e) => {
  if (
    e.fragment.hasAttribute("data-autoload") &&
    e.fragment.getAttribute("data-fragment-index") === "0"
  ) {
    deck.prev();
  }
});
