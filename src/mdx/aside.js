import { h } from 'preact';
import { IconAlert } from '../components/icon-alert.js';

export function Aside({ children }) {
  return (
    <aside class="post-aside">
      <div class="aside-icon">
        <IconAlert />
      </div>
      <div class="aside-content">{children}</div>
    </aside>
  );
}
