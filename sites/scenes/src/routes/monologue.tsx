import { Bubble } from '@lwj/design-system/components/bubble';
import { OneUpVideo } from '../components/one-up-video';

export function Monologue() {
	return (
		<>
			<OneUpVideo />

			{/* left bubbles */}
			<Bubble left={365} top={537} diameter={90} />
			<Bubble left={356} top={781} diameter={25} />
			<Bubble left={367} top={669} diameter={35} />
			<Bubble left={394} top={733} diameter={50} />
			<Bubble left={351} top={834} diameter={15} />

			{/* right bubbles */}
			<Bubble left={1444} top={188} diameter={120} />
			<Bubble left={1454} top={58} diameter={80} />
			<Bubble left={1550} top={130} diameter={50} />
			<Bubble left={1545} top={40} diameter={30} />
			<Bubble left={1592} top={85} diameter={10} />
		</>
	);
}
