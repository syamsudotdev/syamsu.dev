import fs from 'node:fs/promises';

export async function getPostFilenames(): Promise<string[]> {
  return await fs.readdir('posts');
}

type PostWithLinkResult = {
  title: string;
  link: string;
  date: string;
};

export async function getPostWithLink(): Promise<PostWithLinkResult[]> {
  const filenames = await getPostFilenames();
  const postsTitlePromise = filenames.map(async filename => {
    const content = await fs.readFile(`posts/${filename}`, 'utf-8');
    const date = getPostDate(content);
    const title = getPostTitle(content);
    return { title, link: filename.replace(/\.mdx?$/g, ''), date };
  });

  const postsTitles = await Promise.all(postsTitlePromise);
  const postsSorted = postsTitles.sort((a, b) =>
    a.date.getDate() < b.date.getDate() ? 1 : -1
  );

  return postsSorted.map(post => ({
    title: post.title,
    link: post.link,
    date: `${post.date.getFullYear()}-${String(
      post.date.getMonth() + 1
    ).padStart(2, '0')}-${String(post.date.getDate()).padStart(2, '0')}`,
  }));
}

function getPostTitle(content: string): string {
  const line = content.split('\n').find(line => line.startsWith('title = "'));
  return line?.substring(line.indexOf('"') + 1, line.lastIndexOf('"')) || '';
}

function getPostDate(content: string): Date {
  const line = content.split('\n').find(line => line.startsWith('date = '));
  const dateString = (line?.substring(line.indexOf('= ') + 1) || '').trim();
  return new Date(dateString);
}
