/** @jsxImportSource react */
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import { useState } from 'react';

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
import { SearchIcon } from './icons/search-icon.tsx';
// @ts-ignore
import { NewsletterIcon } from './icons/newsletter-icon.jsx';
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

export function Search() {
	const [searchState, setSearchState] = useState<'open' | 'closed'>('closed');

	return (
		<>
			<button
				className="aa-OpenButton"
				data-name="main-search"
				onClick={() => setSearchState('open')}
			>
				<SearchIcon />
				<span className="aa-OpenButtonText" data-viewport="large">
					⌘+K
				</span>
				<span className="aa-OpenButtonText" data-viewport="small">
					search
				</span>
				<span className="sr-only">Open search</span>
			</button>
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
								label: 'Subscribe to the newsletter',
								description:
									'The best way to make sure you don’t miss anything.',
								url: '/newsletter',
								icon: () => (
									<div className="aa-LinkPicture">
										<NewsletterIcon />
									</div>
								),
							},
							{
								label: 'Add schedule to Google Calendar',
								description: 'See upcoming shows and events in your calendar.',
								url: '/calendar',
								icon: () => (
									<div className="aa-LinkPicture">
										<GoogleCalendarLogo />
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
					// {
					// 	sourceId: 'latest',
					// 	getItems: () => [
					// 		...episodes,
					// 		{
					// 			label: 'See all past episodes',
					// 			url: '/episodes',
					// 		},
					// 	],
					// 	getItemUrl({ item }: AlgoliaItem) {
					// 		return isLink(item) ? item.url : item.slug.current;
					// 	},
					// 	templates: {
					// 		header: () => <div className="aa-Header">Latest episodes</div>,
					// 		item({ item }: AlgoliaItem) {
					// 			if (isLink(item)) {
					// 				return <ButtonItem item={item} />;
					// 			}

					// 			return <EmptyQueryEpisodeItem item={item} />;
					// 		},
					// 	},
					// },
					// {
					// 	sourceId: 'schedule',
					// 	getItems: () => [
					// 		...schedule,
					// 		{
					// 			label: 'See all upcoming episodes',
					// 			url: '/schedule',
					// 		},
					// 	],
					// 	getItemUrl({ item }: AlgoliaItem) {
					// 		return isLink(item) ? item.url : item.slug.current;
					// 	},
					// 	templates: {
					// 		header: () => <div className="aa-Header">Upcoming episodes</div>,
					// 		item({ item }: AlgoliaItem) {
					// 			if (isLink(item)) {
					// 				return <ButtonItem item={item} />;
					// 			}

					// 			return <EmptyQueryEpisodeItem item={item} />;
					// 		},
					// 	},
					// },
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
										// @ts-expect-error nothing has changed, so not sure why this is mad
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
		</>
	);
}
