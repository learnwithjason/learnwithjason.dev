/** @jsx jsx */
import { jsx } from 'theme-ui';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Embed from './embed';

const Video = ({ title, guest, body, embed }) => (
  <article sx={{ variant: 'video-blog.video' }}>
    <Embed embed={embed} />
    <h1>{title}</h1>
    <h2>Guest{guest.length > 1 ? 's' : ''}</h2>
    <ul>
      {guest.map(({ name, twitter }) => (
        <li key={`guest-${twitter}`}>
          <a href={`https://twitter.com/${twitter}`}>{name}</a>
        </li>
      ))}
    </ul>
    {body && <MDXRenderer>{body}</MDXRenderer>}
  </article>
);

export default Video;
