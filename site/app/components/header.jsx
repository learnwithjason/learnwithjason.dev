import { Logo } from './logo.jsx';

export function Header() {
  return (
    <header className="header">
      <a className="visually-hidden" href="#content">
        skip to content
      </a>
      <div className="mobile-buttons">
        <a href="/" rel="home">
          <Logo />
          <span className="visually-hidden">Home</span>
        </a>
      </div>
      <nav>
        <a href="/episodes">episodes</a>
        <a href="/schedule">schedule</a>
        {/* <a href="/">courses</a> */}
        <a href="/store">store</a>
        <a href="/blog">blog</a>
        <a href="/about">about</a>
        <a href="/search">search</a>
      </nav>
    </header>
  );
}
