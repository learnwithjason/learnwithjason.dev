import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { useState, useEffect } from 'react';

// @ts-ignore
import { searchClient } from './search-client';
import {
	ButtonItem,
	EmptyQueryEpisodeItem,
	LinkItem,
	QueryEpisodeItem,
	// @ts-ignore
} from './items.jsx';
// @ts-ignore
import { GoogleCalendarLogo } from './logos/google-calendar-logo.jsx';
// @ts-ignore
import { TwitchLogo } from './logos/twitch-logo.jsx';
// @ts-ignore
import { YouTubeLogo } from './logos/youtube-logo.jsx';
// @ts-ignore
import { isLink } from './utils/is-link.js';
// @ts-ignore
import { Autocomplete } from './autocomplete.jsx';

type AlgoliaItem = {
	item: {
		url: string;
		slug: {
			current: string;
		};
	};
};

type SearchProps = {
	episodes: object[];
	schedule: object[];
	searchState: 'open' | 'closed';
	setSearchState: (newState: 'open' | 'closed') => void;
};

export function Search({
	episodes,
	schedule,
	searchState,
	setSearchState,
}: SearchProps) {
	return (
		<Autocomplete
			placeholder="Search for episodes and posts"
			openOnFocus={true}
			autoFocus={true}
			defaultActiveItemId={0}
			isOpen={searchState === 'open'}
			onToggle={() =>
				setSearchState(searchState === 'open' ? 'closed' : 'open')
			}
			emptyQuery={() => [
				{
					sourceId: 'links',
					getItems: () => [
						{
							label: 'Add schedule to Google Calendar',
							description: 'Get LWJ upcoming shows in your calendar.',
							url: '/calendar',
							icon: () => (
								<div className="aa-LinkPicture">
									<GoogleCalendarLogo />
								</div>
							),
						},
						{
							label: 'Follow on Twitch',
							description: 'Watch LWJ live on Twitch when it airs.',
							url: 'https://twitch.tv/jlengstorf',
							icon: () => (
								<div className="aa-LinkPicture aa-LinkPicture--Twitch">
									<TwitchLogo />
								</div>
							),
						},
						{
							label: 'Subscribe on YouTube',
							description: 'Watch all past LWJ episodes.',
							url: 'https://www.youtube.com/channel/UCnty0z0pNRDgnuoirYXnC5A',
							icon: () => (
								<div className="aa-LinkPicture aa-LinkPicture--YouTube">
									<YouTubeLogo />
								</div>
							),
						},
					],
					getItemUrl: ({ item }: AlgoliaItem) => item.url,
					templates: {
						header: () => <div className="aa-Header">Links</div>,
						item: ({ item }: AlgoliaItem) => <LinkItem item={item} />,
					},
				},
				{
					sourceId: 'latest',
					getItems: () => [
						...episodes,
						{
							label: 'See all past episodes',
							url: '/episodes',
						},
					],
					getItemUrl({ item }: AlgoliaItem) {
						return isLink(item) ? item.url : item.slug.current;
					},
					templates: {
						header: () => <div className="aa-Header">Latest episodes</div>,
						item({ item }: AlgoliaItem) {
							if (isLink(item)) {
								return <ButtonItem item={item} />;
							}

							return <EmptyQueryEpisodeItem item={item} />;
						},
					},
				},
				{
					sourceId: 'schedule',
					getItems: () => [
						...schedule,
						{
							label: 'See all upcoming episodes',
							url: '/schedule',
						},
					],
					getItemUrl({ item }: AlgoliaItem) {
						return isLink(item) ? item.url : item.slug.current;
					},
					templates: {
						header: () => <div className="aa-Header">Upcoming episodes</div>,
						item({ item }: AlgoliaItem) {
							if (isLink(item)) {
								return <ButtonItem item={item} />;
							}

							return <EmptyQueryEpisodeItem item={item} />;
						},
					},
				},
			]}
			sources={() => [
				{
					sourceId: 'episodes',
					getItemUrl({ item }: AlgoliaItem) {
						return item.url;
					},
					getItems({ query }: { query: any }) {
						return getAlgoliaResults({
							searchClient,
							queries: [
								{
									indexName:
										'netlify_c55763f8-efc8-4ed9-841a-186a011ed84b_main_all',
									query,
									params: {
										hitsPerPage: 12,
									},
								},
							],
						});
					},
					templates: {
						item: ({ item }: AlgoliaItem) => <QueryEpisodeItem item={item} />,
					},
				},
			]}
			noResults={({ query }: { query: any }) => (
				<div className="aa-NoResults">
					<div className="aa-NoResultsLabel">No results for "{query}".</div>
					<div className="aa-NoResultsDescription">
						Here's a consolation Corgi.
					</div>
					<img
						className="aa-NoResultsImage"
						src="https://cdn.shopify.com/s/files/1/0589/5798/8049/products/corgi-pal.png?v=1627084571"
						alt="a cartoon corgi with rainbow colors"
					/>
				</div>
			)}
		/>
	);
}
