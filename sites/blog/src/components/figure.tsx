import type { ReactNode } from 'react';

type FigureProps = {
	caption?: string;
	credit?: string;
	creditLink?: string;
	creditType?: string;
	children: ReactNode;
	aspectRatio: boolean | number;
};

export function Figure({
	caption,
	credit,
	creditLink,
	creditType = 'Credit',
	children,
	aspectRatio = false,
}: FigureProps) {
	return (
		<figure className="post-figure">
			{aspectRatio && typeof aspectRatio === 'number' ? (
				<div
					className="embed-container"
					style={{ paddingBottom: aspectRatio * 100 + '%' }}
				>
					{children}
				</div>
			) : (
				children
			)}
			{(caption || credit) && (
				<figcaption>
					{caption}
					{credit && (
						<small>
							{creditType}:{' '}
							{creditLink ? (
								<a href={creditLink}>{credit}</a>
							) : (
								<span>{credit}</span>
							)}
						</small>
					)}
				</figcaption>
			)}
		</figure>
	);
}
