import { createFileRoute, Link } from '@tanstack/react-router';
import { getPostWithLink } from '~/lib/posts';
import { buildOpenGraphTwitterMeta } from '~/utils/seo';

export const Route = createFileRoute('/posts/')({
  loader: async () => {
    const posts = await (getPostWithLink as any)();
    return { posts: await Promise.all(posts) };
  },
  head: () => ({
    meta: [
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
    ],
  }),
  component: PostsComponent,
});

function PostsComponent() {
  const { posts } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-20 pb-10 px-6">
        <div className="max-w-6xl mx-auto border-b-8 border-navy-blue pb-4">
          <h1 className="text-7xl md:text-8xl font-black text-navy-blue uppercase tracking-tighter">
            All Posts
          </h1>
        </div>
      </section>

      {/* Posts List Section */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col">
            {posts.map((post) => (
              <Link
                key={post.link}
                to="/posts/$slug"
                params={{ slug: post.link }}
                className="group flex items-center justify-between py-6 border-b border-gray-200 transition-colors"
              >
                <div className="flex items-center gap-8 md:gap-16 flex-1">
                  <span className="font-mono text-gray-500 tabular-nums text-sm md:text-base whitespace-nowrap">
                    {post.date}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-navy-blue group-hover:text-blue-grotto transition-colors">
                    {post.title}
                  </h2>
                </div>
                <span className="text-2xl md:text-3xl text-navy-blue group-hover:translate-x-2 transition-transform duration-200 ease-out">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
