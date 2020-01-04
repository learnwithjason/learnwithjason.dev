/** @jsx jsx */
import { jsx } from 'theme-ui';
import Layout from './layout.js';

export default ({ children }) => (
  <Layout>
    <div
      sx={{
        margin: '0 auto',
        maxWidth: '540px',
        width: '90vw',
        table: {
          width: 'calc(100% + 10vw)',
          mx: '-5vw',
          'th,td': {
            ':first-of-type': {
              width: 120,
            },
          },
        },
      }}
    >
      {children}
    </div>
  </Layout>
);
