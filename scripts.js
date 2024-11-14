import Reveal from "reveal.js";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown.esm.js";

const deck = new Reveal({
  plugins: [RevealMarkdown],
  hash: true,
  controls: false,
});
deck.initialize();
