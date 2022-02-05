import { Link } from 'remix';

import { Logo } from './logo.jsx';

export function Header() {
  return (
    <header className="header">
      <a href="#content" className="visually-hidden">
        skip to content
      </a>
      <div className="mobile-buttons">
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
        <Link prefetch="intent" to="/search">
          search
        </Link>
      </nav>
    </header>
  );
}
