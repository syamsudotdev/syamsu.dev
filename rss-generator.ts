// Generate site map for all pages

import fs from 'node:fs/promises';
import { getAllPosts } from '~/loaders/posts';

async function generateSitemap() {
  const posts = await getAllPosts();
  const items = posts
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(post => ({
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
        item => `
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
`;

  await fs.rm('public/rss.xml').catch(() => {
    // do nothing
  });
  await fs.writeFile('public/rss.xml', sitemap);
}

await generateSitemap();
