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
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">
              All{' '}
              <span className="bg-gradient-to-r from-[#E8F1F2] to-[#92B4BC] bg-clip-text text-transparent">
                Posts
              </span>
            </h1>
            <p className="text-xl text-[#92B4BC] max-w-2xl mx-auto">
              A collection of thoughts, tutorials, and insights from my journey
              in tech
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid Section */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loaderData.posts.map(post => (
              <Link
                key={post.link}
                to={`/posts/${post.link}`}
                className="group flex flex-col text-[#E8F1F2] rounded-xl border border-[#385D65]/30 bg-gradient-to-br from-[#1E363B]/60 to-[#385D65]/40 hover:border-[#385D65]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#385D65]/20 overflow-hidden"
              >
                <div className="flex flex-col p-6 flex-1">
                  <h3 className="text-xl font-bold tracking-tight leading-tight text-[#E8F1F2] group-hover:text-white transition-colors mb-3">
                    {post.title}
                  </h3>
                  <p className="text-[#92B4BC] text-sm font-medium mb-4">
                    {post.date}
                  </p>
                  <div className="flex items-center text-[#92B4BC] group-hover:text-[#E8F1F2] transition-colors text-sm font-medium">
                    <span>Read more</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
