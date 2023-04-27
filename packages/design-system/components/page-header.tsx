import { Component, JSXElement } from 'solid-js';
import styles from './page-header.module.css';

export const PageHeader: Component<{
	heading: string;
	lede: string;
	children?: JSXElement;
}> = (props) => {
	return (
		<header class={`block ${styles.hero}`}>
			<h1>{props.heading}</h1>
			<p innerHTML={props.lede} />
			<div class={styles.content}>{props.children}</div>
		</header>
	);
};
