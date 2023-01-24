import { JSXElement, mergeProps, Show } from 'solid-js';

type FigureProps = {
	caption?: string;
	credit?: string;
	creditLink?: string;
	creditType?: string;
	children: JSXElement;
	aspectRatio: number;
};

export function Figure(rawProps: FigureProps) {
	const props = mergeProps(
		{
			creditType: 'Credit',
			aspectRatio: -1,
		},
		rawProps
	);
	return (
		<figure class="post-figure">
			<Show when={props.aspectRatio > 0} fallback={props.children}>
				<div
					class="embed-container"
					style={{ 'padding-bottom': props.aspectRatio * 100 + '%' }}
				>
					{props.children}
				</div>
			</Show>

			<Show when={props.caption || props.credit}>
				<figcaption>
					{props.caption}
					<Show when={props.credit}>
						<small>
							{props.creditType}:
							<Show
								when={props.creditLink}
								fallback={<span>{props.credit}</span>}
							>
								<a href={props.creditLink}>{props.credit}</a>
							</Show>
						</small>
					</Show>
				</figcaption>
			</Show>
		</figure>
	);
}
