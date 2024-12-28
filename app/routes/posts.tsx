import { Link } from 'react-router';
import { Route } from './+types/posts';
import { getPostWithLink } from '~/loaders/posts';
import { buildOpenGraphTwitterMeta } from '~/loaders/og-twitter';
import { Fragment } from 'react/jsx-runtime';

export function meta() {
  return [
    { title: 'syamsu.dev - Posts' },
    {
      name: 'description',
      content: 'Mochamad Noor Syamsu Web Homepage - Posts',
    },
    ...buildOpenGraphTwitterMeta({
      title: 'syamsu.dev - Posts',
      description: 'Mochamad Noor Syamsu Web Homepage - Posts',
      imagePath: 'posts.jpeg',
    }),
  ];
}

export async function loader() {
  const posts = await getPostWithLink();
  return { posts: await Promise.all(posts) };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <div className="mx-[32px]">
      <h1 className="font-bold text-xl">Posts</h1>
      <div className="text-[#E8F1F2]">
        {loaderData.posts.map((post, index, arr) => (
          <Fragment key={post.link}>
            <Link to={`/posts/${post.link}`} className="flex flex-row">
              <span className="min-w-28">{post.date}</span>
              {post.title}
            </Link>
            {index < arr.length - 1 && (
              <span className="min-w-full block min-h-px bg-[#E8F1F2]" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
