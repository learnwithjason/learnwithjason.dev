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
    const nav = ref.current.querySelector('nav');

    gsap.set(nav, { height: 'auto' });
    gsap.set(nav.querySelectorAll('a'), { opacity: 1 });

    toggleNav = gsap.from(nav, {
      height: 0,
      paused: true,
      duration: 0.4,
      ease: 'power1',
    });

    toggleNavItems = gsap.from(nav.querySelectorAll('a'), {
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

    console.log(event.this.is.not.a.thing);

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
    <header class="header" ref={ref}>
      <a class="visually-hidden" href="#content">
        skip to content
      </a>
      <div class="mobile-buttons">
        <a href="/" rel="home">
          <Logo />
          <span class="visually-hidden">Home</span>
        </a>
        <button className="nav-toggle" onClick={handleClick}>
          {open ? 'close nav' : 'open nav'}
        </button>
      </div>
      <nav>
        <a href="/episodes">episodes</a>
        <a href="/schedule">schedule</a>
        {/* <a href="/">courses</a> */}
        <a href="/store">store</a>
        <a href="/blog">blog</a>
        <a href="/about">about</a>
        {/* <a href="/search">search</a> */}
      </nav>
    </header>
  );
}
