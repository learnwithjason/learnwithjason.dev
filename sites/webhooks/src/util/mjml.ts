import mjml2html from 'mjml';

type FeaturedItem = {
	image: {
		src: string;
		alt: string;
	};
	heading: string;
	description: string;
	link: string;
};

type GetMarkupArgs = {
	subject: string;
	ledeHtml: string;
	previewText: string;
	featuredItems: FeaturedItem[];
};

function getUtmLink({
	url,
	campaign,
	source = 'newsletter',
	medium,
}: {
	url: string;
	campaign: string;
	source?: string;
	medium: string;
}) {
	const utmUrl = new URL(url);

	if (!utmUrl.searchParams.get('utm_campaign')) {
		//  https://lwj.dev/blog/get-hired-devrel?utm_source=newsletter&utm_campaign=200k-dev
		utmUrl.searchParams.set('utm_campaign', campaign);
		utmUrl.searchParams.set('utm_source', source);
		utmUrl.searchParams.set('utm_medium', medium);
	}

	return utmUrl.toString();
}

// async function getSchedule({ utm_campaign }: { utm_campaign: string }) {
// 	const date = new Date();
// 	const res = await fetch('https://www.learnwithjason.dev/api/v2/schedule');

// 	if (!res.ok) {
// 		console.error(res);
// 		return [];
// 	}

// 	const schedule = await res.json();
// 	console.log(schedule);

// 	const formatted = schedule
// 		.filter(
// 			(ep: any) =>
// 				new Date(ep.date) >= date && ep.guest.name !== 'Jason Lengstorf',
// 		)
// 		.slice(0, 4)
// 		.map((episode: any, index: number) => {
// 			const bottomPadding = index === 3 ? '8px' : '4px';
// 			const episodeDate = new Date(episode.date).toLocaleDateString('en-US', {
// 				month: 'short',
// 				day: 'numeric',
// 			});
// 			const link = getUtmLink({
// 				url: episode.uri,
// 				campaign: utm_campaign,
// 				medium: 'schedule-link',
// 			});

// 			return `
// 				<tr>
// 					<td style="padding: 8px 5px ${bottomPadding} 0">${episodeDate}</td>
// 					<td style="padding: 8px 0 ${bottomPadding}">
// 						<img
// 							src="https://res.cloudinary.com/jlengstorf/image/fetch/w_70,h_70,c_fill,g_faces,f_auto,q_auto/${episode.guest.image}"
// 							alt="${episode.guest.name}"
// 							width="35px"
// 							style="border-radius: 50%; vertical-align: bottom;"
// 						/>
// 					</td>
// 					<td style="padding: 8px 5px ${bottomPadding} 0">
// 					${episode.guest.name}
// 					</td>
// 					<td style="padding: 8px 0 ${bottomPadding}"><a href="${link}">${episode.title}</a></th>
// 				</tr>
// 			`;
// 		})
// 		.join('');

// 	if (formatted.length < 1) {
// 		return '';
// 	}

// 	const mjml = `
// 		<!-- LWJ SCHEDULE -->
// 		<mj-section>
// 			<mj-column>
// 				<mj-spacer height="20px" />
// 				<mj-text mj-class="heading">
// 					<h2>Upcoming Learn With Jason episodes:</h2>
// 				</mj-text>
// 			</mj-column>
// 		</mj-section>

// 		<mj-section>
// 			<mj-column>
// 				<mj-table font-size="13px">
// 					<tr style="text-align: left; border-bottom: 1px solid;">
// 						<th width="55px" style="font-size: 11px; font-weight: normal; padding: 4px 0;">Date</th>
// 						<th width="40px" style="font-size: 11px; font-weight: normal; padding: 4px 0;">Expert</th>
// 						<th width="100px" style="font-size: 11px; font-weight: normal; padding: 4px 0;"></th>
// 						<th style="font-size: 11px; font-weight: normal; padding: 4px 0;">Topic</th>
// 					</tr>
// 					${formatted}
// 					<tr>
// 						<td colspan="4" style="padding: 8px 0 0; font-size: 12px; border-top: 1px solid;">
// 							Visit <a href="https://codetv.dev/series/learn-with-jason/s8">the series home page</a> to see all episodes.
// 						</td>
// 					</tr>
// 				</mj-table>
// 			</mj-column>
// 		</mj-section>
// 	`;

// 	return mjml;
// }

async function getFeaturedContent({
	featuredItems,
	utm_campaign,
}: {
	featuredItems: FeaturedItem[];
	utm_campaign: string;
}) {
	const formatted = featuredItems
		.map((c) => {
			const link = getUtmLink({
				url: c.link,
				campaign: utm_campaign,
				medium: 'featured-link',
			});

			return `
				<mj-column css-class="content-preview">
					<mj-image
						src="${c.image.src}"
						alt="${c.image.alt}"
						href="${link}"
					/>
					<mj-text mj-class="heading" font-size="16px">
						<h3>${c.heading}</h3>
						<p>${c.description}</p>
					</mj-text>
					<mj-button href="${link}">Check it out</mj-button>
				</mj-column>
      `;
		})
		.join('');

	const mjml = `
	<mj-section padding-bottom="20px">
		${formatted}
	</mj-section>
  `;

	return mjml;
}

export async function getNewsletterTemplateMarkup({
	subject,
	ledeHtml,
	previewText,
	featuredItems,
}: GetMarkupArgs) {
	const utm_campaign = subject
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/^-+|[^a-z0-9-\s]|-+$/gi, '')
		.replace(/-+/g, '-');
	// const schedule = await getSchedule({ utm_campaign });
	const featured = await getFeaturedContent({ featuredItems, utm_campaign });
	const mjml = `<mjml lang="en">
	<mj-head>
		<mj-preview>${previewText}</mj-preview>

		<mj-attributes>
			<mj-all color="inherit" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" font-size="16px" line-height="1.45" />
			<mj-section padding="0" />
			<mj-column padding="0" />
			<mj-class name="heading" font-size="18px" line-height="1.1" />
			<mj-class name="footer" font-size="12px" />
			<mj-button align="left" background-color="#c10b84" color="#ffffff" font-weight="900" font-family="Mallory,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" font-size="14px" line-height="100%" text-transform="uppercase" />
		</mj-attributes>

		<mj-style>
			:root {
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
			}

			h1,
			h2,
			h3 {
				color: #161420;
				font-family: Mallory, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
				font-size: inherit;
				font-weight: 600;
				line-height: 1.1;
				margin: 0;
				padding: 0;
			}

			.theme {
				color: #403c4a;
			}

			.footer p {
				color: #78757f;
			}

			.footer a {
				color: inherit;
				text-transform: lowercase;
			}

			* {
				border-color: #c8c6cd !important;
			}
		</mj-style>
	</mj-head>

	<mj-body css-class="theme" background-color="#FFFFFF">

		<!-- HEADER -->
		<mj-section>
			<mj-column>
				<mj-image src="https://res.cloudinary.com/jlengstorf/image/upload/f_auto/q_auto/v1739239348/codetv/newsletter-banner.png" alt="CodeTV: tv for developers"></mj-image>
			</mj-column>
		</mj-section>

		<!-- INTRO -->
		<mj-section>
			<mj-column>
				<mj-text>
					${ledeHtml}
				</mj-text>
			</mj-column>
		</mj-section>

		${featured}

		<mj-section>
			<mj-column>
				<mj-image
					src="https://res.cloudinary.com/jlengstorf/image/upload/f_auto/q_auto/v1739239345/codetv/support-banner.png"
					alt="Early access to new episodes and directly fund new shows. Click here to support CodeTV."
					href="https://codetv.dev/support"
				/>
			</mj-column>
		</mj-section>

		<!-- FOOTER -->
		<mj-section css-class="footer">
			<mj-column padding-top="40px">
				<mj-text mj-class="footer">
					<p>
						This message contains no gluten, sulfites, parabens, or microplastics. If it gives you a headache or a tummyache it&rsquo;s either because the content is so good it hurts&hellip; or because we&rsquo;re such dorks it&rsquo;s causing psychic damage. So... you&rsquo;re welcome. Or we&rsquo;re sorry.
					</p>
					<p>
						You&rsquo;re receiving this because you subscribed at codetv.dev. Or, if you&rsquo;ve been here a while, you may have subscribed at learnwithjason.dev or jason.energy or even — if you&rsquo;re a real OG — at lengstorf.com. If you&rsquo;d like to stop receiving these, you can <a href="{{ unsubscribe_url }}">unsubscribe</a> any time.
					</p>
					<p>
						{{ address }}
					</p>
				</mj-text>
			</mj-column>
		</mj-section>
	</mj-body>
</mjml>
`;

	return mjml2html(mjml);
}
