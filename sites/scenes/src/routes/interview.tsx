import { Bubble } from '@lwj/design-system/components/bubble';
import { TwoUpVideo } from '../components/two-up-video';

export function Interview() {
	return (
		<>
			<TwoUpVideo />

			{/* left bubbles */}
			<Bubble left={45} top={502} diameter={90} />
			<Bubble left={36} top={746} diameter={25} />
			<Bubble left={47} top={634} diameter={35} />
			<Bubble left={74} top={698} diameter={50} />
			<Bubble left={31} top={799} diameter={15} />

			{/* center bubbles */}
			<Bubble left={934} top={408} diameter={150} />
			<Bubble left={904} top={310} diameter={50} />
			<Bubble left={928} top={560} diameter={30} />
			<Bubble left={968} top={370} diameter={15} />
			<Bubble left={955} top={230} diameter={90} />

			{/* right bubbles */}
			<Bubble left={1764} top={208} diameter={120} />
			<Bubble left={1774} top={78} diameter={80} />
			<Bubble left={1860} top={150} diameter={50} />
			<Bubble left={1864} top={60} diameter={30} />
			<Bubble left={1884} top={30} diameter={10} />
		</>
	);
}
