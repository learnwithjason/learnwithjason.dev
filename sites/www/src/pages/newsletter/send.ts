import sgMail from '@sendgrid/mail';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const get = async () => {
	const parser = new MarkdownIt();
	sgMail.setApiKey(import.meta.env.SENDGRID_API_KEY);

	const [newsletter] = await getCollection('newsletter', ({ data }) => {
		const sendDate = dayjs.utc(data.date).tz('America/Los_Angeles', true);

		return dayjs().isSame(sendDate, 'day');
	});

	if (!newsletter) {
		return new Response('no newsletter to send today');
	}

	const content = parser.render(newsletter.body);

	// await sgMail
	// 	.send({
	// 		to: 'jason@learnwithjason.dev',
	// 		from: 'Learn With Jason <info@learnwithjason.dev>',
	// 		subject: 'Sending with SendGrid is Fun',
	// 		text: 'and easy to do anywhere, even with Node.js',
	// 		html: '<strong>and easy to do anywhere, even with Node.js</strong>',
	// 	})
	// 	.catch((error: unknown) => {
	// 		console.error(error);
	// 	});

	return new Response(JSON.stringify({ content }));
};
