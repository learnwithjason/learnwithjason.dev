import { Link } from '@remix-run/react';

import { TeacherPhoto } from './teacher-photo.jsx';
import { IconArrow } from './icon-arrow.jsx';
import { getTeacher } from '../util/get-teacher.js';

export function TopicList({ topic, title, episodes }) {
	return (
		<div className="topic-list-container">
			<h3 className="gradient-underline">{title}</h3>
			<ul className="topic-list">
				{episodes.map((episode) => {
					const teacher = getTeacher(episode.guest);

					return (
						<li key={episode.id} className="topic-episode">
							<div className="teacher-photo">
								<TeacherPhoto
									imageURL={teacher.image}
									alt={teacher.name}
									width={50}
								/>
							</div>
							<Link prefetch="intent" to={`/${episode.slug}`}>
								{episode.title}
							</Link>
						</li>
					);
				})}
			</ul>
			<div className="topic-links">
				<Link prefetch="intent" to={`/topic/${topic}`}>
					see more <span className="visually-hidden">from {title}</span>
					<IconArrow />
				</Link>
			</div>
		</div>
	);
}
