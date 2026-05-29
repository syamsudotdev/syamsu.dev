import { Link } from '@tanstack/react-router';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-paper flex items-center">
      <div className="max-w-prose mx-auto px-6 py-24">
        <div className="font-mono text-ui uppercase tracking-widest text-redline">
          404
        </div>
        <h1 className="font-display text-display mt-4">Page not found</h1>
        <p className="text-pencil font-body text-body mt-4">
          The page you are looking for does not exist or has moved.
        </p>
        <Link to="/" className="redaction-link font-mono text-ui uppercase mt-8 inline-block">
          Back home
        </Link>
      </div>
    </main>
  );
}
