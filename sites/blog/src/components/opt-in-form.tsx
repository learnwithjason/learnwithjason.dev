import { Fragment, ReactNode } from 'react';
import styles from './opt-in-form.module.css';

type OptInFormProps = {
	heading?: String;
	children?: ReactNode;
};

export function OptInForm({
	heading = 'Build better web apps',
	children,
}: OptInFormProps) {
	return (
		<aside className={styles['opt-in']}>
			<form action="/api/subscribe" method="POST">
				{!children ? (
					<Fragment>
						<h2>{heading}</h2>
						<p>
							I spend a lot of time thinking about how to{' '}
							<strong>
								build web experiences that are fast, secure, maintainable,
								scalable, and fun to build.
							</strong>
						</p>
						<p>
							Join my newsletter and I’ll boop you on the brain what I’ve
							learned about building modern web apps.
						</p>
					</Fragment>
				) : (
					children
				)}

				<label htmlFor="firstName">First Name</label>
				<input type="text" name="firstName" id="firstName" required />

				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" required />

				<button>Subscribe</button>
			</form>
		</aside>
	);
}
