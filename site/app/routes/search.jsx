import algoliasearch from 'algoliasearch/lite';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { Autocomplete } from '~/components/autocomplete';

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/@algolia/autocomplete-theme-classic',
    },
  ];
};

const searchClient = algoliasearch(
  'MU9BHW5MNS',
  '4a0927c9a6b57b94c6b7601a3cc7c41f',
);

export default function Search() {
  return (
    <>
      <section className="block">
        <h1>Search the Site</h1>
        <p>
          You can search for any episodes of <em>Learn With Jason</em> or blog
          posts using this search field.
        </p>

        <Autocomplete
          placeholder={'Search for episodes'}
          getSources={({ query }) => {
            return [
              {
                sourceId: 'episodes',
                getItemUrl({ item }) {
                  return `https://www.learnwithjason.dev${item.url}`;
                },
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName:
                          'netlify_c55763f8-efc8-4ed9-841a-186a011ed84b_main_all',
                        query,
                        params: {
                          hitsPerPage: 5,
                        },
                      },
                    ],
                  });
                },
                templates: {
                  item({ item, components }) {
                    return (
                      <a
                        className="aa-ItemLink"
                        href={`https://www.learnwithjason.dev${item.url}`}
                      >
                        <div className="aa-ItemContent">
                          <div className="aa-ItemIcon">
                            <img
                              src={item.image}
                              alt={item.title}
                              width="40"
                              height="40"
                            />
                          </div>
                          <div className="aa-ItemContentBody">
                            <div className="aa-ItemContentTitle">
                              <components.Highlight
                                hit={item}
                                attribute="title"
                              />
                            </div>
                            <div className="aa-ItemContentDescription">
                              <components.Snippet
                                hit={item}
                                attribute="content"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="aa-ItemActions">
                          <button
                            className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                            type="button"
                            title="Select"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              fill="currentColor"
                            >
                              <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                            </svg>
                          </button>
                        </div>
                      </a>
                    );
                  },
                },
              },
            ];
          }}
        />

        <p>
          <small>
            Want to see how this was built?{' '}
            <a href="/javascript-autocomplete">Watch the episode!</a>
          </small>
        </p>
      </section>
    </>
  );
}
