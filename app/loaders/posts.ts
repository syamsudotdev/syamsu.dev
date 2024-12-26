import fs from 'node:fs/promises';

export async function getPostFilenames(): Promise<string[]> {
  return await fs.readdir('posts');
}

type PostWithLinkResult = {
  title: string;
  link: string;
};

export async function getPostWithLink(): Promise<PostWithLinkResult[]> {
  return getPostFilenames().then(filenames => {
    const postsTitle = filenames.map(async filename => {
      const title = await getPostTitle(filename);
      return { title, link: filename.replace(/\.mdx?$/g, '') };
    });

    return Promise.all(postsTitle);
  });
}

async function getPostTitle(filename: string): Promise<string> {
  return fs
    .readFile(`posts/${filename}`, 'utf-8')
    .then(content =>
      content.split('\n').find(line => line.startsWith('title = "'))
    )
    .then(
      line =>
        line?.substring(line.indexOf('"') + 1, line.lastIndexOf('"')) || ''
    );
}
