import { buildOpenGraphTwitterMeta } from '~/loaders/og-twitter';
import { getLatestPosts } from '~/loaders/posts';
import Home, { LatestPosts } from '~/pages/home';
import { Route } from './+types/home';

export function meta() {
  return [
    { title: 'syamsu.dev' },
    { name: 'description', content: 'Mochamad Noor Syamsu Web Homepage' },
    ...buildOpenGraphTwitterMeta({
      title: 'syamsu.dev',
      description: 'Mochamad Noor Syamsu Web Homepage',
      imagePath: 'index.jpeg',
    }),
  ];
}

export function loader() {
  return getLatestPosts();
}

export default function Page(loaderData: Route.ComponentProps) {
  return <Home latestPosts={<LatestPosts posts={loaderData.loaderData} />} />;
}
