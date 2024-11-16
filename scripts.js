import Reveal from "reveal.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Typewriter from "typewriter-effect/dist/core";

const typewripter = el => {
  // data-typewriter="|,100"
  const [cursor = "", delay = 75] = el
    .getAttribute("data-typewriter")
    .split(",");

  new Typewriter(el, {
    strings: el.innerHTML,
    autoStart: true,
    cursor,
    delay,
  });
};

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

deck.on("slidechanged", e => {
  e.currentSlide
    .querySelectorAll("[data-autoload]:not(.fragment)")
    .forEach(el => el.classList.add("visible"));
  e.previousSlide
    ?.querySelectorAll("[data-autoload]")
    .forEach(el => el.classList.remove("visible"));

  e.currentSlide
    .querySelectorAll("[data-autoload][data-typewriter]")
    .forEach(el => typewripter(el));
});

deck.on("fragmentshown", e => {
  if (e.fragment.hasAttribute("[data-typewriter]")) {
    typewripter(e.fragment);
  }

  e.fragment
    .querySelectorAll("[data-typewriter]")
    .forEach(el => typewripter(el));
});
