import { marked } from 'marked';

marked.setOptions({ breaks: false, gfm: true });

// Renders the rich content of an article.
// - Static seed articles (src/data/blog.js) store content as an array of
//   typed blocks ({ type: 'h3' | 'p' | 'ul', ... }).
// - Articles published from the /admin dashboard (Supabase) store content
//   as Markdown text (`content_md`), written by an authenticated admin —
//   the same trust level as a CMS user, so it is rendered directly.
export default function ArticleBody({ article }) {
  if (!article) return null;

  if (Array.isArray(article.content)) {
    return (
      <div className="article-body">
        {article.content.map((block, i) => {
          if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>;
          if (block.type === 'p')
            return <p key={i} dangerouslySetInnerHTML={{ __html: block.text }} />;
          if (block.type === 'ul')
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            );
          return null;
        })}
      </div>
    );
  }

  if (article.content_md) {
    const html = marked.parse(article.content_md);
    return <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return null;
}
