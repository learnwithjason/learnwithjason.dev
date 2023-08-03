import { Figure } from './figure';

export const YouTube = ({ id }: { id: string }) => {
	return (
		<Figure aspectRatio={9 / 16}>
			<iframe
				width="560"
				height="315"
				src={`https://www.youtube-nocookie.com/embed/${id}`}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		</Figure>
	);
};
