import styles from './page-header.module.css';

export function PageHeader() {
	return (
		<header className={`block ${styles.hero}`}>
			<h1>Blog Posts</h1>
			<p>
				Tutorials, quick tips, and other helpful resources for learning more
				about code!
			</p>
		</header>
	);
}
