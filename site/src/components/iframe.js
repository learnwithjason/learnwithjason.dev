/** @jsx jsx */
import { jsx } from 'theme-ui';

const Iframe = ({ width, height, src, title, ...props }) => (
  <div
    className="gatsby-resp-iframe-wrapper"
    sx={{
      height: 0,
      overflow: 'hidden',
      pb: `${(height / width) * 100}%`,
      position: 'relative',
      width: '100%',
    }}
  >
    <iframe
      sx={{
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
      }}
      src={src}
      title={title}
      {...props}
    />
  </div>
);

export default Iframe;
