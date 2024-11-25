import Home from '~/pages/home';

export function meta() {
  return [
    { title: 'syamsu.dev' },
    { name: 'description', content: 'Mochamad Noor Syamsu Web Homepage' },
  ];
}

export default function Page() {
  return <Home />;
}
