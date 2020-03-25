/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { graphql, useStaticQuery } from 'gatsby';
import { Global } from '@emotion/core';
import Helmet from 'react-helmet';
import Header from './header';

const Layout = ({ children, pageContext: { frontmatter = {} } = {} }) => {
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <Styled.root
      sx={{
        backgroundBlendMode: 'normal, multiply, normal',
        backgroundColor: 'background',
        'a, button, summary': {
          ':active,:focus': {
            outline: t => `2px solid ${t.colors.primary}`,
            outlineOffset: '2px',
          },
        },
        fontFamily: 'body',
        minHeight: '100vh',
        pb: 3,
        variant: 'video-blog.layout.root',
      }}
    >
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box',
          },
          'html,body': {
            margin: 0,
          },
          '.visually-hidden': {
            position: 'absolute !important',
            height: '1px',
            width: '1px',
            overflow: 'hidden',
            clip: 'rect(1px, 1px, 1px, 1px)',
            whiteSpace: 'nowrap',
          },
        }}
      />
      <Helmet titleTemplate="%s · Learn With Jason">
        <html lang="en" />
        <title>{frontmatter.title || title}</title>
        <meta
          name="description"
          content={frontmatter.description || description}
        />
        <link rel="stylesheet" href="https://use.typekit.net/fnr1orp.css" />
      </Helmet>
      <Header title={title} />
      <div
        sx={{
          mb: 5,
          mt: [0, 0, 4],
          mx: 'auto',
          maxWidth: t => `calc(${t.breakpoints.slice(-1)[0]} + 100px)`,
          width: '90vw',
          variant: 'video-blog.layout.container',
        }}
      >
        <main sx={{ variant: 'video-blog.layout.main' }}>{children}</main>
      </div>
    </Styled.root>
  );
};

export default Layout;
