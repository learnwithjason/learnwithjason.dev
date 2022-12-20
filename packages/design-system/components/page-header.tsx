import styles from './page-header.module.css';

type PageHeaderProps = {
	heading: string;
	lede: string;
};

export function PageHeader({ heading, lede }: PageHeaderProps) {
	return (
		<header className={`block ${styles.hero}`}>
			<h1>{heading}</h1>
			<p>{lede}</p>
		</header>
	);
}
