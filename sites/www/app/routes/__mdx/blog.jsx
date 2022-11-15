import { Outlet } from 'remix';
import prismStyles from 'prismjs/plugins/diff-highlight/prism-diff-highlight.css';
import getShareImage from '@jlengstorf/get-share-image';
import styles from '~/styles/post.css';
import { loadMdxSingle } from '~/util/load-mdx.server.js';

export const loader = ({ request }) => {
  const url = new URL(request.url);
  if (url.pathname === '/blog') {
    return {
      meta: {
        title: 'Posts by Jason Lengstorf',
        description:
          'Blog posts about modern web development by Jason Lengstorf.',
      },
      share: {
        title: 'Posts by Jason Lengstorf',
        text: 'On modern web development.',
      },
    };
  }
  const { meta, share } = loadMdxSingle(url.pathname);

  return { meta, share };
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
    title: data.share.title,
    tagline: data.share?.text ?? 'On modern web development.',
    cloudName: 'jlengstorf',
    imagePublicID: 'lwj/post-share-2022',
    titleFont: 'jwf.otf',
    taglineFont: 'jwf-book.otf',
    textLeftOffset: 392,
    textColor: 'ffffff',
    titleBottomOffset: 340,
    taglineTopOffset: 376,
    titleFontSize: 55,
    taglineFontSize: 40,
  });

  return {
    title: data.meta.title,
    description: data.meta.description,
    image,
    'og:type': 'article',
    'og:url': url.toString(),
    'og:description': data.meta.description,
    'og:image': image,
    'twitter:dnt': 'on',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@LWJShow',
    'twitter:title': data.meta.title,
    'twitter:description': data.meta.description,
    'twitter:image': image,
  };
};

export default function BlogTemplate() {
  return <Outlet />;
}
