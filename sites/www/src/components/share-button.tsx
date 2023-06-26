import { Component, splitProps } from 'solid-js';
import { IconShare } from './icon-share.jsx';

export const ShareButton: Component<{
	title: string;
	text: string;
	url: string;
}> = (rawProps) => {
	const [props, ...rest] = splitProps(rawProps, ['title', 'text', 'url']);
	const [canShare, setCanShare] = useState(false);

	useEffect(() => {
		if ('share' in navigator) {
			setCanShare(true);
		}
	}, []);

	// TODO abstract this into a component and use in all sharing spots
	async function handleShare() {
		await navigator.share({
			title: props.title,
			text: props.text,
			url: props.url,
		});
	}

	return canShare ? (
		<button onClick={handleShare} {...rest}>
			<IconShare /> Share
		</button>
	) : null;
};
