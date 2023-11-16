<p align="center">
  <a href="https://www.learnwithjason.dev">
    <img src="https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_240/v1579281727/lwj/learn-with-jason.png" alt="Learn With Jason" width="120" />
  </a>
</p>
<h1 align="center">
   <a href="https://www.learnwithjason.dev">learnwithjason.dev</a>
</h1>
<h3 align="center">
  Boop Crew HQ for <em>Learn With Jason</em>
</h3>
<p align="center">
  Fun things to do: 
  <a href="https://lwj.dev/newsletter"><strong>subscribe for updates</strong></a> · 
  <a href="https://lwj.dev/schedule"><strong>see upcoming episodes</strong></a> · 
  <a href="https://www.learnwithjason.dev/calendar"><strong>add the Google Calendar</strong></a> 
  <br />

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-23-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

</p>

&nbsp;

This site is home to _Learn With Jason_’s episode back catalog, upcoming schedule, and written posts. It’s an [Nx](https://nx.dev) monorepo housing multiple sites built with:

- [Remix](https://remix.run)
- [Astro](https://astro.build)
- [Netlify Functions](https://www.netlify.com/products/functions/)

For data, it uses:

- [Sanity](https://www.sanity.io/)
- [Shopify](https://shopify.com)

It also uses [Algolia](https://algolia.com) for search.

## API

If you want to load _Learn With Jason_ episodes or the schedule, there is an API available.

All requests are made through the `/api/v2` path. For example:

`https://www.learnwithjason.dev/api/v2/schedule`

### `/api/v2/episodes`

Loads the most recent 50 episodes.

### `/api/v2/episode/:slug`

Load details about a single episode.

#### Options

- `/api/v2/episode/:slug?transcript=true` — include the episode transcript in the response

### `/api/v2/schedule`

Load upcoming episode details.

## Local Development

To run this repo, you will need:

- Node >= v18 (if you’re using `nvm`, run `nvm use` in the project root to switch)
- the [Netlify CLI](https://docs.netlify.com/cli/get-started/?utm_campaign=devex-jl&utm_source=github&utm_medium=readme&utm_content=cli-jl)

```bash
nvm use
npm i -g netlify-cli
```

To start, clone the repo and install dependencies:

```bash
# clone the repo
git clone git@github.com:learnwithjason/learnwithjason.dev

# move into the project directory, then into the site
cd learnwithjason.dev

# install dependencies
npm install

# start local dev!
npx nx run blog:dev
```

The project will start at `http://localhost:8888`. Please note that the environment variables will not be set, so some of the serverless functions won’t work unless you add your own env vars. This shouldn’t prevent working on the project for UI-related changes.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.bdesigned.dev"><img src="https://avatars2.githubusercontent.com/u/45889730?v=4?s=100" width="100px;" alt="Brittney Postma"/><br /><sub><b>Brittney Postma</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=brittneypostma" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://brandonroberts.dev"><img src="https://avatars3.githubusercontent.com/u/42211?v=4?s=100" width="100px;" alt="Brandon"/><br /><sub><b>Brandon</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=brandonroberts" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ekinalcar.com"><img src="https://avatars1.githubusercontent.com/u/31273861?v=4?s=100" width="100px;" alt="Ekin Alçar"/><br /><sub><b>Ekin Alçar</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=ekinalcar" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sarah.dev"><img src="https://avatars1.githubusercontent.com/u/2281088?v=4?s=100" width="100px;" alt="Sarah Drasner"/><br /><sub><b>Sarah Drasner</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=sdras" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://medium.com/@seif.sayed"><img src="https://avatars1.githubusercontent.com/u/16223724?v=4?s=100" width="100px;" alt="Seifeldin Mahjoub"/><br /><sub><b>Seifeldin Mahjoub</b></sub></a><br /><a href="#maintenance-seifsay3d" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://benmyers.dev"><img src="https://avatars1.githubusercontent.com/u/18060369?v=4?s=100" width="100px;" alt="Ben Myers"/><br /><sub><b>Ben Myers</b></sub></a><br /><a href="#a11y-BenDMyers" title="Accessibility">️️️️♿️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.bencodezen.io"><img src="https://avatars.githubusercontent.com/u/4836334?v=4?s=100" width="100px;" alt="Ben Hong"/><br /><sub><b>Ben Hong</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=bencodezen" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://cassidoo.co"><img src="https://avatars.githubusercontent.com/u/1454517?v=4?s=100" width="100px;" alt="Cassidy Williams"/><br /><sub><b>Cassidy Williams</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=cassidoo" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ekeneeze.com/"><img src="https://avatars.githubusercontent.com/u/20874031?v=4?s=100" width="100px;" alt="Ekene Eze"/><br /><sub><b>Ekene Eze</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=kenny-io" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://hawksworx.com"><img src="https://avatars.githubusercontent.com/u/5865?v=4?s=100" width="100px;" alt="Phil Hawksworth"/><br /><sub><b>Phil Hawksworth</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=philhawksworth" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://tzmanics.dev"><img src="https://avatars.githubusercontent.com/u/3611928?v=4?s=100" width="100px;" alt="Tara Z. Manicsic"/><br /><sub><b>Tara Z. Manicsic</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=tzmanics" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Rohithgilla12"><img src="https://avatars.githubusercontent.com/u/19389850?v=4?s=100" width="100px;" alt="Rohith Gilla"/><br /><sub><b>Rohith Gilla</b></sub></a><br /><a href="#content-Rohithgilla12" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sarahdayan.dev"><img src="https://avatars.githubusercontent.com/u/5370675?v=4?s=100" width="100px;" alt="Sarah Dayan"/><br /><sub><b>Sarah Dayan</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=sarahdayan" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/HiteshRiziya"><img src="https://avatars.githubusercontent.com/u/4135216?v=4?s=100" width="100px;" alt="Hitesh Riziya"/><br /><sub><b>Hitesh Riziya</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=hriziya" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ryankshaw"><img src="https://avatars.githubusercontent.com/u/10541?v=4?s=100" width="100px;" alt="Ryan Shaw"/><br /><sub><b>Ryan Shaw</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=ryankshaw" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://mcan.sh"><img src="https://avatars.githubusercontent.com/u/11698668?v=4?s=100" width="100px;" alt="Logan McAnsh"/><br /><sub><b>Logan McAnsh</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=mcansh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/petardotjs"><img src="https://avatars.githubusercontent.com/u/109748926?v=4?s=100" width="100px;" alt="Petar Todorov"/><br /><sub><b>Petar Todorov</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=petardotjs" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/muescha"><img src="https://avatars.githubusercontent.com/u/184316?v=4?s=100" width="100px;" alt="Muescha"/><br /><sub><b>Muescha</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=muescha" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://andykenward.com"><img src="https://avatars.githubusercontent.com/u/4893048?v=4?s=100" width="100px;" alt="Andy Kenward"/><br /><sub><b>Andy Kenward</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=andykenward" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/beeburrt"><img src="https://avatars.githubusercontent.com/u/97593291?v=4?s=100" width="100px;" alt="B. Burt"/><br /><sub><b>B. Burt</b></sub></a><br /><a href="#content-beeburrt" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.alliancesoftware.com.au/"><img src="https://avatars.githubusercontent.com/u/2154472?v=4?s=100" width="100px;" alt="Levi Cameron"/><br /><sub><b>Levi Cameron</b></sub></a><br /><a href="#content-levic" title="Content">🖋</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.darrik.dev"><img src="https://avatars.githubusercontent.com/u/30670444?v=4?s=100" width="100px;" alt="Darrik Moberg"/><br /><sub><b>Darrik Moberg</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=mdarrik" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://egghead.io/q/resources-by-thomas-greco"><img src="https://avatars.githubusercontent.com/u/6646552?v=4?s=100" width="100px;" alt="Thomas Greco"/><br /><sub><b>Thomas Greco</b></sub></a><br /><a href="#content-tgrecojs" title="Content">🖋</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
