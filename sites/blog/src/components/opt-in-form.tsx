import { Component, JSXElement, mergeProps, Show } from 'solid-js';
import styles from './opt-in-form.module.css';

export const OptInForm: Component<{
	heading?: string;
	children?: JSXElement;
}> = (rawProps) => {
	const props = mergeProps(
		{
			heading: 'Build better web apps',
		},
		rawProps
	);

	return (
		<aside class={styles['opt-in']}>
			<form action="/api/subscribe" method="post">
				<Show when={!props.children} fallback={props.children}>
					<h2>{props.heading}</h2>
					<p>
						I spend a lot of time thinking about how to{' '}
						<strong>
							build web experiences that are fast, secure, maintainable,
							scalable, and fun to build.
						</strong>
					</p>
					<p>
						Join my newsletter and I’ll boop you on the brain what I’ve learned
						about building modern web apps.
					</p>
				</Show>

				<label for="firstName">First Name</label>
				<input type="text" name="firstName" id="firstName" required />

				<label for="email">Email</label>
				<input type="email" name="email" id="email" required />

				<button>Subscribe</button>
			</form>
		</aside>
	);
};
