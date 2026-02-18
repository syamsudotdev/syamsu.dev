import { Link } from '@tanstack/react-router';

function DesktopNav() {
  return (
    <nav className="hidden xl:flex mr-8 ml-auto space-x-6 font-bold tracking-wide uppercase items-center text-navy-blue">
      <Link to="/posts" className="cursor-pointer hover:text-blue-grotto hover:underline">
        Archive
      </Link>
      {/* begin dropdown */}
      <details className="group inline-block relative">
        <summary className="inline-flex items-center cursor-pointer xl:py-4 px-2 transition-colors hover:text-blue-grotto">
          <span className="mr-2">Socials</span>
          <svg
            className="w-4 h-4 fill-current transition-transform group-open:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </summary>
        <ul className="absolute right-0 top-full mt-0 min-w-[200px] list-none border-2 border-blue bg-white z-50 opacity-0 invisible group-open:opacity-100 group-open:visible transition-all duration-200 ease-out">
          <li>
            <Link
              className="flex items-center px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-baby-blue hover:text-white transition-colors duration-150"
              to="."
              target="_blank"
              href="https://github.com/syamsudotdev"
            >
              <svg className="w-4 h-4 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-baby-blue hover:text-white transition-colors duration-150"
              to="."
              target="_blank"
              href="https://www.linkedin.com/in/mochamad-noor-syamsu-832617a5/"
            >
              <svg className="w-4 h-4 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-baby-blue hover:text-white transition-colors duration-150"
              to="."
              target="_blank"
              href="https://x.com/syamsudotdev"
            >
              <svg className="w-4 h-4 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
              X / Twitter
            </Link>
          </li>
        </ul>
      </details>
      {/* end dropdown */}
      <Link to="/" hash="works" className="cursor-pointer hover:text-blue-grotto hover:underline">
        Works
      </Link>
      <Link to="/" hash="about-me" className="cursor-pointer hover:text-blue-grotto hover:underline">
        About
      </Link>
      <Link
        to="."
        target="_blank"
        href="mailto:hi@syamsu.dev"
        className="cursor-pointer hover:text-blue-grotto hover:underline"
      >
        Contact
      </Link>
    </nav>
  );
}

function MobileNav() {
  return (
    <nav className="flex xl:hidden ml-auto mr-4 space-x-4 font-bold tracking-wide uppercase items-center py-[4px] text-navy-blue">
      {/* begin dropdown */}
      <details className="group inline-block relative">
        <summary className="inline-flex items-center cursor-pointer py-2 px-3 transition-colors hover:text-blue-grotto">
          <span className="mr-2">Menu</span>
          <svg
            className="w-4 h-4 fill-current transition-transform group-open:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </summary>
        <ul className="absolute right-0 top-full mt-0 min-w-[200px] list-none border-2 border-blue bg-white z-50 opacity-0 invisible group-open:opacity-100 group-open:visible transition-all duration-200 ease-out">
          <li>
            <Link
              className="flex items-center px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-baby-blue hover:text-white transition-colors duration-150"
              to="/posts"
            >
              <svg className="w-4 h-4 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              Archive
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-baby-blue hover:text-white transition-colors duration-150"
              to="."
              target="_blank"
              href="https://github.com/syamsudotdev"
            >
              <svg className="w-4 h-4 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-baby-blue hover:text-white transition-colors duration-150"
              to="."
              target="_blank"
              href="https://www.linkedin.com/in/mochamad-noor-syamsu-832617a5/"
            >
              <svg className="w-4 h-4 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-baby-blue hover:text-white transition-colors duration-150"
              to="."
              target="_blank"
              href="https://x.com/syamsudotdev"
            >
              <svg className="w-4 h-4 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
              X / Twitter
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-baby-blue hover:text-white transition-colors duration-150"
              to="/"
              hash="works"
            >
              <svg className="w-4 h-4 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
              </svg>
              Works
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-baby-blue hover:text-white transition-colors duration-150"
              to="/"
              hash="about-me"
            >
              <svg className="w-4 h-4 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              About
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-baby-blue hover:text-white transition-colors duration-150"
              to="."
              target="_blank"
              href="mailto:hi@syamsu.dev"
            >
              <svg className="w-4 h-4 mr-3 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
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
    <header className="flex fixed top-0 w-screen border-b-2 border-blue bg-white text-navy-blue z-50">
      <Link className="flex my-auto ml-4 py-2" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 xl:h-8 xl:w-8"
        >
          <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
        </svg>
        <span className="min-w-2" />
        <span className="font-bold my-auto uppercase tracking-wide">syamsu.dev</span>
      </Link>
      <MobileNav />
      <DesktopNav />
    </header>
  );
}
