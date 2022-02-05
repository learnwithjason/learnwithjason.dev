import { Link } from 'remix';

import { Logo } from './logo.jsx';

export function Header() {
  return (
    <header className="header">
      <a href="#content" className="visually-hidden">
        skip to content
      </a>
      <div className="mobile-buttons">
        <Link rel="prefetch" to="/" rel="home">
          <Logo />
          <span className="visually-hidden">Home</span>
        </Link>
      </div>
      <nav>
        <Link rel="prefetch" to="/episodes">
          episodes
        </Link>
        <Link rel="prefetch" to="/schedule">
          schedule
        </Link>
        {/* <Link rel="prefetch" to="/">courses</Link> */}
        <Link rel="prefetch" to="/store">
          store
        </Link>
        <Link rel="prefetch" to="/blog">
          blog
        </Link>
        <Link rel="prefetch" to="/about">
          about
        </Link>
        <Link rel="prefetch" to="/search">
          search
        </Link>
      </nav>
    </header>
  );
}
