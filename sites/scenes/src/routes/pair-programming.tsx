import { Bubble } from '@lwj/design-system/components/bubble';
import { TwoUpVideo } from '../components/two-up-video';
import styles from './pair-programming.module.css';

export function PairProgramming() {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.screen} />
				<div className={styles.videos}>
					<TwoUpVideo size="sidebar" />
				</div>
			</div>

			<Bubble left={1312} top={15} diameter={35} />
			<Bubble left={1859} top={99} diameter={50} />
			<Bubble left={1316} top={379} diameter={15} />
			<Bubble left={1790} top={380} diameter={120} />
			<Bubble left={1301} top={725} diameter={80} />
			<Bubble left={1886} top={502} diameter={25} />
			<Bubble left={1316} top={820} diameter={15} />
			<Bubble left={1843} top={795} diameter={35} />
			<Bubble left={1890} top={828} diameter={15} />
		</>
	);
}
