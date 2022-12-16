import { Fragment } from 'react';
import { EpisodeVideo } from '../components/episode-video.jsx';

export function EpisodePosted({ episode, teacher, includePlaylist }) {
	return (
		<div className="block episode">
			<div className="episode-info-wrapper">
				<EpisodeVideo episode={episode} includePlaylist={includePlaylist} />
				<div className="episode-description">
					<h1>{episode.title}</h1>
					<p className="gradient-underline">
						with{' '}
						{teacher.twitter ? (
							<a href={`https://twitter.com/${teacher.twitter}`}>
								{teacher.name}
							</a>
						) : (
							teacher.name
						)}
					</p>
					<p>{episode.description}</p>
					<div className="episode-main-links">
						{episode.links.demo && (
							<a href={episode.links.demo} className="button">
								Demo
							</a>
						)}
						{episode.links.repo && (
							<a href={episode.links.repo} className="button">
								Source Code
							</a>
						)}
					</div>
					{episode.tags ? (
						<>
							<h2 className="episode-tags-heading gradient-underline">
								Topics
							</h2>
							<ul className="episode-tags">
								{episode.tags.map((tag) => (
									<li key={tag.slug}>
										<a href={`/topic/${tag.slug}`}>{tag.label}</a>
									</li>
								))}
							</ul>
						</>
					) : null}
				</div>
			</div>
			{episode.links.resources.length > 0 && (
				<div className="episode-resources">
					<h2 className="gradient-underline">Resources & Links</h2>
					<ul>
						{episode.links.resources?.map((link) => (
							<li key={link}>
								<a href={link}>{link}</a>
							</li>
						))}
					</ul>
				</div>
			)}
			<div className="episode-transcript">
				{episode.transcript && (
					<Fragment>
						<h2 className="gradient-underline">Transcript</h2>
						<div dangerouslySetInnerHTML={{ __html: episode.transcriptHtml }} />
					</Fragment>
				)}
			</div>
		</div>
	);
}
