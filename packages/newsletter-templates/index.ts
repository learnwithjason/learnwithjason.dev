import { readFileSync, writeFileSync } from "fs";
import mjml from 'mjml';

type FeaturedItem = {
    image: {
      src: string;
      alt: string;
    },
    heading: string;
    description: string;
    link: string;
};

type GetMarkupArgs = {
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
    .filter((ep: any) => new Date(ep.date) > date && ep.guest.name !== 'Jason Lengstorf')
    .slice(0, 3)
    .map((episode: any) => {
      return `
        <tr>
          <td style="padding: 8px 5px 4px 0">${new Date(episode.date).toLocaleDateString('en-US', { month: "short", day: 'numeric' })}</td>
          <td style="padding: 8px 0 4px">
            <img
              src="https://res.cloudinary.com/jlengstorf/image/fetch/w_70,h_70,c_fill,g_faces,f_auto,q_auto/${episode.guest.image}"
              alt="${episode.guest.name}"
              width="35px"
              style="border-radius: 50%; vertical-align: bottom;"
            />
          </td>
          <td style="padding: 8px 5px 4px 0">
          ${episode.guest.name}
          </td>
          <td style="padding: 8px 0 4px"><a href="${episode.uri}">${episode.title}</a></th>
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
            <th width="40px" style="font-size: 11px; font-weight: normal; padding: 4px 0;">Guest</th>
            <th width="100px" style="font-size: 11px; font-weight: normal; padding: 4px 0;"></th>
            <th style="font-size: 11px; font-weight: normal; padding: 4px 0;">Topic</th>
          </tr>
          ${formatted}
          <tr>
            <td colspan="4" style="padding: 12px 0 0; font-size: 12px;">
              Visit <a href="https://www.learnwithjason.dev/schedule">lwj.dev/schedule</a> to see all upcoming episodes.
            </td>
          </tr>
        </mj-table>
      </mj-column>
    </mj-section>
    `;

    writeFileSync('partial/schedule.mjml', mjml, 'utf-8');

    return mjml;
}

async function getFeaturedContent(featuredItems: FeaturedItem[]) {
  const formatted = featuredItems.map((c) => `
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
  `).join('');

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

  writeFileSync('partial/featured.mjml', mjml, 'utf-8');

  return mjml;
}

export async function getNewsletterTemplateMarkup({ featuredItems }: GetMarkupArgs) {
  await getSchedule();
  await getFeaturedContent(featuredItems);
  const rawMjml = readFileSync('./default.mjml', 'utf8');

  return mjml(rawMjml);
}

