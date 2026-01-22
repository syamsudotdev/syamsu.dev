import fs from 'node:fs/promises';
import { createServerFn } from '@tanstack/react-start';
import { remark } from 'remark';
import stripMarkdown from 'strip-markdown';

export const getPostFilenames = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await fs.readdir('posts');
  }
);

type PostWithLinkResult = {
  title: string;
  link: string;
  date: string;
};

export type PostDetailResult = {
  title: string;
  short: string;
  date: string;
  slug: string;
};

export const getPostWithLink = createServerFn({ method: 'GET' }).handler(
  async () => {
    const filenames = await getPostFilenames();
    const postsTitlePromise = filenames.map(async filename => {
      const content = await fs.readFile(`posts/${filename}`, 'utf-8');
      const date = getPostDate(content);
      const title = getPostTitle(content);
      return { title, link: filename.replace(/\.mdx?$/g, ''), date };
    });

    const postsTitles = await Promise.all(postsTitlePromise);
    const postsSorted = postsTitles.sort((a, b) =>
      a.date.getTime() < b.date.getTime() ? 1 : -1
    );

    return postsSorted.map(post => ({
      title: post.title,
      link: post.link,
      date: `${post.date.getFullYear()}-${String(
        post.date.getMonth() + 1
      ).padStart(2, '0')}-${String(post.date.getDate()).padStart(2, '0')}`,
    })) as PostWithLinkResult[];
  }
);

export const getAllPosts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const filenames = await getPostFilenames();
    const posts = await Promise.all(
      filenames.map(async filename => ({
        slug: filename,
        content: await fs.readFile(`posts/${filename}`, 'utf-8'),
      }))
    );

    return (await Promise.all(
      posts.map(async post => {
        const title = getPostTitle(post.content);
        const strippedMarkdown = await remark()
          .use(stripMarkdown)
          .process(post.content.substring(post.content.lastIndexOf('+++')))
          .then(result =>
            result.toString().replaceAll('\uc2a0', ' ').replaceAll('\u00a0', ' ')
          );

        const short = strippedMarkdown
          .toString()
          .split('\n')
          .slice(1)
          .join(' ')
          .trim()
          .replace('<!--more-->', '')
          .substring(0, 200);

        return {
          title,
          slug: post.slug.replace(/\.mdx?$/g, ''),
          date: getPostDate(post.content),
          short,
        };
      })
    )) as {
      title: string;
      short: string;
      date: Date;
      slug: string;
    }[];
  }
);

export const getLatestPosts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const filenames = await getPostFilenames();
    const posts = await Promise.all(
      filenames.map(async filename => ({
        slug: filename,
        content: await fs.readFile(`posts/${filename}`, 'utf-8'),
      }))
    );

    const postSorted = posts
      .map(p => {
        const date = getPostDate(p.content);
        return { date, content: p.content, slug: p.slug };
      })
      .sort((a, b) => (a.date.getTime() < b.date.getTime() ? 1 : -1))
      .slice(0, 6);

    return (await Promise.all(
      postSorted.map(async post => {
        const title = getPostTitle(post.content);
        const strippedMarkdown = await remark()
          .use(stripMarkdown)
          .process(post.content.substring(post.content.lastIndexOf('+++')))
          .then(result => result.toString().replace('\uc2a0', ' '));

        const short = strippedMarkdown
          .toString()
          .split('\n')
          .slice(1)
          .join(' ')
          .trim()
          .replace('<!--more-->', '')
          .substring(0, 200);

        return {
          title,
          slug: post.slug.replace(/\.mdx?$/g, ''),
          date: post.date.toISOString().substring(0, 10),
          short,
        };
      })
    )) as PostDetailResult[];
  }
);

function getPostTitle(content: string): string {
  const line = content.split('\n').find(line => line.startsWith('title = "'));
  return line?.substring(line.indexOf('"') + 1, line.lastIndexOf('"')) || '';
}

function getPostDate(content: string): Date {
  const line = content.split('\n').find(line => line.startsWith('date = '));
  const dateString = (line?.substring(line.indexOf('= ') + 1) || '').trim();
  return new Date(dateString);
}
