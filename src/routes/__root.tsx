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
      <body className="flex relative flex-col font-sans text-white select-none bg-[#1E363B]">
        <Header />
        <div className="h-[48px] xl:h-[56px]" />
        <Outlet />
        <footer className="py-12 px-6 border-t border-[#385D65]/30">
          <div className="max-w-6xl mx-auto text-center space-y-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#E8F1F2] to-[#92B4BC] bg-clip-text text-transparent">
              syamsu.dev
            </div>
            <p className="text-[#92B4BC]">
              Building the future, one line of code at a time.
            </p>
            <div className="text-sm text-[#92B4BC]">
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
  let message = 'Oops!';
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
