/** @jsx jsx */
import { jsx } from 'theme-ui';

const Heading = ({ children, sx = {} }) => (
  <h1
    sx={(t) => ({
      ...t.styles.h1,
      ...sx,
    })}
  >
    {children}
  </h1>
);

export default Heading;
