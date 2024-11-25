import { Link } from 'react-router';

function DesktopNav() {
  return (
    <nav className="hidden xl:flex mr-8 ml-auto space-x-4 text-base font-semibold items-center">
      {/* begin dropdown */}
      <details className="inline-block relative">
        <summary className="inline-flex items-center cursor-pointer xl:py-4">
          <span className="mr-1">Socials</span>
          <svg
            className="w-10 h-10 fill-current xl:h-6 xl:w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </summary>
        <ul className="absolute list-none rounded border bg-slate-800">
          <li>
            <Link
              className="block px-4 py-2 whitespace-nowrap cursor-pointer hover:bg-white/30"
              to="https://github.com/syamsudotdev"
            >
              Github
            </Link>
          </li>
          <li className="w-full h-px bg-white" />
          <li>
            <Link
              className="block px-4 py-2 whitespace-nowrap rounded-t cursor-pointer hover:bg-white/30"
              to="https://www.linkedin.com/in/mochamad-noor-syamsu-832617a5/"
            >
              LinkedIn
            </Link>
          </li>
          <li className="w-full h-px bg-white" />
          <li>
            <Link
              className="block px-4 py-2 whitespace-nowrap rounded-b cursor-pointer hover:bg-white/30"
              to="https://x.com/syamsudotdev"
            >
              X / Twitter
            </Link>
          </li>
        </ul>
      </details>
      {/* end dropdown */}
      <Link to="/posts" className="cursor-pointer">
        Blog
      </Link>
      <Link to="mailto:hi@syamsu.dev" className="cursor-pointer">
        Contact
      </Link>
    </nav>
  );
}

function MobileNav() {
  return (
    <nav className="flex xl:hidden ml-auto mr-4 space-x-4 text-base font-semibold items-center">
      {/* begin dropdown */}
      <details className="inline-block relative">
        <summary className="inline-flex items-center cursor-pointer xl:py-4">
          <span className="mr-1">Menu</span>
          <svg
            className="w-10 h-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </summary>
        <ul className="absolute list-none rounded border bg-slate-800 mr-2">
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap cursor-pointer hover:bg-white/30"
              to="https://github.com/syamsudotdev"
            >
              Github
            </Link>
          </li>
          <li className="w-full h-px bg-white" />
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap rounded-t cursor-pointer hover:bg-white/30"
              to="https://www.linkedin.com/in/mochamad-noor-syamsu-832617a5/"
            >
              LinkedIn
            </Link>
          </li>
          <li className="w-full h-px bg-white" />
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap rounded-t cursor-pointer hover:bg-white/30"
              to="https://x.com/syamsudotdev"
            >
              X / Twitter
            </Link>
          </li>
          <li className="w-full h-px bg-white" />
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap rounded-t cursor-pointer hover:bg-white/30"
              to="/posts"
            >
              Blog
            </Link>
          </li>
          <li className="w-full h-px bg-white" />
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap rounded-b cursor-pointer hover:bg-white/30"
              to="mailto:hi@syamsu.dev"
            >
              Contact
            </Link>
          </li>
        </ul>
      </details>
      {/* end dropdown */}
    </nav>
  );
}

export default function Header() {
  return (
    <header className="flex fixed top-0 w-screen bg-opacity-80 shadow-lg bg-slate-800/80">
      <Link className="my-auto ml-4" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 xl:h-8 xl:w-8"
        >
          <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
        </svg>
        <span className="sr-only">Mochamad Noor Syamsu Website</span>
      </Link>
      <MobileNav />
      <DesktopNav />
    </header>
  );
}
