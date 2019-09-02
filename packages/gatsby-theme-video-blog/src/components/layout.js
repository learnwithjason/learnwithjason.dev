/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import { Global } from '@emotion/core';
import Helmet from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const Layout = ({ children }) => {
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
        fontFamily: 'body',
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
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <header>{title}</header>
      <div
        sx={{
          mb: 5,
          mt: [0, 0, 5],
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
