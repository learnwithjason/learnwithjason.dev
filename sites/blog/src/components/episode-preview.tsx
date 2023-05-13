import dayjs from 'dayjs';
import Utc from 'dayjs/plugin/utc.js';
import Timezone from 'dayjs/plugin/timezone.js';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';
import { Component, JSXElement, mergeProps } from 'solid-js';
import type { Episode } from '@lwj/types';

import { TeacherPhoto } from './teacher-photo.jsx';
import { IconInfo } from './icon-info.jsx';

import styles from './episode-preview.module.css';

dayjs.extend(Utc);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);

export const EpisodePreview: Component<{
	episode: Episode;
	hideLinks?: boolean;
	children?: JSXElement;
}> = (rawProps) => {
	const props = mergeProps({ hideLinks: false }, rawProps);

	const teacher = props.episode.guest;
	const host = props.episode.host;

	return (
		<div class={styles.preview}>
			<div class={styles.teacher}>
				<div class={styles.photo}>
					<TeacherPhoto
						imageURL={teacher.image}
						alt={teacher.name}
						width={150}
					/>
				</div>
				<p>{teacher.name}</p>
			</div>
			<div class={styles.details}>
				<p class="gradient-subheading">
					{dayjs(props.episode.date)
						.tz('America/Los_Angeles')
						.format('dddd, MMMM D @ h:mm A z')}
				</p>
				<h3>
					{!props.hideLinks ? (
						<a href={`/${props.episode.slug}`}>{props.episode.title}</a>
					) : (
						props.episode.title
					)}
				</h3>
				<p class={styles.description}>{props.episode.description}</p>
				{host && host.name !== 'Jason Lengstorf' && (
					<p class={styles.description}>
						With special guest host{' '}
						<a href={`https://twitter.com/${host.twitter}`}>{host.name}</a>!
					</p>
				)}
				<div class={styles.links}>
					{props.children
						? props.children
						: !props.hideLinks && (
								<>
									<a href={`/${props.episode.slug}`}>
										<IconInfo /> Episode Details
										<span class="visually-hidden">
											{' '}
											for {props.episode.title}
										</span>
									</a>
								</>
						  )}
				</div>
			</div>
		</div>
	);
};
