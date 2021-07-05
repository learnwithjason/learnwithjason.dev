import { h } from 'preact';
import { useEffect } from 'preact/hooks';

const searchClient = algoliasearch(
  'MU9BHW5MNS',
  '4a0927c9a6b57b94c6b7601a3cc7c41f',
);

export function Search() {
  useEffect(() => {
    autocomplete({
      container: '#autocomplete',
      placeholder: 'Search for episodes',
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
                          <components.Highlight hit={item} attribute="title" />
                        </div>
                        <div className="aa-ItemContentDescription">
                          <components.Snippet hit={item} attribute="content" />
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
  }, []);

  return <div id="autocomplete"></div>;
}
