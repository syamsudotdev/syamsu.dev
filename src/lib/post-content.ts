import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';
import { remark } from 'remark';
import stripMarkdown from 'strip-markdown';

export const getPostContent = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const fs = await import('node:fs/promises');
    const content = await fs.readFile(`posts/${slug}.md`, 'utf-8');
    const titleLine = content
      .split('\n')
      .find(line => line.startsWith('title = "'));

    const title = titleLine?.substring(
      titleLine.indexOf('"') + 1,
      titleLine.lastIndexOf('"'),
    );

    const tagsLine = content
      .split('\n')
      .find(line => line.startsWith('tags = '));
    const tags: string[] = JSON.parse(
      tagsLine?.substring(tagsLine.indexOf('= ') + 1)?.trim() || '[]',
    );

    const dateLine = content
      .split('\n')
      .find(line => line.startsWith('date = '));
    const dateString =
      dateLine
        ?.substring(dateLine.indexOf('= ') + 1)
        ?.trim()
        ?.substring(0, 10) || '';

    const strippedMarkdown = await remark()
      .use(stripMarkdown)
      .process(content.substring(content.lastIndexOf('+++') + 3));

    const short = strippedMarkdown
      .toString()
      .split('\n')
      .slice(1)
      .join(' ')
      .trim()
      .replace('<!--more-->', '')
      .substring(0, 200);
    const post = content.replace('<!--more-->', '');
    return {
      title: title || '',
      short,
      post,
      tags,
      date: dateString,
    };
  });
