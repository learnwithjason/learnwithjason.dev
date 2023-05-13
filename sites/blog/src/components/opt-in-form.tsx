import { Component, JSXElement, mergeProps, Show } from 'solid-js';
import styles from './opt-in-form.module.css';

export const OptInForm: Component<{
	heading?: string;
	disclaimer?: string;
	constrained?: boolean;
	children?: JSXElement;
}> = (rawProps) => {
	const props = mergeProps(
		{
			constrained: false,
			heading:
				'Learn from experts. Build something new. Grow your career. Let’s do it together.',
		},
		rawProps
	);

	return (
		<aside
			classList={{
				[styles['opt-in']]: true,
				[styles.constrained]: props.constrained,
			}}
		>
			<form action="/api/v2/subscribe" method="post">
				<Show when={!props.children} fallback={props.children}>
					<h2>{props.heading}</h2>
					<p>
						My life got way better when I stopped worrying about picking the
						“right” thing and focused on finding the fun in learning instead.{' '}
						<strong>
							I learn as much I can, build things often, and share what I’m
							learning with my friends.
						</strong>
					</p>
					<p>
						I consider the folks on my newsletter to be my friends — subscribe
						and I’ll share what I’m learning and building. Let’s grow our
						careers together!
					</p>
				</Show>

				<label for="firstName">First Name</label>
				<input type="text" name="firstName" id="firstName" required />

				<label for="email">Email</label>
				<input type="email" name="email" id="email" required />

				<button>Subscribe</button>

				<Show when={props.disclaimer}>
					<p class={styles.disclaimer}>{props.disclaimer}</p>
				</Show>
			</form>
		</aside>
	);
};
