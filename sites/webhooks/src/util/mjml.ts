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
	ledeHtml: string;
	previewText: string;
	featuredItems: FeaturedItem[];
};

async function getSchedule() {
	const date = new Date();
	const res = await fetch('https://www.learnwithjason.dev/api/v2/schedule');

	if (!res.ok) {
		console.error(res);
		return [];
	}

	const schedule = await res.json();

	const formatted = schedule
		.filter(
			(ep: any) =>
				new Date(ep.date) > date && ep.guest.name !== 'Jason Lengstorf'
		)
		.slice(0, 4)
		.map((episode: any, index: number) => {
			const bottomPadding = index === 3 ? '8px' : '4px';
			const episodeDate = new Date(episode.date).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
			});

			return `
        <tr>
          <td style="padding: 8px 5px ${bottomPadding} 0">${episodeDate}</td>
          <td style="padding: 8px 0 ${bottomPadding}">
            <img
              src="https://res.cloudinary.com/jlengstorf/image/fetch/w_70,h_70,c_fill,g_faces,f_auto,q_auto/${episode.guest.image}"
              alt="${episode.guest.name}"
              width="35px"
              style="border-radius: 50%; vertical-align: bottom;"
            />
          </td>
          <td style="padding: 8px 5px ${bottomPadding} 0">
          ${episode.guest.name}
          </td>
          <td style="padding: 8px 0 ${bottomPadding}"><a href="${episode.uri}">${episode.title}</a></th>
        </tr>
      `;
		})
		.join('');

	const mjml = `
    <!-- LWJ SCHEDULE -->
    <mj-section>
      <mj-column>
        <mj-spacer height="40px" />
        <mj-text mj-class="heading">
          <h2>Upcoming LWJ episodes:</h2>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section>
      <mj-column>
        <mj-table font-size="13px">
          <tr style="text-align: left; border-bottom: 1px solid;">
            <th width="55px" style="font-size: 11px; font-weight: normal; padding: 4px 0;">Date</th>
            <th width="40px" style="font-size: 11px; font-weight: normal; padding: 4px 0;">Expert</th>
            <th width="100px" style="font-size: 11px; font-weight: normal; padding: 4px 0;"></th>
            <th style="font-size: 11px; font-weight: normal; padding: 4px 0;">Topic</th>
          </tr>
          ${formatted}
          <tr>
            <td colspan="4" style="padding: 8px 0 0; font-size: 12px; border-top: 1px solid;">
              Visit <a href="https://www.learnwithjason.dev/schedule">lwj.dev/schedule</a> to see all upcoming episodes.
            </td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>
    `;

	return mjml;
}

async function getFeaturedContent(featuredItems: FeaturedItem[]) {
	const formatted = featuredItems
		.map(
			(c) => `
      <mj-column css-class="content-preview">
        <mj-image
          src="${c.image.src}"
          alt="${c.image.alt}"
          href="${c.link}"
        />
        <mj-text mj-class="heading" font-size="16px">
          <h3>${c.heading}</h3>
        </mj-text>
        <mj-text>
          <p>${c.description}</p>
        </mj-text>
        <mj-button href="${c.link}">Watch the episode</mj-button>
      </mj-column>
  `
		)
		.join('');

	const mjml = `<!-- LWJ CONTENT -->
  <mj-section>
    <mj-column>
      <mj-spacer height="40px" />
      <mj-text mj-class="heading">
        <h2>Learn With Jason around the web:</h2>
      </mj-text>
    </mj-column>
  </mj-section>

  <mj-section>
    ${formatted}
  </mj-section>
  `;

	return mjml;
}

export async function getNewsletterTemplateMarkup({
	ledeHtml,
	previewText,
	featuredItems,
}: GetMarkupArgs) {
	const schedule = await getSchedule();
	const featured = await getFeaturedContent(featuredItems);
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
        <mj-image width="120px" src="https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_240/v1579281727/lwj/learn-with-jason.png" alt="Learn With Jason"></mj-image>
        <mj-divider border-width="1px" />
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
    ${schedule}

    <!-- FOOTER -->
    <mj-section css-class="footer">
      <mj-column padding-top="40px">
        <mj-text mj-class="footer">
          <p>
            This message contians no gluten or sulfites. So if it gives you a headache or a tummyache it&lsquo;s either because the content is so hard-hitting that it physically affected you, or because I&lsquo;m such a doofus that you&lsquo;re taking psychic damage. So... you&lsquo;re welcome. Or, I&lsquo;m sorry.
          </p>
          <p>
            You&lsquo;re receiving this because you subscribed at either <a href="https://www.learnwithjason.dev">learnwithjason.dev</a>, <a href="https://jason.af">jason.af</a>, or one of Jason Lengstorf&lsquo;s other web properties. If you&lsquo;d like to stop receiving these, you can <a href="{{ unsubscribe_url }}">unsubscribe</a> any time.
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
