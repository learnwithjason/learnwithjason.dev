import type { Component, JSXElement } from 'solid-js';

// @ts-ignore
import styles from './footer.module.css';

export const Footer: Component<{ children: JSXElement }> = (props) => {
	return (
		<footer class={styles.footer}>
			<h2>About the Host</h2>
			<div class={styles.bio}>
				<div class={styles.photo}>{props.children}</div>
				<div class={styles.details}>
					<p>
						<strong>Jason Lengstorf</strong> is a developer, teacher, lifelong
						learner, and a huge doofus. He helps companies build world-class
						devrel teams and blogs at{' '}
						<a href="https://jason.energy">jason.energy</a>.
					</p>
				</div>
			</div>
			<nav class={styles.links}>
				<a href="https://github.com/learnwithjason/learnwithjason.dev">
					Source Code
				</a>{' '}
				· <a href="/code-of-conduct">Code of Conduct</a>
			</nav>
		</footer>
	);
};
