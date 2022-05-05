import { Outlet } from 'remix';
import prismStyles from 'prismjs/plugins/diff-highlight/prism-diff-highlight.css';
import getShareImage from '@jlengstorf/get-share-image';
import styles from '~/styles/post.css';
import { loadMdxSingle } from '~/util/load-mdx.server.js';

export const loader = ({ request }) => {
  const url = new URL(request.url);
  const { meta, tags } = loadMdxSingle(url.pathname);

  return { ...meta, tags };
};

export const links = () => [
  { rel: 'stylesheet', href: prismStyles },
  { rel: 'stylesheet', href: '/styles/theme.css' },
  { rel: 'stylesheet', href: styles },
];

export const meta = ({ data, location }) => {
  const url = new URL('https://www.learnwithjason.dev');
  url.pathname = location.pathname;

  const image = getShareImage({
    title: data.title,
    tagline: data.tags.map((t) => `#${t}`).join(' '),
    cloudName: 'jlengstorf',
    imagePublicID: 'lwj/post-share-2022',
    titleFont: 'jwf.otf',
    taglineFont: 'jwf-book.otf',
    textLeftOffset: 392,
    textColor: 'ffffff',
    titleBottomOffset: 296,
    taglineTopOffset: 415,
    titleFontSize: 55,
    taglineFontSize: 42,
  });

  return {
    title: data.title,
    description: data.description,
    image,
    'og:type': 'article',
    'og:url': url.toString(),
    'og:description': data.description,
    'og:image': image,
    'twitter:dnt': 'on',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@LWJShow',
    'twitter:title': data.title,
    'twitter:description': data.description,
    'twitter:image': image,
  };
};

export default function BlogTemplate() {
  return <Outlet />;
}
