// Helpers for blog article metadata (reading time, publication date).

const WORDS_PER_MINUTE = 200;

function countWords(text) {
  const plain = String(text || '')
    .replace(/```[\s\S]*?```/g, ' ') // code blocks
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // markdown images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // markdown links → their text
    .replace(/<[^>]+>/g, ' ') // HTML tags
    .replace(/[#>*_`~|-]+/g, ' '); // markdown symbols
  const words = plain.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu);
  return words ? words.length : 0;
}

/** Text of an article, whatever its storage format (Markdown or seed blocks). */
function articleText(article) {
  if (!article) return '';
  if (article.content_md) return article.content_md;
  if (Array.isArray(article.content)) {
    return article.content.map((b) => (b.items ? b.items.join(' ') : b.text || '')).join(' ');
  }
  return '';
}

/** "8 min", computed from the article body (~200 words per minute, minimum 1). */
export function computeReadTime(article) {
  const words = countWords(articleText(article));
  if (!words) return '';
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min`;
}

/**
 * Reading time to display: the value typed in /admin wins if there is one,
 * otherwise it is computed from the content.
 */
export function resolveReadTime(article, manual) {
  const typed = typeof manual === 'string' ? manual.trim() : manual;
  return typed || computeReadTime(article);
}

/** Localized date for display, e.g. "15 mars 2025" / "15 March 2025". */
export function formatArticleDate(iso, lang = 'fr') {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
