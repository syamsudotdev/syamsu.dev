import type { Config } from '@react-router/dev/config';
import fs from 'node:fs/promises';

export default {
  async prerender() {
    const slug = await Promise.all(
      await fs
        .readdir('posts')
        .then(filenames =>
          filenames
            .map(async name => name.replace(/\.mdx?$/g, ''))
            .filter(Boolean)
        )
    );
    return ['/', '/posts'].concat(slug.map(s => `/posts/${s}`));
  },
} satisfies Config;
