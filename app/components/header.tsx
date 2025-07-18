import { Link } from 'react-router';

function DesktopNav() {
  return (
    <nav className="hidden xl:flex mr-8 ml-auto space-x-4 font-semibold items-center">
      <Link to="/posts" className="cursor-pointer">
        Archive
      </Link>
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
        <ul className="absolute list-none rounded border bg-[#1E363B]">
          <li>
            <Link
              className="block px-4 py-2 whitespace-nowrap cursor-pointer hover:bg-[#E8F1F2]/30"
              to="https://github.com/syamsudotdev"
            >
              Github
            </Link>
          </li>
          <li className="w-full h-px bg-[#E8F1F2]" />
          <li>
            <Link
              className="block px-4 py-2 whitespace-nowrap rounded-t cursor-pointer hover:bg-[#E8F1F2]/30"
              to="https://www.linkedin.com/in/mochamad-noor-syamsu-832617a5/"
            >
              LinkedIn
            </Link>
          </li>
          <li className="w-full h-px bg-[#E8F1F2]" />
          <li>
            <Link
              className="block px-4 py-2 whitespace-nowrap rounded-b cursor-pointer hover:bg-[#E8F1F2]/30"
              to="https://x.com/syamsudotdev"
            >
              X / Twitter
            </Link>
          </li>
        </ul>
      </details>
      {/* end dropdown */}
      <Link to="/#works" className="cursor-pointer">
        Works
      </Link>
      <Link to="/#about-me" className="cursor-pointer">
        About
      </Link>
      <Link to="mailto:hi@syamsu.dev" className="cursor-pointer">
        Contact
      </Link>
      <Link to="/rss.xml" className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </Link>
    </nav>
  );
}

function MobileNav() {
  return (
    <nav className="flex xl:hidden ml-auto mr-4 space-x-4 font-semibold items-center py-[4px]">
      {/* begin dropdown */}
      <details className="inline-block relative">
        <summary className="inline-flex items-center cursor-pointer py-2 xl:py-4">
          <span className="mr-1">Menu</span>
        </summary>
        <ul className="absolute list-none rounded border bg-[#1E363B] -ml-[48px] mt-[4px]">
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap cursor-pointer hover:bg-[#E8F1F2]/30"
              to="/posts"
            >
              Archive
            </Link>
          </li>
          <li className="w-full h-px bg-[#E8F1F2]" />
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap cursor-pointer hover:bg-[#E8F1F2]/30"
              to="https://github.com/syamsudotdev"
            >
              Github
            </Link>
          </li>
          <li className="w-full h-px bg-[#E8F1F2]" />
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap rounded-t cursor-pointer hover:bg-[#E8F1F2]/30"
              to="https://www.linkedin.com/in/mochamad-noor-syamsu-832617a5/"
            >
              LinkedIn
            </Link>
          </li>
          <li className="w-full h-px bg-[#E8F1F2]" />
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap rounded-t cursor-pointer hover:bg-[#E8F1F2]/30"
              to="https://x.com/syamsudotdev"
            >
              X / Twitter
            </Link>
          </li>
          <li className="w-full h-px bg-[#E8F1F2]" />
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap rounded-t cursor-pointer hover:bg-[#E8F1F2]/30"
              to="/#works"
            >
              Works
            </Link>
          </li>
          <li className="w-full h-px bg-[#E8F1F2]" />
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap rounded-b cursor-pointer hover:bg-[#E8F1F2]/30"
              to="/#about-me"
            >
              About
            </Link>
          </li>
          <li className="w-full h-px bg-[#E8F1F2]" />
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap rounded-b cursor-pointer hover:bg-[#E8F1F2]/30"
              to="mailto:hi@syamsu.dev"
            >
              Contact
            </Link>
          </li>
          <li className="w-full h-px bg-[#E8F1F2]" />
          <li>
            <Link
              className="block px-2 py-2 whitespace-nowrap rounded-b cursor-pointer hover:bg-[#E8F1F2]/30"
              to="/rss.xml"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
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
    <header className="flex fixed top-0 w-screen bg-opacity-80 shadow-lg bg-[#1E363B] text-[#E8F1F2]">
      <Link className="flex my-auto ml-4" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 xl:h-8 xl:w-8"
        >
          <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
        </svg>
        <span className="min-w-2" />
        <span className="font-semibold my-auto">syamsu.dev</span>
      </Link>
      <MobileNav />
      <DesktopNav />
    </header>
  );
}
