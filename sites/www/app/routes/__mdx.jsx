import { Outlet } from '@remix-run/react';
import postStyles from '~/styles/post.css';

export const links = () => {
	return [{ rel: 'stylesheet', href: postStyles }];
};

export default function MdxLayout() {
	return <Outlet />;
}
