import { Link } from 'remix';

import { Logo } from './logo.jsx';
import { SearchIcon } from './search/icons/search-icon.jsx';

export function Header({ onOpenSearch }) {
  return (
    <header className="header">
      <a href="#content" className="visually-hidden">
        skip to content
      </a>

      <div className="logo">
        <Link prefetch="intent" to="/" rel="home">
          <Logo />
          <span className="visually-hidden">Home</span>
        </Link>
      </div>

      <nav>
        <Link prefetch="intent" to="/episodes">
          episodes
        </Link>
        <Link prefetch="intent" to="/schedule">
          schedule
        </Link>
        {/* <Link prefetch="intent" to="/">courses</Link> */}
        <Link prefetch="intent" to="/store">
          store
        </Link>
        <Link prefetch="intent" to="/blog">
          blog
        </Link>
        <Link prefetch="intent" to="/about">
          about
        </Link>
        <button className="aa-OpenButton" onClick={onOpenSearch}>
          <SearchIcon />
          <span className="visually-hidden">Open search</span>
        </button>
      </nav>
    </header>
  );
}
