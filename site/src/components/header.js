/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
import { Link } from 'gatsby';
import { alpha } from '@theme-ui/color';
import logo from '../assets/learn-with-jason.svg';
import logoDark from '../assets/learn-with-jason-dark.svg';
import TwitchButton from './twitch-button';

const Header = ({ title }) => {
  const [colorMode, setColorMode] = useColorMode('light');

  return (
    <header
      sx={{
        backgroundImage: t => `
          linear-gradient(
            10deg,
            ${t.colors.blue[6]},
            ${alpha('blue.6', 0)(t)} 50vh
          ),
          linear-gradient(
            180deg,
            ${alpha('teal.1', 0.25)(t)},
            ${alpha('teal.1', 0)(t)}
          ),
          linear-gradient(
            90deg,
            ${alpha('blue.3', 0.2)(t)},
            ${alpha('teal.2', 0.2)(t)}
          )
        `,
        position: 'sticky',
        px: t => [
          '5vw',
          `calc((100vw - ${t.breakpoints[0]}) / 2)`,
          `calc((100vw - ${t.breakpoints[1]}) / 2)`,
        ],
        pb: 3,
        pt: '7px',
        variant: 'video-blog.header',
        '@media (min-width: 600px)': {
          alignItems: 'flex-start',
          bg: 'background',
          display: 'flex',
          justifyContent: 'flex-start',
          pb: '2px',
          '::before,::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            background: t => `
              linear-gradient(160deg, ${t.colors.primary} 0%, ${t.colors.accent} 50%, ${t.colors.teal[1]} 90%)
            `,
          },
          '::before': {
            height: '5px',
            top: 0,
          },
          '::after': {
            height: '1px',
            opacity: 0.5,
            top: '100%',
          },
        },
      }}
    >
      <Link
        to="/"
        sx={{
          display: 'block',
          width: 60,
          mt: [0, 2],
          mx: 'auto',
          variant: 'video-blog.header.home-link',
          '@media (min-width: 600px)': {
            mt: -10,
            mb: -60,
            ml: 0,
            mr: 2,
            zIndex: 10,
          },
        }}
      >
        <img
          src={colorMode === 'light' ? logo : logoDark}
          alt={title}
          sx={{
            m: 0,
            maxWidth: '100%',
            variant: 'video-blog.header.logo',
          }}
        />
      </Link>
      <nav
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          m: 0,
        }}
      >
        {[
          {
            href: '/',
            text: 'Episodes',
          },
          {
            href: '/schedule',
            text: 'Schedule',
          },
          {
            href: '/blog',
            text: 'Blog',
          },
          {
            href: '/about',
            text: 'About',
          },
          {
            href: '/participate',
            text: 'Participate',
          },
        ].map(page => {
          const isExternal = page.href.match(/^http/);
          const Component = isExternal ? 'a' : Link;
          const props = { [isExternal ? 'href' : 'to']: page.href };
          return (
            <Component
              key={page.href}
              sx={{
                '&&': { color: 'nav' },
                variant: 'video-blog.header.link',
              }}
              {...props}
            >
              {page.text}
            </Component>
          );
        })}
        <TwitchButton username="jlengstorf" />
      </nav>
      <button
        role="switch"
        id="theme-toggle"
        aria-checked={colorMode === 'light' ? 'false' : 'true'}
        className={colorMode !== 'light' ? 'active' : ''}
        onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
        sx={{
          backgroundColor: 'heading',
          border: '1px solid',
          borderColor: 'secondary',
          borderRadius: '25px',
          position: 'absolute',
          right: '5vw',
          top: 3,
          height: '20px',
          width: '40px',
          variant: 'video-blog.header.theme-toggle',
          ':active,:focus': {
            '&&': { outline: 'none' },
            boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
          },
          '::after': {
            borderRadius: '50%',
            content: '""',
            display: 'block',
            position: 'absolute',
            top: '2px',
            left: '2px',
            width: 14,
            height: 14,
            backgroundColor: 'secondary',
          },
          '&.active::after': {
            left: '22px',
          },
        }}
      >
        <span className="visually-hidden">
          Activate {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </span>
      </button>
    </header>
  );
};

export default Header;
