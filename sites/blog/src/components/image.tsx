import type { ReactNode } from 'react';

type ImageProps = {
	src: string;
	alt: string;
};

export function Image({ src, alt }: ImageProps): ReactNode {
	return (
		<figure className="post-figure">
			<img src={src} alt={alt} />
		</figure>
	);
}
