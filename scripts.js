import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm.js';

const deck = new Reveal({
    plugins: [RevealMarkdown],
    hash: true,
    controls: false
});
deck.initialize();

document.querySelectorAll('[data-include]').forEach(async (el) => {
    const file = el.getAttribute('data-include');
    const response = await fetch(file);
    if (response.ok) {
        el.innerHTML = await response.text();
    } else {
        el.innerHTML = `<p>Error loading ${file}</p>`;
    }
});