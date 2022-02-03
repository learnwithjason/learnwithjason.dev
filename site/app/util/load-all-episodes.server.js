export async function loadAllEpisodes() {
  const [episodes1, episodes2, episodes3, episodes4, episodes5, episodes6] =
    await Promise.all([
      fetch('https://www.learnwithjason.dev/api/episodes/page/1').then((res) =>
        res.json(),
      ),
      fetch('https://www.learnwithjason.dev/api/episodes/page/2').then((res) =>
        res.json(),
      ),
      fetch('https://www.learnwithjason.dev/api/episodes/page/3').then((res) =>
        res.json(),
      ),
      fetch('https://www.learnwithjason.dev/api/episodes/page/4').then((res) =>
        res.json(),
      ),
      fetch('https://www.learnwithjason.dev/api/episodes/page/5').then((res) =>
        res.json(),
      ),
      fetch('https://www.learnwithjason.dev/api/episodes/page/6').then((res) =>
        res.json(),
      ),
    ]);

  const episodes = [
    ...episodes1,
    ...episodes2,
    ...episodes3,
    ...episodes4,
    ...episodes5,
    ...episodes6,
  ].filter((e) => e.youtubeID !== null);

  return episodes;
}
