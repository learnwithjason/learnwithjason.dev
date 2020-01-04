/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
import { Link } from 'gatsby';
import logo from '../assets/learn-with-jason.svg';
import logoDark from '../assets/learn-with-jason-dark.svg';
import TwitchButton from './twitch-button';

const Header = ({ title }) => {
  const [colorMode, setColorMode] = useColorMode('light');

  return (
    <header
      sx={{
        position: 'relative',
        px: t => [
          '5vw',
          `calc((100vw - ${t.breakpoints[0]}) / 2)`,
          `calc((100vw - ${t.breakpoints[1]}) / 2)`,
        ],
        py: 2,
        variant: 'video-blog.header',
      }}
    >
      <Link
        to="/"
        sx={{
          display: 'block',
          width: '25vw',
          maxWidth: [100, 100, 150],
          mb: 0,
          mt: [0, 2],
          mx: 'auto',
          variant: 'video-blog.header.home-link',
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
          mt: 4,
        }}
      >
        <TwitchButton username="jlengstorf" colorMode={colorMode} />
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
                '&&': { color: 'white' },
                variant: 'video-blog.header.link',
              }}
              {...props}
            >
              {page.text}
            </Component>
          );
        })}
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
