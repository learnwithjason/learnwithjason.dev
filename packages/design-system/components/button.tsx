import { Component, JSXElement, splitProps } from 'solid-js';

// @ts-ignore
import styles from './button.module.css';

type Props = {
	children: JSXElement;
	class?: string;
};

export const Button: Component<Props> = (rawProps) => {
	const [props, passthroughProps] = splitProps(rawProps, ['children']);

	return (
		<button
			{...passthroughProps}
			class={`${styles.button} ${passthroughProps.class}`}
		>
			{props.children}
		</button>
	);
};
