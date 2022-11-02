const API_URL =
  process.env.API_URL || process.env.URL || 'https://www.learnwithjason.dev';

export async function loadAllEpisodes() {
  const [
    episodes1,
    episodes2,
    episodes3,
    episodes4,
    episodes5,
    episodes6,
    episodes7,
  ] = await Promise.all([
    fetch(`${API_URL}/api/episodes/page/1`).then((res) => res.json()),
    fetch(`${API_URL}/api/episodes/page/2`).then((res) => res.json()),
    fetch(`${API_URL}/api/episodes/page/3`).then((res) => res.json()),
    fetch(`${API_URL}/api/episodes/page/4`).then((res) => res.json()),
    fetch(`${API_URL}/api/episodes/page/5`).then((res) => res.json()),
    fetch(`${API_URL}/api/episodes/page/6`).then((res) => res.json()),
    fetch(`${API_URL}/api/episodes/page/7`).then((res) => res.json()),
  ]);

  const episodes = [
    ...episodes1,
    ...episodes2,
    ...episodes3,
    ...episodes4,
    ...episodes5,
    ...episodes6,
    ...episodes7,
  ]
    .filter((e) => e.youtubeID !== null)
    .map((episode) => ({
      _id: episode._id,
      date: episode.date,
      title: episode.title,
      description: episode.description,
      demo: episode.demo ?? false,
      repo: episode.repo ?? false,
      guest: episode.guest ?? [
        {
          guestImage: {
            asset: {
              url: 'https://cdn.sanity.io/images/vnkupgyb/production/7d8835955821f584df0b89ab72d2d83799139bb7-660x660.jpg',
            },
          },
          name: 'Jason Lengstorf',
          twitter: 'jlengstorf',
        },
      ],
      host: episode.host ?? {
        guestImage: {
          asset: {
            url: 'https://cdn.sanity.io/images/vnkupgyb/production/7d8835955821f584df0b89ab72d2d83799139bb7-660x660.jpg',
          },
        },
        name: 'Jason Lengstorf',
        twitter: 'jlengstorf',
      },
      links: episode.links ?? [],
      slug: episode.slug,
      youtubeID: episode.youtubeID,
      tags:
        episode?.episodeTags?.map((tag) => ({
          label: tag.label,
          slug: tag.slug.current,
        })) ?? [],
    }));

  return episodes;
}
