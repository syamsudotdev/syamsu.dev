import fs from 'node:fs/promises';
import { remark } from 'remark';
import stripMarkdown from 'strip-markdown';

async function generateSitemap() {
  const filenames = await fs.readdir('posts');
  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.md') || filename.endsWith('.mdx'))
      .map(async (filename) => {
        const content = await fs.readFile(`posts/${filename}`, 'utf-8');
        const slug = filename.replace(/\.mdx?$/, '');

        // Parse frontmatter
        const titleMatch = content.match(/^title = "(.*)"$/m);
        const title = titleMatch ? titleMatch[1] : '';

        const dateMatch = content.match(/^date = (.*)$/m);
        const date = dateMatch ? new Date(dateMatch[1].trim()) : new Date();

        // Generate description
        const parts = content.split('+++');
        const markdown = parts.length > 2 ? parts.slice(2).join('+++') : content;
        
        const file = await remark().use(stripMarkdown).process(markdown);
        const text = String(file)
          .split('\n')
          .slice(1)
          .join(' ')
          .replace('<!--more-->', '')
          .trim()
          .slice(0, 200);

        return {
          title,
          slug,
          date,
          short: text,
        };
      })
  );

  const items = posts
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((post) => ({
      title: post.title,
      link: `https://syamsu.dev/posts/${post.slug}`,
      publishedDate: post.date.toUTCString(),
      description: post.short,
    }));

  const sitemap = `
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>syamsu.dev</title>
    <link>https://syamsu.dev</link>
    <description>Mochamad Noor Syamsu Web Homepage</description>
    ${items
      .map(
        (item) => `
      <item>
        <title>${item.title}</title>
        <link>${item.link}</link>
        <pubDate>${item.publishedDate}</pubDate>
        <description>${item.description}</description>
      </item>
    `
      )
      .join('')}
  </channel>
</rss>
`.trim();

  await fs.rm('public/rss.xml').catch(() => {
    // do nothing
  });
  await fs.writeFile('public/rss.xml', sitemap);
}

await generateSitemap();
