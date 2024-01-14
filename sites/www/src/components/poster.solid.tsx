import { mergeProps } from 'solid-js';

type PosterProps = {
	slug: string;
	title: string;
	guest: { name: string };
	type?: 'video-poster' | 'poster';
	width?: number;
	height?: number;
	class?: string;
};

export const Poster = (rawProps: PosterProps) => {
	const props = mergeProps(
		{
			type: 'video-poster',
			width: 500,
			height: 280,
			class: '',
		},
		rawProps
	);

	// add max size to avoid huge images + teacher images are rarely hi-res enough
	const width = Math.min(props.width, 1920);

	// for srcSet, go from half-size up to 3x for various viewports
	const widths = [0.5, 1, 1.5, 2, 3].map((w) => w * width);

	const src = `https://www.learnwithjason.dev/${props.slug}/${props.type}.jpg`;
	const imageAttributes = {
		src,
		srcSet: widths
			.map((w) => {
				return `https://www.learnwithjason.dev/${props.slug}/w_${w}/${props.type}.jpg ${w}w`;
			})
			.join(', '),
		alt: `${props.title} (with ${props.guest.name})`,
		sizes: `(min-width: ${width}px) ${width}px, 90vw`,
	};

	return (
		<img
			class={props.class}
			src={imageAttributes.src}
			srcSet={imageAttributes.srcSet}
			sizes={imageAttributes.sizes}
			alt={imageAttributes.alt}
			width={width}
			height={props.height}
			loading="lazy"
		/>
	);
};
