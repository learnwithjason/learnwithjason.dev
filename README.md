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
  <a href="https://twitch.tv/jlengstorf"><strong>follow on Twitch</strong></a> · 
  <a href="https://lwj.dev/schedule"><strong>see upcoming episodes</strong></a> · 
  <a href="https://www.learnwithjason.dev/calendar"><strong>add the Google Calendar</strong></a> 
</p>

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

&nbsp;

This site is home to _Learn With Jason_’s episode back catalog, upcoming schedule, and written posts. It’s built with [Toast](https://toast.dev) and [Netlify Functions](https://www.netlify.com/products/functions/?utm_campaign=devex-jl&utm_source=github&utm_medium=readme&utm_content=functions-jl). For data, it uses a combination of [Sanity](https://www.sanity.io/) and [Hasura](https://hasura.io/).

## Local Development

To run this repo, you will need:

- Node >= v14.15.1 (if you’re using `nvm`, run `nvm use` in the project root to switch)
- the [Netlify CLI](https://docs.netlify.com/cli/get-started/?utm_campaign=devex-jl&utm_source=github&utm_medium=readme&utm_content=cli-jl)

To start, clone the repo and install dependencies:

```bash
# clone the repo
git clone git@github.com:learnwithjason/learnwithjason.dev

# move into the project directory
cd learnwithjason.dev/

# install dependencies
npm install
```

Next, start the project using the Netlify CLI:

```bash
ntl dev
```

The project will start at `http://localhost:8888`. Please note that the environment variables will not be set, so some of the serverless functions won’t work unless you add your own env vars. This shouldn’t prevent working on the project for UI-related changes.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.bdesigned.dev"><img src="https://avatars2.githubusercontent.com/u/45889730?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brittney Postma</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=brittneypostma" title="Code">💻</a></td>
    <td align="center"><a href="https://brandonroberts.dev"><img src="https://avatars3.githubusercontent.com/u/42211?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brandon</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=brandonroberts" title="Code">💻</a></td>
    <td align="center"><a href="https://ekinalcar.com"><img src="https://avatars1.githubusercontent.com/u/31273861?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ekin Alçar</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=ekinalcar" title="Code">💻</a></td>
    <td align="center"><a href="https://sarah.dev"><img src="https://avatars1.githubusercontent.com/u/2281088?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sarah Drasner</b></sub></a><br /><a href="https://github.com/learnwithjason/learnwithjason.dev/commits?author=sdras" title="Code">💻</a></td>
    <td align="center"><a href="https://medium.com/@seif.sayed"><img src="https://avatars1.githubusercontent.com/u/16223724?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Seifeldin Mahjoub</b></sub></a><br /><a href="#maintenance-seifsay3d" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://benmyers.dev"><img src="https://avatars1.githubusercontent.com/u/18060369?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ben Myers</b></sub></a><br /><a href="#a11y-BenDMyers" title="Accessibility">️️️️♿️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
