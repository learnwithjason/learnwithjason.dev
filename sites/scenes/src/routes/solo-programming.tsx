import { Bubble } from '@lwj/design-system/components/bubble';
import { OneUpVideo } from '../components/one-up-video';
import styles from './solo-programming.module.css';

export function SoloProgramming() {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.screen} />
				<div className={styles.videos}>
					<OneUpVideo size="sidebar-solo" />
				</div>
			</div>

			<Bubble left={1312} top={68} diameter={35} />
			<Bubble left={1850} top={99} diameter={50} />
			<Bubble left={1890} top={65} diameter={15} />
			<Bubble left={1790} top={380} diameter={120} />
			<Bubble left={1301} top={735} diameter={80} />
			<Bubble left={1886} top={502} diameter={25} />
			<Bubble left={1316} top={830} diameter={15} />
			<Bubble left={1838} top={745} diameter={35} />
			<Bubble left={1880} top={788} diameter={15} />
		</>
	);
}
