import { Outlet } from 'remix';
import prismStyles from 'prismjs/plugins/diff-highlight/prism-diff-highlight.css';
import styles from '~/styles/post.css';

export const links = () => [
  { rel: 'stylesheet', href: prismStyles },
  { rel: 'stylesheet', href: '/styles/theme.css' },
  { rel: 'stylesheet', href: styles },
];

export default function BlogTemplate() {
  return <Outlet />;
}
