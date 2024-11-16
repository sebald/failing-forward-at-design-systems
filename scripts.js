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
 * Enter animation for elements
 */
deck.on("slidechanged", (e) => {
  e.currentSlide
    .querySelectorAll("[data-autoload]")
    .forEach((el) => el.classList.add("visible"));
  e.previousSlide
    .querySelectorAll("[data-autoload]")
    .forEach((el) => el.classList.remove("visible"));
});
