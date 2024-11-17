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
  transition: "none",
  margin: 0.15,
  width: 1200,
});

deck.initialize();

// Slides
deck.on("slidechanged", e => {
  // Auto animate
  e.currentSlide
    .querySelectorAll("[data-autoload]:not(.fragment)")
    .forEach(el => el.classList.add("visible"));
  e.previousSlide
    ?.querySelectorAll("[data-autoload]")
    .forEach(el => el.classList.remove("visible"));

  // Auto animate with timer
  e.currentSlide.querySelectorAll("[data-autoload-timer]").forEach(el => {
    const timer = el.getAttribute("data-autoload-timer") || 0;
    setTimeout(() => {
      el.classList.add("visible");

      // Mini timeout to make it look better
      setTimeout(() => {
        // Typewriter effect
        if (el.hasAttribute("[data-typewriter]")) {
          typewripter(el);
        }
        // Typewriter effect for children
        el.querySelectorAll("[data-typewriter]").forEach(child =>
          typewripter(child),
        );
      }, 25);
    }, timer);
  });
  e.previousSlide
    ?.querySelectorAll("[data-autoload-timer]")
    .forEach(el => el.classList.remove("visible"));

  // Typewriter effect
  e.currentSlide
    .querySelectorAll("[data-autoload][data-typewriter]")
    .forEach(el => typewripter(el));
});

// Fragments
deck.on("fragmentshown", e => {
  // Typewriter effect
  if (e.fragment.hasAttribute("[data-typewriter]")) {
    typewripter(e.fragment);
  }
  // Typewriter effect for children
  e.fragment
    .querySelectorAll("[data-typewriter]")
    .forEach(el => typewripter(el));
});
