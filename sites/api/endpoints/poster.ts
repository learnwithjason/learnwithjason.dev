import { builder, Handler } from '@netlify/functions';
import { loadEpisodeBySlug } from '@lwj/sanity-helpers';
import { Episode } from '@lwj/types';
import dayjs from 'dayjs/esm';
import Utc from 'dayjs/esm/plugin/utc';
import Timezone from 'dayjs/esm/plugin/timezone';
import AdvancedFormat from 'dayjs/esm/plugin/advancedFormat';

dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

const dimensions = {
	width: 1920,
	height: 1080,
	title: {
		width: 800,
		height: 420,
		left: 1035,
		top: 475,
	},
	date: {
		width: 800,
		left: 1035,
		top: 395,
	},
	guestImage: {
		width: 950,
		height: 1080,
		left: 0,
		top: 0,
	},
	guestName: {
		width: 540,
		left: 5,
		top: 990,
	},
};

const ALLOWED_TYPES = ['poster.jpg', 'video-poster.jpg', 'schedule.jpg'];

function cleanText(text: string) {
	return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1');
}

const handlerFn: Handler = async (event) => {
	const [, slug, maybeWidthOrType, maybeType] = event.path
		.replace(/\/(api|.netlify\/functions|.netlify\/builders)\/poster/g, '')
		.split('/');

	let w = 1920;
	let type = 'poster.jpg';
	if (maybeWidthOrType.startsWith('w_')) {
		let width = Number(maybeWidthOrType.replace('w_', ''));
		if (width > 0) {
			w = width;
		}

		type = maybeType;
	} else {
		type = maybeWidthOrType;
	}

	// make sure the width is within bounds
	w = Math.min(6000, Math.max(100, w));

	if (!type || !ALLOWED_TYPES.includes(type)) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				error: { message: 'A poster type is required.' },
			}),
		};
	}

	const { error, data } = await loadEpisodeBySlug({ slug });
	const episode = data?.result as Episode;

	if (error) {
		return {
			statusCode: error.statusCode,
			body: error.message,
		};
	}

	const host = episode?.host ?? { name: 'Jason Lengstorf' };
	const guest = episode?.guest ?? { name: 'Jason Lengstorf' };
	const episodeType = guest.name === host.name ? 'solo' : 'interview';

	let filename = 'episode-2023-v2';

	if (episode.host?.twitter === 'bencodezen') {
		filename = 'episode-2023-ben-v2';
	}

	if (episodeType === 'solo') {
		filename = 'episode-2023-v2-solo';
	}

	if (type === 'video-poster.jpg' && episodeType === 'interview') {
		filename = 'episode-video-2023-v2';
	}

	if (type === 'video-poster.jpg' && episodeType === 'solo') {
		filename = 'episode-video-2023-v2-solo';
	}

	/*
	 * Tweak the font styles a bit so that short titles and long titles don’t
	 * look goofy on the cards. Not perfect, but better than it was before.
	 */
	let titleSize = 80;
	let lineSpacing = 0;

	if (episode.title.length < 25) {
		titleSize = 120;
		lineSpacing = -10;
	} else if (episode.title.length < 30) {
		titleSize = 100;
		lineSpacing = -10;
	} else if (episode.title.length >= 60) {
		titleSize = 60;
	} else if (episode.title.length >= 50) {
		titleSize = 70;
	} else if (episode.title.length >= 40) {
		titleSize = 75;
	}

	const posterUrl = [
		`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
		`/w_${dimensions.width},h_${dimensions.height},c_fill,q_auto,f_auto`,
		`/l_text:jwf-bold.otf_${titleSize}_line_spacing_${lineSpacing}:`,
		`${cleanText(episode.title)},`,
		`w_${dimensions.title.width},c_fit,co_white,g_north_west,`,
		`x_${dimensions.title.left},`,
		`y_${dimensions.title.top}`,
	];

	/*
	 * If this episode has a guest, add their image as an underlay and add their
	 * name to the card. Note that the text overlay *must* have the background or
	 * it won’t have a width due to a quirk of Cloudinary.
	 */
	if (episodeType === 'interview') {
		const guestImageBuffer = Buffer.from(guest.image)
			.toString('base64')
			.replace(/\//g, '_');

		let imageTop = dimensions.guestImage.top;
		let imageLeft = dimensions.guestImage.left;
		let nameTop = dimensions.guestName.top;
		let nameLeft = dimensions.guestName.left;

		posterUrl.push(
			`/u_fetch:${guestImageBuffer},w_${dimensions.guestImage.width},`,
			`h_${dimensions.guestImage.height},c_fill,g_north_west,`,
			`x_${imageLeft},y_${imageTop}`,
			`/l_text:jwf-bold.otf_44_center:${cleanText(guest.name)},`,
			`g_north_west,x_${nameLeft},y_${nameTop},`,
			`c_fit,co_white,w_${dimensions.guestName.width},b_rgb:00000001`
		);
	}

	if (type === 'schedule.jpg') {
		const dateString = dayjs(episode.date)
			.tz('America/Los_Angeles')
			.format('dddd, MMM D @ h:mm A z');

		posterUrl.push(
			`/l_text:jwf-book.otf_48_line_spacing_0:`,
			encodeURIComponent(dateString).replace('%2C', '%252C'),
			`,w_${dimensions.date.width},c_fit,g_north_west,co_rgb:97959D,`,
			`x_${dimensions.date.left},y_${dimensions.date.top}`
		);
	}

	posterUrl.push(
		`/w_${w}`, // allows for setting width via query string
		`/lwj/${filename}.jpg`
	);

	// console.log(posterUrl.join(''));

	/*
	 * To actually respond with the image and not with the URL, we need to fetch
	 * the image, load it into an array buffer, and send that back as
	 * base64-encoded data with the proper content-type headers.
	 */
	const response = await fetch(posterUrl.join(''));
	const resArrayBuffer = await response.arrayBuffer();
	const imageBuffer = Buffer.from(resArrayBuffer);

	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'image/jpeg',
			'Content-Disposition': `filename="${episode.slug}.jpg"`,
		},
		body: imageBuffer.toString('base64'),
		isBase64Encoded: true,
	};
};

export const handler = builder(handlerFn);
