import { Link } from 'react-router';
import { Route } from './+types/posts';
import fs from 'node:fs/promises';

export function meta() {
  return [
    { title: 'syamsu.dev - Posts' },
    {
      name: 'description',
      content: 'Mochamad Noor Syamsu Web Homepage - Posts',
    },
  ];
}

export async function loader() {
  const posts = await fs.readdir('posts').then(filenames =>
    filenames
      .map(async name => {
        const title = await fs
          .readFile(`posts/${name}`, 'utf-8')
          .then(content =>
            content.split('\n').find(line => line.startsWith('title = "'))
          )
          .then(line =>
            line?.substring(line.indexOf('"') + 1, line.lastIndexOf('"'))
          );

        return { title, link: name.replace(/\.mdx?$/g, '') };
      })
      .filter(Boolean)
  );
  return { posts: await Promise.all(posts) };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <div className="mt-[68px] mx-[16px]">
      <h1 className="font-bold text-xl">Posts</h1>
      <ul className="mx-[16px] list-disc text-[#E8F1F2]">
        {loaderData.posts.map(post => (
          <li key={post.link}>
            <Link to={`/posts/${post.link}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
