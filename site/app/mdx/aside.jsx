import { IconAlert } from '../components/icon-alert.jsx';

export function Aside({ children }) {
  return (
    <aside className="post-aside">
      <div className="aside-icon">
        <IconAlert />
      </div>
      <div className="aside-content">{children}</div>
    </aside>
  );
}
