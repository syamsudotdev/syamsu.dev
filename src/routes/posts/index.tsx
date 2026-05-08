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
      { title: 'Writing — syamsu.dev' },
      {
        name: 'description',
        content: 'Mochamad Noor Syamsu Web Homepage - Posts',
      },
      ...buildOpenGraphTwitterMeta({
        title: 'Writing — syamsu.dev',
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
    <main className="min-h-screen bg-paper">
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-prose mx-auto">
          <h1 className="font-display text-display mb-4">
            Writing
          </h1>
          <p className="text-pencil font-body text-body">
            Technical thoughts, guides, and notes on building software.
          </p>
        </div>
      </section>

      <div className="section-rule max-w-prose mx-auto" />

      <section className="py-8 px-6">
        <div className="max-w-prose mx-auto">
          {posts.map((post) => (
            <Link
              key={post.link}
              to="/posts/$slug"
              params={{ slug: post.link }}
              className="group flex items-start justify-between py-6 border-b border-rule gap-8"
            >
              <div className="flex-1">
                <h2 className="font-heading text-heading-lg group-hover:text-redline transition-colors">
                  {post.title}
                </h2>
              </div>
              <span className="font-mono text-ui uppercase text-pencil shrink-0 mt-1.5">
                {post.date}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}