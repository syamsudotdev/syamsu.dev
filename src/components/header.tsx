import { Link } from '@tanstack/react-router';

function DesktopNav() {
  return (
    <nav className="hidden xl:flex ml-auto items-center gap-8">
      <Link to="/" hash="about-me" className="nav-link">
        About
      </Link>
      <Link to="/posts" className="nav-link">
        Writing
      </Link>
      <Link to="/" hash="works" className="nav-link">
        Work
      </Link>
    </nav>
  );
}

function MobileNav() {
  return (
    <nav className="flex xl:hidden ml-auto items-center">
      <details className="group relative">
        <summary className="font-mono text-ui uppercase text-pencil cursor-pointer px-4 py-2 hover:text-ink transition-colors">
          Menu
        </summary>
        <div className="absolute right-0 top-full mt-0 bg-paper border border-rule z-50 min-w-[160px] opacity-0 invisible group-open:opacity-100 group-open:visible transition-all duration-200">
          <Link to="/" hash="about-me" className="nav-link block px-5 py-3">
            About
          </Link>
          <Link to="/posts" className="nav-link block px-5 py-3">
            Writing
          </Link>
          <Link to="/" hash="works" className="nav-link block px-5 py-3">
            Work
          </Link>
        </div>
      </details>
    </nav>
  );
}

export default function Header() {
  return (
    <header className="flex fixed top-0 w-screen border-b border-rule bg-paper text-ink z-50 px-6">
      <Link className="flex items-center py-3" to="/">
        <span className="font-mono text-ui uppercase tracking-widest font-bold text-ink">syamsu.dev</span>
      </Link>
      <MobileNav />
      <DesktopNav />
    </header>
  );
}
