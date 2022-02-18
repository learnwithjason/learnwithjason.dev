import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';

import { searchClient } from './search-client';
import {
  ButtonItem,
  EmptyQueryEpisodeItem,
  LinkItem,
  QueryEpisodeItem,
} from './items.jsx';
import { GoogleCalendarLogo } from './logos/google-calendar-logo.jsx';
import { TwitchLogo } from './logos/twitch-logo.jsx';
import { YouTubeLogo } from './logos/youtube-logo.jsx';
import { isLink } from './utils/is-link.js';
import { Autocomplete } from './autocomplete.jsx';

export function Search({ data, isOpen, onToggle }) {
  const { schedule, episodes } = data;

  return (
    <Autocomplete
      placeholder="Search for episodes and posts"
      openOnFocus={true}
      autoFocus={true}
      defaultActiveItemId={0}
      isOpen={isOpen}
      onToggle={(nextIsOpen) => {
        onToggle(nextIsOpen);

        document.body.style.overflow = nextIsOpen ? 'hidden' : '';

        const searchParams = new URLSearchParams(window.location.search);
        const search = searchParams.get('search');

        if (!nextIsOpen && search !== null) {
          history.pushState(null, '', window.location.pathname);
        }
      }}
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
          getItemUrl: ({ item }) => item.url,
          templates: {
            header: () => <div className="aa-Header">Links</div>,
            item: ({ item }) => <LinkItem item={item} />,
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
          getItemUrl({ item }) {
            return isLink(item) ? item.url : item.slug.current;
          },
          templates: {
            header: () => <div className="aa-Header">Latest episodes</div>,
            item({ item }) {
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
          getItemUrl({ item }) {
            return isLink(item) ? item.url : item.slug.current;
          },
          templates: {
            header: () => <div className="aa-Header">Upcoming episodes</div>,
            item({ item }) {
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
          getItemUrl({ item }) {
            return item.url;
          },
          getItems({ query }) {
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
            item: ({ item }) => <QueryEpisodeItem item={item} />,
          },
        },
      ]}
      noResults={({ query }) => (
        <div className="aa-NoResults">
          <div className="aa-NoResultsLabel">No results for "{query}".</div>
          <div className="aa-NoResultsDescription">
            Here's a consolation Corgi.
          </div>
          <img
            className="aa-NoResultsImage"
            src="https://cdn.shopify.com/s/files/1/0589/5798/8049/products/corgi-pal.png?v=1627084571"
          />
        </div>
      )}
    />
  );
}
