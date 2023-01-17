import type { Component, JSXElement } from 'solid-js';
import { Logo } from './logo';

// @ts-ignore
import styles from './header.module.css';

export const Header: Component<{
	children: JSXElement;
}> = (props) => {
	return (
		<header class={styles.header}>
			<a href="#content" class="visually-hidden">
				skip to content
			</a>

			<div class={styles.logo}>
				<a href="/" rel="home">
					<Logo />
					<span class="visually-hidden">home</span>
				</a>
			</div>

			{props.children}
		</header>
	);
};
