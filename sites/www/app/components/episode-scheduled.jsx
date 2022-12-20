import { Fragment } from 'react';

import { EpisodePreview } from './episode-preview.jsx';
import { IconCalendar } from './icon-calendar.jsx';
import { ShareButton } from './share-button.jsx';
import { getImageAttributes } from '../util/get-image-attributes.js';

export function EpisodeScheduled({ episode, host, teacher }) {
	const { src } = getImageAttributes({
		host,
		teacher,
		title: episode.title,
		width: 500,
		height: 278,
	});

	return (
		<Fragment>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: `
            {
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "${episode.title} — Learn With Jason",
              "startDate": "${episode.startDate}",
              "endDate": "${episode.endDate}",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "location": {
                "@type": "VirtualLocation",
                "url": "https://twitch.tv/jlengstorf"
              },
              "image": [
                "${src}",
                "${teacher.image}"
              ],
              "description": "${episode.scheduleDescription}",
              "performer": [
                {
                  "@type": "Person",
                  "name": "${host.name}"
                },
                {
                  "@type": "Person",
                  "name": "${teacher.name}"
                }
              ],
              "organizer": {
                "@type": "Organization",
                "name": "Learn With Jason",
                "url": "https://www.learnwithjason.dev"
              }
            }
          `,
				}}
			/>
			<div className="block episode">
				<EpisodePreview episode={episode} hideLinks>
					<p>
						<a href="https://twitch.tv/jlengstorf" className="button">
							Watch on Twitch
						</a>
					</p>
					<div className="episode-links">
						<a href="/calendar">
							<IconCalendar /> Add on Google Calendar
						</a>
						<ShareButton
							title={episode.title}
							text={episode.description}
							url={`/${episode.slug}`}
							className="animate"
						/>
					</div>
				</EpisodePreview>
			</div>
		</Fragment>
	);
}
