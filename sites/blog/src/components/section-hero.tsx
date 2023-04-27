import type { JSXElement } from 'solid-js';
import styles from './section-hero.module.css';

type HeroProps = {
	lede: string;
	children?: JSXElement;
};

export function SectionHero(props: HeroProps) {
	return (
		<section classList={{ block: true, [styles.hero]: true }}>
			<svg viewBox="0 0 800 250" class={styles['hero-heading']}>
				<defs>
					<g id="text-group" class={styles['text-group']}>
						<text x="50%" y="80">
							learn. build. grow.
						</text>
						<text x="50%" y="190" class={styles.bigger}>
							together.
						</text>
					</g>
				</defs>

				<rect class={styles['o-filler']} x="450" y="58" width="8" height="8" />
				<rect
					class={styles['o-filler2']}
					x="615"
					y="54"
					width="7"
					height="18"
				></rect>
				<rect
					class={styles['o-filler3']}
					x="535"
					y="54"
					width="7"
					height="18"
				></rect>
				<use
					id="gradient-stroke"
					class={styles['gradient-stroke']}
					href="#text-group"
				/>
				<use id="text" class={styles.text} href="#text-group" />
			</svg>
			<p>{props.lede}</p>
			{props.children}
		</section>
	);
}
