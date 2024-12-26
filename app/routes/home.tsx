import { buildOpenGraphTwitterMeta } from '~/loaders/og-twitter';
import Home from '~/pages/home';

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

export default function Page() {
  return <Home />;
}
