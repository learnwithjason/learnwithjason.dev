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

	const src = `https://www.learnwithjason.dev/${props.slug}/${props.type}.jpg`;
	const imageAttributes = {
		src,
		srcSet: [
			`${src}?w=${props.width * 0.5} ${props.width * 0.5}w,`,
			`${src}?w=${props.width} ${props.width}w,`,
			`${src}?w=${props.width * 1.5} ${props.width * 1.5}w,`,
			`${src}?w=${props.width * 2} ${props.width * 2}w,`,
			`${src}?w=${props.width * 3} ${props.width * 3}w`,
		].join(' '),
		alt: `${props.title} (with ${props.guest.name})`,
		sizes: '(min-width: 1000px) 500px, 90vw',
	};

	return (
		<img
			class={props.class}
			src={imageAttributes.src}
			srcSet={imageAttributes.srcSet}
			sizes={imageAttributes.sizes}
			alt={imageAttributes.alt}
			width={props.width}
			height={props.height}
			loading="lazy"
		/>
	);
};
