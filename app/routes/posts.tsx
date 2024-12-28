import { Link } from 'react-router';
import { Route } from './+types/posts';
import { getPostWithLink } from '~/loaders/posts';
import { buildOpenGraphTwitterMeta } from '~/loaders/og-twitter';

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
      <div className="mx-[16px] text-[#E8F1F2]">
        {loaderData.posts.map(post => (
          <Link
            key={post.link}
            to={`/posts/${post.link}`}
            className="flex flex-row"
          >
            <span className="w-28">{post.date}</span>
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
