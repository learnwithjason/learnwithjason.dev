/** @jsx jsx */
import { jsx } from 'theme-ui';
import { alpha } from '@theme-ui/color';

const Aside = ({ children, warning }) => (
  <aside
    sx={{
      bg: alpha(warning ? 'yellow.1' : 'secondary', 0.125),
      borderLeft: '3px solid',
      borderLeftColor: warning ? 'yellow.4' : 'primary',
      borderRadius: '0 0.25rem 0.25rem 0',
      fontStyle: 'italic',
      mt: 3,
      mx: '-5vw',
      px: '5vw',
      py: 3,
      'em, strong': {
        color: 'inherit',
      },
      p: {
        m: 0,
      },
    }}
  >
    {children}
  </aside>
);

export default Aside;
