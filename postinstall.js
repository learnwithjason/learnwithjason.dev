#!/usr/bin/env node
import { install, printStats } from 'esinstall';
import { copyFile } from 'fs/promises';
import prettyBytes from 'pretty-bytes';
import cTable from 'console.table';
import { options, specs } from './esinstall.js';

// esinstall doesn't let us quiet the output while it runs
// so we kinda do that here.
const logger = {
  debug() {},
  warn(...args) {
    console.warn(...args);
  },
  error(...args) {
    console.error(...args);
  },
};

async function main() {
  const { success, stats } = await install(specs, {
    dest: './public/web_modules',
    // logger,
    ...options,
  });
  if (stats) {
    console.table(
      Object.entries(stats.direct)
        .map(([key, value]) => ({
          esm: key,
          ...Object.fromEntries(
            Object.entries(value).map(([k, v]) => [k, prettyBytes(v)]),
          ),
        }))
        .concat(
          Object.entries(stats.common).map(([key, value]) => ({
            esm: key,
            ...Object.fromEntries(
              Object.entries(value).map(([k, v]) => [k, prettyBytes(v)]),
            ),
          })),
        ),
    );
  }
}

async function copyAssets() {
  console.log('did the thing');
  await copyFile(
    './node_modules/@algolia/autocomplete-theme-classic/dist/theme.min.css',
    './public/styles/algolia-search.css',
  );
}

try {
  main();
  copyAssets();
} catch (e) {
  throw e;
}
