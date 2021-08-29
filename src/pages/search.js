import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { Helmet } from 'react-helmet';
import algoliasearch from 'algoliasearch/lite.js';

const searchClient = algoliasearch(
  'MU9BHW5MNS',
  '4a0927c9a6b57b94c6b7601a3cc7c41f',
);

export default function Search() {
  useEffect(() => {
    async function loadSearch() {
      const [{ autocomplete, getAlgoliaResults }] = await Promise.all([
        import('/web_modules/@algolia/autocomplete-js.js'),
      ]);

      autocomplete({
        container: '#autocomplete',
        placeholder: 'Search for episodes',
        plugins: [],
        getSources({ query }) {
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
        },
      });
    }

    loadSearch();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <link rel="stylesheet" href="/styles/algolia-search.css" />
      </Helmet>
      <section class="block">
        <h1>Search the Site</h1>
        <p>
          You can search for any episodes of <em>Learn With Jason</em> or blog
          posts using this search field.
        </p>
        <div id="autocomplete" class="search-box-wrapper"></div>
        <p>
          <small>
            Want to see how this was built?{' '}
            <a href="/javascript-autocomplete">Watch the episode!</a>
          </small>
        </p>
      </section>
    </Fragment>
  );
}
