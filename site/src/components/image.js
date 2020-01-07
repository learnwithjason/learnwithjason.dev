/** @jsx jsx */
import { jsx } from 'theme-ui';
import { alpha } from '@theme-ui/color';

export default ({
  border = true,
  caption,
  children,
  creditType = 'Credit',
  creditLink = null,
  credit,
}) => (
  <figure
    sx={{
      mx: '-5vw',
      maxWidth: 'calc(100% + 10vw)',
      width: 'auto',
      '.gatsby-resp-image-wrapper': {
        mx: '0 !important',
      },
      p: {
        m: 0,
      },
      img: {
        borderColor: alpha('text', 0.25),
        borderStyle: 'solid',
        borderWidth: border ? 1 : 0,
        display: 'block',
        height: 'auto',
        width: '100%',
      },
    }}
  >
    {children}
    {(caption || credit) && (
      <figcaption
        sx={{
          mt: 1,
          px: '5vw',
          pb: 2,
          color: 'textLight',
          fontSize: 1,
          fontStyle: 'italic',
          lineHeight: 1,
        }}
      >
        {caption && <span dangerouslySetInnerHTML={{ __html: caption }} />}
        {credit && (
          <small
            sx={{
              display: 'block',
              mt: 1,
              color: 'textLight',
              fontSize: '9px',
              fontStyle: 'normal',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              'a,span': {
                display: 'inline-block',
                color: 'inherit',
                fontSize: '11px',
                fontWeight: 'normal',
                ml: 1,
                p: 1,
                textDecoration: 'none',
                ':active,:hover,:focus': {
                  bg: 'primary',
                  borderRadius: 2,
                  color: 'background',
                  outline: 0,
                },
              },
            }}
          >
            {creditType}:
            {creditLink ? (
              <a href={creditLink}>{credit}</a>
            ) : (
              <span>{credit}</span>
            )}
          </small>
        )}
      </figcaption>
    )}
  </figure>
);
