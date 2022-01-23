import { Outlet } from 'remix';
import styles from '~/styles/post.css';

export const links = () => [
  { rel: 'stylesheet', href: '/styles/theme.css' },
  { rel: 'stylesheet', href: styles },
];

export default function BlogTemplate() {
  return <Outlet />;
}
