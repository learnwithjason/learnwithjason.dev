import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import gsap from 'gsap';
import { Logo } from './logo.js';

let toggleNav;
let toggleNavItems;

export function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    toggleNav = gsap.from(ref.current, {
      height: 0,
      paused: true,
      duration: 0.4,
      ease: 'power1',
    });

    toggleNavItems = gsap.from(ref.current.querySelectorAll('a'), {
      left: '10rem',
      opacity: 0,
      paused: true,
      duration: 0.4,
      ease: 'power1',
      stagger: 0.01,
    });

    if (window.innerWidth >= 980) {
      toggleNav.seek(0.4);
      toggleNavItems.seek(0.4);
    }
  }, [ref]);

  function handleClick(event) {
    event.preventDefault();

    if (open) {
      toggleNav.reverse();
      toggleNavItems.reverse();
    } else {
      toggleNav.play();
      toggleNavItems.play();
    }

    setOpen(!open);
  }

  return (
    <header class="header">
      <div class="mobile-buttons">
        <a href="/" rel="home">
          <Logo />
        </a>
        <button onClick={handleClick}>{open ? 'close nav' : 'open nav'}</button>
      </div>
      <nav ref={ref}>
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
