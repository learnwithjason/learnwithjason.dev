# Welcome to your new Toast site!

## scripts

### npm run postinstall

The postinstall script will run whenever you install the dependencies for a project. It handles converting any legacy 3rd party commonjs dependencies into browser-runnable ESM. The resulting ESM files are placed in `./public/web_modules/*` and can be cached if you wish (as long as you re-run postinstall when you install new dependencies).

### npm run build

```shell
npm run build
```

The build command runs the CSS build (Tailwind) and the site build (Toast).

### npm run build:css

The CSS build compiles (and purges) Tailwind via PostCSS.

```shell
npm run build:css
```

`postcss-cli` hasn't enabled node v12+ ESM yet, so we have to put our config in a special folder. This folder is `legacy-commonjs` and the only reason it is special is that it has a `package.json` with a single field: `"type": "commonjs"`, which tells node that the files in that folder are all CommonJS files (that is, they use `require()` and not `import`).

### npm run build:site

The site build command runs a full Toast build and outputs the results in `public/`.

```shell
npm run build:site
```
