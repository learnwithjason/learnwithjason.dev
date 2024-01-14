import gsap from 'gsap';
import { mergeProps, Component } from 'solid-js';

const inactivePath =
	'M42 0 C19 0, 0 19, 0 42 C0 65, 18 84, 42 84 C65 84, 84 65, 84 42 C84 19, 65 0, 42 0 M42 2 C20 2, 2 20, 2 42 C2 64, 20 82, 42 82 C64 82, 82 64, 82 42 C82 20, 64 2, 42 2';
const activePath =
	'M42 0 C19 0, 0 19, 0 42 C0 65, 18 84, 42 100 C65 84, 84 65, 84 42 C84 19, 65 0, 42 0 M42 2 C20 2, 2 20, 2 42 C2 64, 20 82, 42 82 C64 82, 82 64, 82 42 C82 20, 64 2, 42 2';

export const TeacherPhoto: Component<{
	imageURL?: string;
	alt: string;
	width?: number;
	active?: boolean;
	animate?: boolean;
	skipFetch?: boolean;
}> = (rawProps) => {
	const props = mergeProps(
		{
			imageURL: 'https://github.com/jlengstorf.png',
			width: 150,
			active: false,
			animate: false,
			skipFetch: false,
		},
		rawProps
	);

	const url = props.skipFetch
		? props.imageURL
		: `https://res.cloudinary.com/jlengstorf/image/fetch/w_${
				props.width * 2
		  },h_${props.width * 2},c_fill,g_face,q_auto,f_auto/${props.imageURL}`;

	// useEffect(() => {
	// 	if (!props.animate) {
	// 		return;
	// 	}

	// 	const photo = ref.current;
	// 	const border = photo.querySelector('.border');
	// 	const config = { duration: 0.4, ease: 'back.inOut(2)' };

	// 	if (props.active) {
	// 		gsap.to(photo, {
	// 			...config,
	// 			ease: 'back.out(2)',
	// 			scale: 1,
	// 		});

	// 		gsap.to(border, {
	// 			...config,
	// 			ease: 'back.out(2)',
	// 			attr: {
	// 				d: activePath,
	// 			},
	// 		});
	// 	} else {
	// 		gsap.to(photo, {
	// 			...config,
	// 			scale: 0.8,
	// 			zIndex: 10,
	// 		});

	// 		gsap.to(border, {
	// 			...config,
	// 			attr: {
	// 				d: inactivePath,
	// 			},
	// 		});
	// 	}
	// }, [props.active]);

	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 84 110">
			<title>{props.alt}</title>
			<defs>
				<circle id="photo-area" cx="42" cy="42" r="38" />
			</defs>
			<clipPath id="photo">
				<use href="#photo-area" />
			</clipPath>

			<path
				class="border"
				fill="url(#lwj-gradient)"
				fill-rule="evenodd"
				d={inactivePath}
				clip-rule="evenodd"
			/>
			<use href="#photo-area" stroke-fill="white" stroke-width="4" />
			<image clip-path="url(#photo)" href={url} width="100%" />
		</svg>
	);
};
