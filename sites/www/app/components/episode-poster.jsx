export function EpisodePoster({
	slug,
	title,
	guest,
	width = 500,
	height = 280,
}) {
	const src = `https://www.learnwithjason.dev/${slug}/video-poster.jpg`;
	const imageAttributes = {
		src,
		srcSet: [
			`${src}?w=${width * 0.5} ${width * 0.5}w,`,
			`${src}?w=${width} ${width}w,`,
			`${src}?w=${width * 1.5} ${width * 1.5}w,`,
			`${src}?w=${width * 2} ${width * 2}w,`,
			`${src}?w=${width * 3} ${width * 3}w`,
		].join(' '),
		alt: `${title} (with ${guest.name})`,
		sizes: '(min-width: 1000px) 500px, 90vw',
	};

	return (
		<img
			src={imageAttributes.src}
			srcSet={imageAttributes.srcSet}
			sizes={imageAttributes.sizes}
			alt={imageAttributes.alt}
			width={width}
			height={height}
			loading="lazy"
		/>
	);
}
