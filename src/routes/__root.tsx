import {
  createRootRoute,
  ErrorComponentProps,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import Header from '~/components/header';
import '~/styles/app.css';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
      },
    ],
  }),
  component: RootComponent,
  errorComponent: ErrorBoundary,
});

function RootComponent() {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="flex relative flex-col font-sans text-navy-blue select-none bg-white">
        <Header />
        <div className="h-[48px] xl:h-[56px]" />
        <Outlet />
        <footer className="py-12 px-6 border-t-2 border-blue">
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="text-2xl font-bold text-navy-blue">
              syamsu.dev
            </div>
            <p className="text-blue-grotto">
              Building the future, one line of code at a time.
            </p>
            <div className="text-sm text-blue-grotto">
              © 2024 Mochamad Noor Syamsu. All rights reserved.
            </div>
          </div>
        </footer>
        <Scripts />
      </body>
    </html>
  );
}

function ErrorBoundary({ error }: ErrorComponentProps) {
  const message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
