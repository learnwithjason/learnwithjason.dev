export const CodePen = (props: {
	slug: string;
	title: string;
	height?: number;
}) => {
	return (
		<p
			class="codepen"
			data-height={props.height ?? 400}
			data-default-tab="result"
			data-slug-hash={props.slug}
			data-user="jlengstorf"
			style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
		>
			<span>
				See the Pen{' '}
				<a href={`https://codepen.io/jlengstorf/pen/${props.slug}`}>
					{props.title}
				</a>{' '}
				by Jason Lengstorf (
				<a href="https://codepen.io/jlengstorf">@jlengstorf</a>) on{' '}
				<a href="https://codepen.io">CodePen</a>.
			</span>
		</p>
	);
};
